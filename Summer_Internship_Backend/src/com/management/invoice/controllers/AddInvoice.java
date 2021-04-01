package com.management.invoice.controllers;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import com.management.invoice.dao.*;
import com.management.invoice.services.*;

@SuppressWarnings("serial")
public class AddInvoice extends HttpServlet {
	 	
	public String customerName;
	public String customerNumber;
	public String Notes;
	public int invoiceNumber;
	public double invoiceAmount;
	
	public AddInvoice(){
	    this.customerName = null;
		this.customerNumber = null;
		this.customerNumber = "lorem ipsum dolor";
		this.invoiceNumber =  0;
		this.invoiceAmount =  0; 
	}
	
	public void doGet(HttpServletRequest request, HttpServletResponse response)
	      throws ServletException, IOException {
	      
	      // Set response content type
	      response.setContentType("text/html");
	      
	      PrintWriter out = response.getWriter();
	      String title = "Using GET Method to Read Form Data";
	      String docType =
	         "<!doctype html public \"-//w3c//dtd html 4.0 " + "transitional//en\">\n";
	         
	      out.println(docType +
	         "<html>\n" +
	            "<head><title>" + title + "</title></head>\n" +
	            "<body bgcolor = \"#f0f0f0\">\n" +
	               "<h1 align = \"center\">" + title + "</h1>\n" +
	               "<ul>\n" +
	                  "  <li><b>Customer Name</b>: "
	                  + request.getParameter("customerName") + "\n" +
	                  "  <li><b>Customer Number</b>: "
	                  + request.getParameter("customerNumber") + "\n" +
	                  "  <li><b>Doc Id</b>: "
	                  + request.getParameter("invoiceNumber") + "\n" +
	               "</ul>\n" +
	            "</body>" +
	         "</html>"
	      );
	   }
	   public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		   		   response.addHeader("Access-Control-Allow-Credentials", "true");
		   		   response.addHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
		   		   this.customerName = request.getParameter("customerName");
		   		   this.customerNumber = request.getParameter("customerNumber");
		   		   this.invoiceNumber = Integer.parseInt(request.getParameter("invoiceNumber"));
		   		   this.invoiceAmount = Integer.parseInt(request.getParameter("invoiceAmount"));
		   		   this.Notes = request.getParameter("Notes");
		   		   
			    
			      if(AddInvoiceService.validateData(this)) {
			    	  AddInvoiceQuery.AddDataToTable(this);
			      }
			      else {
			    	  response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			      }
			      doGet(request, response);
	   }
}
