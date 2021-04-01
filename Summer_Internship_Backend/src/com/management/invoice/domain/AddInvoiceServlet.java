package com.management.invoice.domain;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.management.invoice.controllers.*;

@SuppressWarnings("serial")
public class AddInvoiceServlet extends HttpServlet{
	public void doGet(HttpServletRequest request, HttpServletResponse response) {
		AddInvoice invoiceDetails = new AddInvoice();
		try {
			invoiceDetails.doGet(request,response);
		} catch (ServletException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
