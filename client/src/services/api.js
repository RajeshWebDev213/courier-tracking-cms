import axios from "axios"

// connect backend
const api = axios.create({
    baseURL:"http://localhost:5000/",
    withCredentials:true,
    headers: {
        "Content-Type" : "application/json"
    }
})

// request interceptor
api.interceptors.request.use((config)=>{
    const token = sessionStorage.getItem("token")
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})
// response interceptor
api.interceptors.response.use(
    (request) => request,
    (error)=>{
        return Promise.reject(error)
    }

)

export default api;