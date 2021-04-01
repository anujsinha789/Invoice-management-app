import axios from 'axios';

export const fetchData = async() => {
    let url = 'http://localhost:8080/1806197/fetch?';
    return axios.get(url,{
      params: {
        _limit: 10
       }
    })
    .then((response) => {
      console.log(response.status);
      return response.data;
    });
}