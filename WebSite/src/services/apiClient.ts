import axios from "axios";

const APICLIENT = import.meta.env.VITE_APICLIENT || "http://localhost:3000";

export default axios.create({
    baseURL: APICLIENT,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
})