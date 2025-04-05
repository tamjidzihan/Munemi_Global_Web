import axios from "axios";

const APICLIENT = import.meta.env.VITE_APICLIENT || "https://server.munemiglobal.com";

export default axios.create({
    baseURL: APICLIENT,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
})