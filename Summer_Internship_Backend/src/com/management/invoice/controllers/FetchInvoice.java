package com.management.invoice.controllers;

import java.io.*;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.*;
import javax.servlet.http.*;

import com.google.gson.Gson;
import com.management.invoice.dao.*;

@SuppressWarnings("serial")
public class FetchInvoice extends HttpServlet {
	 	
	public String BusinessCode = null;
	public String CustomerNumber = null;
	public String CustomerName = null;
	public Date ClearDate = null;
	public Integer BusinessYear = null;
	public Long DocId = null;
	public Date PostingDate = null;
	public Date DocumentCreateDate = null;
	public Date DocumentCreateDate_1 = null;
	public Date DueInDate = null;
	public String InvoiceCurrency = null;
	public String DocumentType = null;
	public Integer PostingId = null;
	public String AreaBusiness = null;
	public Double TotalOpenAmount = null;
	public Date BaselineCreateDate = null;
	public String CustomerPaymentTerms = null;
	public Long InvoiceId = null;
	public Integer IsOpen = null;
	
	public FetchInvoice(){
		BusinessCode = null;
		CustomerNumber = null;
		CustomerName = null;
		ClearDate = null;
		BusinessYear = null;
		DocId = null;
		PostingDate = null;
		DocumentCreateDate = null;
		DocumentCreateDate_1 = null;
		DueInDate = null;
		InvoiceCurrency = null;
		DocumentType = null;
		PostingId = null;
		AreaBusiness = null;
		TotalOpenAmount = null;
		BaselineCreateDate = null;
		CustomerPaymentTerms = null;
		InvoiceId = null;
		IsOpen = null;
	}
	
	public void doGet(HttpServletRequest request, HttpServletResponse response)
	      throws ServletException, IOException {
	      
	      // Set response content type
		int limit = 0 , pageCount = 0;
		response.setContentType("application/json");
		try {
				limit = Integer.parseInt(request.getParameter("limit"));
				pageCount = Integer.parseInt(request.getParameter("pageCount"));
				
				System.out.println(limit + " " + pageCount);
	      		
	    	    ResultSet res = FetchInvoiceQuery.FetchDataFromTable(limit,pageCount);
	    	    ArrayList<InvoiceDetailsPojo> invoiceDetails = new ArrayList<InvoiceDetailsPojo>(); 
	    	    int count = 0;
	    	  while(res.next()) {  
	    		InvoiceDetailsPojo pojo = new InvoiceDetailsPojo(res.getString(1),res.getString(2),res.getString(3)
	    				,res.getTimestamp(4),res.getInt(5),res.getLong(6),res.getDate(7),res.getDate(8)
	    				,res.getDate(9),res.getDate(10),res.getString(11),res.getString(12),res.getInt(13),res.getString(14)
	    				,res.getDouble(15),res.getDate(16),res.getString(17),res.getLong(18),res.getInt(19));
	    	    
 				
 				invoiceDetails.add(count,pojo);
 				++count;
	    	  }
 				
	    	    Gson gson = new Gson();
				 String data = gson.toJson(invoiceDetails);
				 PrintWriter out = response.getWriter();
				 response.setContentType("application/json");
				 out.print(data);
				 out.flush();
	         	
	   }catch (SQLException e) {
		   e.printStackTrace();
	   }
} 

}
