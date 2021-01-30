import axios from "axios";
import { API_URL } from "../config";

const httpInstance = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' }
});

export default httpInstance;
