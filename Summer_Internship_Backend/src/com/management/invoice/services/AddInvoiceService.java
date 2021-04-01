package com.management.invoice.services;

import com.management.invoice.controllers.*;

public class AddInvoiceService {
	public static boolean validateData(AddInvoice obj) {
		if(obj.invoiceNumber == 0 || obj.invoiceNumber < 0) {
			System.out.println("The entered invoiceNumber is of invalid Type!");
			return false;
		}
		else {
			return true;
		}
	}
}
