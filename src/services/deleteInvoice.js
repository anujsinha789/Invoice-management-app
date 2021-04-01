import axios from 'axios';

export const deleteData = async(docId) => {
  try{
    return axios.post(
      'http://localhost:8080/1806197/delete', null, {
        params: {
        "docId" : docId,
        headers : {
          'Content-Type' : 'application/x-www-form-urlencoded'
      }
    }
      });
  } catch(e){
    console.log("Request Failed! ",e);
  }
}