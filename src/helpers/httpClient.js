import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://shipcent.in/api/',
    withCredentials: true,
});

export default instance;