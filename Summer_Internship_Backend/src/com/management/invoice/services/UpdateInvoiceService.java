package com.management.invoice.services;

import com.management.invoice.controllers.*;

public class UpdateInvoiceService {
	public static boolean validateData(UpdateInvoice obj) {
		if(Integer.parseInt(obj.docId) == 0 || Integer.parseInt(obj.docId) < 0) {
			System.out.println("The entered DocId is of invalid Type!");
			return false;
		}
		else {
			return true;
		}
	}
}
