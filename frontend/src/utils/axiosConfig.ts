import axios, { AxiosRequestConfig } from 'axios';

const axiosConfig: AxiosRequestConfig = {
    baseURL: 'http://localhost:9000/',
    timeout: 10000, 
    headers: {
        'Content-Type': 'application/json',
    },
};


const axiosInstance = axios.create(axiosConfig);

axiosInstance.interceptors.response.use(
    response => response,
    error => Promise.reject(error)
);

export default axiosInstance; 