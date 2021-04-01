import axios from 'axios';
export function prediction(data) {
    return axios.post(
    'http://127.0.0.1:5000/predict?',{},
    {
        headers: { 'Content-Type': 'application/json' },
        params: {
            data: data,
        },
    }
  );
}