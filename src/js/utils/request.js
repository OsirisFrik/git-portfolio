import axios from 'axios';

const service = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 5000
});

service.interceptors.response.use(
  response => response.data,
  err => {
    if (process.env.NODE_ENV === 'development') {
      console.error(err, err.response);
    }

    return Promise.reject(err);
  }
);

export default service;

