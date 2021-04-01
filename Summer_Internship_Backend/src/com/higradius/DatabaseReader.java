/* Name : Anuj Sinha
 * Roll.No : 1806197
 * House : Darth Vader.
 */

package com.higradius;

import java.sql.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.io.*;



public class DatabaseReader {
	public static Connection conn;  // A connection object to connect to the database.
	public static PreparedStatement statement;	// Creating a Statement Object.
	public static ArrayList<String> ColumnNames = new ArrayList<String>();
	
	/* The method readDataFromFile reads data from the CSV file . 
	 * It takes The File path , A list of objects of type invoiceDetailsPojo as arguments and it doesn't returns
	 * anything. */
	
	private static void readDataFromFile(String FilePath, ArrayList<invoiceDetailsPojo> invoiceDetails) throws FileNotFoundException {
		BufferedReader br = new BufferedReader(new FileReader(FilePath)); 
		
		String line = "";
		int iterationCount = 0; // Keeps count of the Iteration.
		
		/* Setting Date Format to Parse and Handle columns having Dates as thier values */
    	
    	SimpleDateFormat DatetimeFormatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    	SimpleDateFormat DateFormatter = new SimpleDateFormat("yyyyMMdd");
    	
		try {
			br.readLine(); // Skip header line.
			while( (line = br.readLine()) != null) {
			    String[] values = line.split(",");
			    invoiceDetailsPojo pojo = new invoiceDetailsPojo();
			    	
			    		pojo.setBusinessCode(values[0]);
			    		pojo.setCustomerNumber(values[1]);
			    		pojo.setCustomerName(values[2]);
			    		pojo.setBusinessYear(Integer.parseInt(values[4].split("\\.")[0]));
			    		pojo.setDocId(Long.parseLong(values[5].split("\\.")[0]));
			    		pojo.setPostingDate(DateFormatter.parse(values[6]));
			    		pojo.setDocumentCreateDate(DateFormatter.parse(values[7]));
			    		pojo.setDocumentCreateDate_1(DateFormatter.parse(values[8]));
			    		pojo.setDueInDate(DateFormatter.parse(values[9]));
			    		pojo.setInvoiceCurrency(values[10]);
			    		pojo.setDocumentType(values[11]);
			    		pojo.setPostingId(Integer.parseInt(values[12].split("\\.")[0]));
			    		pojo.setAreaBusiness(values[13]);
			    		pojo.setTotalOpenAmount(Double.parseDouble(values[14]));
			    		pojo.setBaselineCreateDate(DateFormatter.parse(values[15]));
			    		pojo.setCustomerPaymentTerms(values[16]);
			    		pojo.setIsOpen(Integer.parseInt(values[18]));
			    		
			    		
			    		/* Handling columns having Null values*/
			    		
			    		if(values[3].length() == 0)
			    			pojo.setClearDate(null);
			    		else
			    			pojo.setClearDate(DatetimeFormatter.parse(values[3]));
			    		
			    		
			    		if(values[17].length() == 0)
			    			pojo.setInvoiceId(null);
			    		else
			    			pojo.setInvoiceId(Long.parseLong(values[17].split("\\.")[0]));
			    
			    	invoiceDetails.add(pojo);
			    
			    }
			    
			    iterationCount = iterationCount + 1;
			    
			br.close();  // Closing the file after reading data from it.
		} catch (NumberFormatException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
		
	}
	
	
	
	/* The method addData is used to add data into the Database table.
	 * It takes in a list of objects of type invoiceDetailsPojo as argument
	 * and returns an integer value 1 if all the batches are executed successfully 
	 * and 0 if any of the batch fails to execute successfully. */
	
	private static int addData(ArrayList<invoiceDetailsPojo> invoiceDetails) {
		int batchCount = 0,batchSize = 5000;
		try {
			PreparedStatement statement = conn.prepareStatement(DataSource.invoiceDetailsInsertQuery);

				for (invoiceDetailsPojo pojo : invoiceDetails) {
					
					/* Setting the parameters of the statement */
	    		
					statement.setString(1,pojo.getBusinessCode());
					statement.setString(2,pojo.getCustomerNumber());
					statement.setString(3,pojo.getCustomerName());
					statement.setInt(5,pojo.getBusinessYear());
					statement.setLong(6,pojo.getDocId());
					statement.setDate(7,new java.sql.Date(pojo.getPostingDate().getTime()));
					statement.setDate(8,new java.sql.Date(pojo.getDocumentCreateDate().getTime()));
					statement.setDate(9,new java.sql.Date(pojo.getDocumentCreateDate_1().getTime()));
					statement.setDate(10,new java.sql.Date(pojo.getDueInDate().getTime()));
					statement.setString(11,pojo.getInvoiceCurrency());
					statement.setString(12,pojo.getDocumentType());
					statement.setInt(13,pojo.getPostingId());
					statement.setDouble(15,pojo.getTotalOpenAmount());
					statement.setDate(16,new java.sql.Date(pojo.getBaselineCreateDate().getTime()));
					statement.setString(17,pojo.getCustomerPaymentTerms());
					statement.setInt(19,pojo.getIsOpen());
					
					
					/* Handling Columns having null values. */
					
					if(pojo.getAreaBusiness().length() != 0)
						statement.setString(14,pojo.getAreaBusiness());
					else
						statement.setNull(14,Types.NULL);
					
					if(pojo.getInvoiceId() == null)
						statement.setNull(18,Types.NULL);
					else
						statement.setLong(18,pojo.getInvoiceId());
					
					if(pojo.getClearDate() == null)
						statement.setNull(4,java.sql.Types.DATE);
					else
						statement.setDate(4,new java.sql.Date(pojo.getClearDate().getTime()));
			
					/* Executing the Query and storing the Result set.*/
			
					statement.addBatch();
					batchCount++;
					
					if(batchCount % batchSize == 0) {
						/* Storing the executed batch Count */
					
						int[] executedBatchCount = statement.executeBatch();
						
						if(executedBatchCount.length == batchSize) {
							System.out.println("Batch " + (batchCount / batchSize) + " executed Succesfully.");
						} else {
							System.out.println("Batch " + (batchCount / batchSize) + " failed to execute Succesfully.");
						}
					}
					
					statement.clearParameters();
					
				}
				
				

		} catch (SQLException e) {
			e.printStackTrace();
			return 0;
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}

		return 1;
		
	}
	
	/* The Method readDataFromTable is used to read data from the Database table . 
	 * It takes no argument and it returns the result set obtained after executing the SQL query.*/
	
	private static ResultSet readDataFromTable() throws SQLException {

		try {
			
			PreparedStatement statement;
			statement = conn.prepareStatement(DataSource.invoiceDetailsQuery);
			return statement.executeQuery();
			
		} catch (SQLException e) {
			
			e.printStackTrace();
		}
		
		return statement.executeQuery();
		
	}
	
	
	/* Main function */
	
    public static void main(String args[])throws Exception{
    	 
    	 /* Array list to store Objects of the Pojo class */
    	 ArrayList<invoiceDetailsPojo> invoiceDetails = new ArrayList<invoiceDetailsPojo>(); 
    	 String FilePath = "C://Users//KIIT//Desktop//Java Practice//1806197.csv"; // Absolute path of the File.
    	 
    	try {
    		
    		 @SuppressWarnings("resource")
			Scanner sc = new Scanner(System.in);  	
    		 Class.forName(DataSource.jdbcDriver).newInstance();
             
             /* Connecting to the database. */
             conn = DriverManager.getConnection(DataSource.urlh2h_internship, DataSource.dbuserName, DataSource.dbpassword);  
             
             if(conn != null) {
            	 
            	 /* If connection is succesfull then this code block will be executed. */
            	 
            	 System.out.println("Connection Successfull.");
            	 System.out.println("Choose :\n1.Insert Data into the table.\n2.Read Data from the table.");
            	 int choice = sc.nextInt();
             
            	 switch(choice) {
             		case 1:
             			
             			/* Case for Inserting data into the table */
             			
             			readDataFromFile(FilePath,invoiceDetails);
             			int response = addData(invoiceDetails);
             			if(response == 1) {
             				System.out.println("Data Entered into the table Successfully.");
             				System.out.println(invoiceDetails.size() + " Records Entered into the table.");
             				conn.close();
             			}
             			
             			break;
      			 
             		case 2:
             
             			/* Case for reading data from the table */
             
             			System.out.println("How many records do you want to read ? : ");
             			int numOfRecords = sc.nextInt();
             			int recordCount = 0;
             			ResultSet res = readDataFromTable();
             			invoiceDetailsPojo pojo = new invoiceDetailsPojo();
             			
             			while(res.next() && recordCount <= numOfRecords) {
             				pojo.setBusinessCode(res.getString("business_code"));
             				pojo.setCustomerNumber(res.getString("cust_number"));
             				pojo.setCustomerName(res.getString("name_customer"));
             				pojo.setClearDate(res.getTimestamp("clear_date"));
             				pojo.setBusinessYear(res.getInt("business_year"));
             				pojo.setDocId(res.getLong("doc_id"));
             				pojo.setPostingDate(res.getDate("posting_date"));
             				pojo.setDocumentCreateDate(res.getDate("document_create_date"));
             				pojo.setDocumentCreateDate_1(res.getDate("document_create_date_1"));
             				pojo.setDueInDate(res.getDate("due_in_date"));
             				pojo.setInvoiceCurrency(res.getString("invoice_currency"));
             				pojo.setDocumentType(res.getString("document_type"));
             				pojo.setPostingId(res.getInt("posting_id"));
             				pojo.setAreaBusiness(res.getString("area_business"));
             				pojo.setTotalOpenAmount(res.getDouble("total_open_amount"));
             				pojo.setBaselineCreateDate(res.getDate("baseline_create_date"));
             				pojo.setCustomerPaymentTerms(res.getString("cust_payment_terms"));
             				pojo.setInvoiceId(res.getLong("invoice_id"));
             				pojo.setIsOpen(res.getInt("isOpen"));
             			
             			System.out.println(pojo.getBusinessCode() + "\t"
             					+ pojo.getCustomerNumber() + "\t" + pojo.getCustomerName() 
             					+ "\t" + pojo.getClearDate() + "\t" + pojo.getBusinessYear() 
             					+ "\t" + pojo.getDocId() + "\t" + pojo.getPostingDate() 
             					+ "\t" + pojo.getDocumentCreateDate() + "\t" + pojo.getDocumentCreateDate_1() 
             					+ "\t" + pojo.getDueInDate() + "\t" + pojo.getInvoiceCurrency() 
             					+ "\t" + pojo.getDocumentType() + "\t" + pojo.getPostingId() 
             					+ "\t" + pojo.getAreaBusiness() + "\t" + pojo.getTotalOpenAmount() 
             					+ "\t" + pojo.getBaselineCreateDate() + "\t" + pojo.getCustomerPaymentTerms() 
             					+ "\t" + pojo.getInvoiceId() + "\t" + pojo.getIsOpen());
             			
             			recordCount = recordCount + 1;
             		}
             		break;
            	 
             		default : System.out.println("Wrong Input\n");
            	 }
             }
             else {
            	 System.out.println("Connection not established! Please try again.");
             }
             
    		
    	} catch(FileNotFoundException e) {
    		e.printStackTrace();
    	} catch(SQLException e) {
    		e.printStackTrace();
    	}
    	conn.close();
    }

}

/* End of Java Code */



