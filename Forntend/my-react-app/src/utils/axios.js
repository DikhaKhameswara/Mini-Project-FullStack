import axios from "axios";

const axiosBackend = axios.create({
    baseURL: "http://localhost:8080/pos/api"
})


export { axiosBackend };
