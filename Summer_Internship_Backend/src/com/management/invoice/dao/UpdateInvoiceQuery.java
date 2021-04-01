package com.management.invoice.dao;

import java.sql.PreparedStatement;
import java.sql.SQLException;



import com.management.invoice.db.*;
import com.management.invoice.controllers.*;


public class UpdateInvoiceQuery{
	public static PreparedStatement statement;	// Creating a Statement Object.
	public static String updateQuery = "UPDATE invoice_details SET total_open_amount = (?) , notes = (?) WHERE doc_id = (?)";
	
	public static void UpdateDataInTable() {
		
		try {
		Class.forName(DataSource.jdbcDriver).newInstance();		//Creating a newInstance of the jdbc Driver.
        
        	DataSource.connectDB();

			statement = DataSource.conn.prepareStatement(updateQuery);
			statement.setDouble(1,UpdateInvoice.invoiceAmount);
			statement.setString(2,UpdateInvoice.notes);
			statement.setInt(3,Integer.parseInt(UpdateInvoice.docId));
			if(statement.executeUpdate() != 0) {
				System.out.println("Data Succesfully Updated in the table.");
			}
			else {
				System.out.println("Failed to Update data in the database.");
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
	}

}
