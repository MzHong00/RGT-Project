import axios from "axios";

const instance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_SERVER_API}/api/`,
    withCredentials: true
});

export default instance;