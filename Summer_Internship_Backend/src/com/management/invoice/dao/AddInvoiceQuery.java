package com.management.invoice.dao;

import java.sql.PreparedStatement;
import java.sql.SQLException;


import javax.servlet.http.HttpServlet;
import com.management.invoice.db.*;
import com.management.invoice.controllers.*;


@SuppressWarnings("serial")
public class AddInvoiceQuery extends HttpServlet{
	public static PreparedStatement statement;	// Creating a Statement Object.
	public static String insertQuery = "insert into invoice_details (cust_number,name_customer,invoice_id,total_open_amount)"
			+ "values (?,?,?,?)";
	public static void AddDataToTable(AddInvoice invoiceData) {
		
		try {
		Class.forName(DataSource.jdbcDriver).newInstance();		//Creating a newInstance of the jdbc Driver.
        
        	DataSource.connectDB();

			statement = DataSource.conn.prepareStatement(insertQuery);
			statement.setString(1,invoiceData.customerNumber);
			statement.setString(2,invoiceData.customerName);
			statement.setInt(3,invoiceData.invoiceNumber);
			statement.setDouble(4,invoiceData.invoiceAmount);
			if(statement.executeUpdate() != 0) {
				System.out.println("Data Added into the table succesfully");
			}
			else {
				System.out.println("Failed to add data into the database.");
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
