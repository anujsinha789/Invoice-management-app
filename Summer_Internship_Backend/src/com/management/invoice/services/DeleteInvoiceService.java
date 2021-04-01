package com.management.invoice.services;

import com.management.invoice.controllers.*;

public class DeleteInvoiceService {
	public static boolean validateData(DeleteInvoice obj) {
		if(Integer.parseInt(obj.docId) == 0 || Integer.parseInt(obj.docId) < 0) {
			System.out.println("The entered DocId is of invalid Type!");
			return false;
		}
		else {
			return true;
		}
	}
}
