import axios from 'axios';

export const sortInvoice = async() => {
    let url = 'http://localhost:8080/1806197/sort?';
    return axios.get(url,{
    //   params: {
    //     _limit: 10
    //    }
    })
    .then((response) => {
      console.log(response.status);
      return response.data;
    });
}