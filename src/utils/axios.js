import axios from 'axios';

const request = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL,
});

request.interceptors.response.use(
    (res) => {
        return res.data;
    },
    function (error) {
        return Promise.reject(error);
    },
);

export default request;
