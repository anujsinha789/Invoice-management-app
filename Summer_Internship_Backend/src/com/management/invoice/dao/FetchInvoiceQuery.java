package com.management.invoice.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


import javax.servlet.http.HttpServlet;
import com.management.invoice.db.*;


@SuppressWarnings("serial")
public class FetchInvoiceQuery extends HttpServlet{
	public static PreparedStatement statement;	// Creating a Statement Object.
	public static ResultSet FetchDataFromTable(int limit,int pageCount) {
		
		String fetchQuery = "SELECT * from invoice_details LIMIT "+(limit*pageCount);
		
		try {
		Class.forName(DataSource.jdbcDriver).newInstance();		//Creating a newInstance of the jdbc Driver.
        
        	DataSource.connectDB();

			statement = DataSource.conn.prepareStatement(fetchQuery);
			
			ResultSet res = statement.executeQuery();
			if(res.next()) {
				System.out.println("Data Fetched from the table succesfully");
				return res;
			}
			else {
				System.out.println("Failed to Fetch data from the database.");
				return null;
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
		return null;
	}

}
