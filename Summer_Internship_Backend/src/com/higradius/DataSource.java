package com.higradius;

/* This DataSource class contains all the credentials required for connection with the mySql Database. */

public class DataSource {
	public static String dbuserName = "root";
	public static String dbpassword = "root";
	public static String jdbcDriver = "com.mysql.cj.jdbc.Driver";
	public static String urlh2h_internship = "jdbc:mysql://localhost:3306/h2h_internship";	
	
	/* Defination of the Sql queries. For reading and inserting data into the table. */
	
	public static String invoiceDetailsQuery = "select * from invoice_details";
	public static String invoiceDetailsInsertQuery = "insert into invoice_details"
			+ "(business_code,cust_number,name_customer,clear_date,business_year,doc_id,"
			+ "posting_date,document_create_date,document_create_date_1,due_in_date,invoice_currency,document_type,"
			+ "posting_id,area_business,total_open_amount,baseline_create_date,cust_payment_terms,"
			+ "invoice_id,isOpen) "
			+ "values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
}



