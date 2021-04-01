package com.management.invoice.dao;

/* Importing the required Packages. */

import java.util.Date;

public class InvoiceDetailsPojo {
	
	/* Declaring the variables and setting their default value as null */
	
	private String BusinessCode = null;
	private String CustomerNumber = null;
	private String CustomerName = null;
	private Date ClearDate = null;
	private Integer BusinessYear = null;
	private Long DocId = null;
	private Date PostingDate = null;
	private Date DocumentCreateDate = null;
	private Date DocumentCreateDate_1 = null;
	private Date DueInDate = null;
	private String InvoiceCurrency = null;
	private String DocumentType = null;
	private Integer PostingId = null;
	private String AreaBusiness = null;
	private Double TotalOpenAmount = null;
	private Date BaselineCreateDate = null;
	private String CustomerPaymentTerms = null;
	private Long InvoiceId = null;
	private Integer IsOpen = null;
	
	/* Defination of all the getter and setter methods for all the declared variables */
	public InvoiceDetailsPojo(String BusinessCode , String CustomerNumber , String CustomerName , Date ClearDate
			,Integer BusinessYear , Long DocId , Date PostingDate , Date DocumentCreateDate , Date DocumentCreateDate_1
			,Date DueInDate , String InvoiceCurrency , String DocumentType , Integer PostingId , String AreaBusiness
			, Double TotalOpenAmount , Date BaselineCreateDate , String CustomerPaymentTerms , Long InvoiceId , Integer IsOpen){
	
		this.BusinessCode = BusinessCode;
		this.CustomerNumber = CustomerNumber;
		this.CustomerName = CustomerName;
		this.ClearDate = ClearDate;
		this.BusinessYear = BusinessYear;
		this.DocId = DocId;
		this.PostingDate = PostingDate;
		this.DocumentCreateDate = DocumentCreateDate;
		this.DocumentCreateDate_1 = DocumentCreateDate_1;
		this.DueInDate = DueInDate;
		this.InvoiceCurrency = InvoiceCurrency;
		this.DocumentType = DocumentType;
		this.PostingId = PostingId;
		this.AreaBusiness = AreaBusiness;
		this.TotalOpenAmount = TotalOpenAmount;
		this.BaselineCreateDate = BaselineCreateDate;
		this.CustomerPaymentTerms = CustomerPaymentTerms;
		this.InvoiceId = InvoiceId;
		this.IsOpen = IsOpen;
	}
	
	public Date getClearDate() {
		return ClearDate;
	}
	
	public void setClearDate(Date date) {
		ClearDate = date;
	}
	
	public Integer getBusinessYear() {
		return BusinessYear;
	}
	
	public void setBusinessYear(Integer businessYear) {
		BusinessYear = businessYear;
	}
	
	public Long getDocId() {
		return DocId;
	}
	
	public void setDocId(Long docId) {
		DocId = docId;
	}
	
	public Date getPostingDate() {
		return PostingDate;
	}
	
	public void setPostingDate(Date postingDate) {
		PostingDate = postingDate;
	}
	public Date getDocumentCreateDate() {
		return DocumentCreateDate;
	}
	public void setDocumentCreateDate(Date documentCreateDate) {
		DocumentCreateDate = documentCreateDate;
	}
	
	public Date getDocumentCreateDate_1() {
		return DocumentCreateDate_1;
	}
	
	public void setDocumentCreateDate_1(Date documentCreateDate_1) {
		DocumentCreateDate_1 = documentCreateDate_1;
	}
	
	public Date getDueInDate() {
		return DueInDate;
	}
	
	public void setDueInDate(Date dueInDate) {
		DueInDate = dueInDate;
	}
	
	public String getInvoiceCurrency() {
		return InvoiceCurrency;
	}
	
	public void setInvoiceCurrency(String invoiceCurrency) {
		InvoiceCurrency = invoiceCurrency;
	}
	
	public String getDocumentType() {
		return DocumentType;
	}
	
	public void setDocumentType(String documentType) {
		DocumentType = documentType;
	}
	
	public Integer getPostingId() {
		return PostingId;
	}
	
	public void setPostingId(Integer postingId) {
		PostingId = postingId;
	}
	
	public String getAreaBusiness() {
		return AreaBusiness;
	}
	
	public void setAreaBusiness(String areaBusiness) {
		AreaBusiness = areaBusiness;
	}
	
	public Double getTotalOpenAmount() {
		return TotalOpenAmount;
	}
	
	public void setTotalOpenAmount(Double totalOpenAmount) {
		TotalOpenAmount = totalOpenAmount;
	}
	
	public Date getBaselineCreateDate() {
		return BaselineCreateDate;
	}
	
	public void setBaselineCreateDate(Date baselineCreateDate) {
		BaselineCreateDate = baselineCreateDate;
	}
	
	public String getCustomerPaymentTerms() {
		return CustomerPaymentTerms;
	}
	
	public void setCustomerPaymentTerms(String customerPaymentTerms) {
		CustomerPaymentTerms = customerPaymentTerms;
	}
	
	public Long getInvoiceId() {
		return InvoiceId;
	}
	
	public void setInvoiceId(Long invoiceId) {
		InvoiceId = invoiceId;
	}
	
	public Integer getIsOpen() {
		return IsOpen;
	}
	
	public void setIsOpen(Integer isOpen) {
		IsOpen = isOpen;
	}
	
	public String getCustomerNumber() {
		return CustomerNumber;
	}
	
	public void setCustomerNumber(String customerNumber) {
		CustomerNumber = customerNumber;
	}
	
	public String getCustomerName() {
		return CustomerName;
	}
	
	public void setCustomerName(String customerName) {
		CustomerName = customerName;
	}
	
	public String getBusinessCode() {
		return BusinessCode;
	}
	
	public void setBusinessCode(String businessCode) {
		BusinessCode = businessCode;
	}
	
}
/* End of Pojo Class */
