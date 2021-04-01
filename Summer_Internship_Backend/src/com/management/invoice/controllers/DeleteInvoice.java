package com.management.invoice.controllers;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

import com.management.invoice.dao.*;
import com.management.invoice.services.*;

@SuppressWarnings("serial")
public class DeleteInvoice extends HttpServlet {
	 	
	public static String docId;
	
	   public void doGet(HttpServletRequest request, HttpServletResponse response)
	      throws ServletException, IOException {
	      
	      // Set response content type
	      response.setContentType("text/html");

	      PrintWriter out = response.getWriter();
	      String title = "Delete Using Post Method.";
	      String docType =
	         "<!doctype html public \"-//w3c//dtd html 4.0 " + "transitional//en\">\n";
	         
	      out.println(docType +
	         "<html>\n" +
	            "<head><title>" + title + "</title></head>\n" +
	            "<body bgcolor = \"#f0f0f0\">\n" +
	               "<h1 align = \"center\">" + title + "</h1>\n" +
	               "<ul>\n" +
	                  "  <li><b>The record with the specified DocId has been deleted from the table.</b><br>"+
	                  "  <li><b>Doc Id</b>: "
	                  + request.getParameter("docId") + "\n" +
	               "</ul>\n" +
	            "</body>" +
	         "</html>"
	      );
	   }
	   public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		   		   	   docId = request.getParameter("docId");
		   			   if(DeleteInvoiceService.validateData(this) == true) {
		   				   doGet(request, response);
		   			   	   DeleteInvoiceQuery.DeleteDataFromTable();
		   			   }
		   			   else {
		   				response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		   			   }
	   }
}
