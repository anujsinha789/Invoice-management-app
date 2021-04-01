import axios from 'axios';

export const updateData = async(docId,invoiceAmount,Notes) => {
  try{
    return axios.post(
      'http://localhost:8080/1806197/update', null, {
        params: {
        "docId" : docId,
        "invoiceAmount" : invoiceAmount,
        "Notes" : Notes,
        headers : {
          'Content-Type' : 'application/x-www-form-urlencoded'
      }
    }
      });
  } catch(e){
    console.log("Request Failed! ",e);
  }
}