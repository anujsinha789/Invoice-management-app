package com.management.invoice.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


import javax.servlet.http.HttpServlet;
import com.management.invoice.db.*;


@SuppressWarnings("serial")
public class SortInvoiceQuery extends HttpServlet{
	public static int Limit = 1000;
	public static int pageCount = 1;
	public static PreparedStatement statement;	// Creating a Statement Object.
	public static String fetchQueryDesc = "SELECT * from invoice_details ORDER BY total_open_amount DESC LIMIT "+(Limit*pageCount);
	public static ResultSet SortInvoiceInTable() {
		
		try {
		Class.forName(DataSource.jdbcDriver).newInstance();		//Creating a newInstance of the jdbc Driver.
        
        	DataSource.connectDB();

			statement = DataSource.conn.prepareStatement(fetchQueryDesc);
			
			ResultSet res = statement.executeQuery();
			if(res.next()) {
				System.out.println("Data Sorted in Descending order!");
				pageCount = pageCount + 1;
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
