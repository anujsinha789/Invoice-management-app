import axios from 'axios';

export const addData = async(customerName , customerNumber , invoiceNumber , invoiceAmount , Notes) => {
  try{
    return axios.post(
      'http://localhost:8080/1806197/add', null, {
        params: {
        "customerName" : customerName,
        "customerNumber" : customerNumber,
        "invoiceNumber" : invoiceNumber,
        "invoiceAmount" : invoiceAmount,
        "Notes" : Notes,
        headers : {
          'Content-Type' : 'application/x-www-form-urlencoded'
      }
    }
      }).then((response) => {
        return response.status;
      });;
  } catch(e){
    console.log("Request Failed! ",e);
  }
}