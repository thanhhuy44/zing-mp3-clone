import axios from 'axios';

const request = axios.create({
    baseURL: `https://zing-mp3-api.vercel.app/api`,
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
