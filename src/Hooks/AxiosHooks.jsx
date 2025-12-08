import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:3000/'
    baseURL: 'https://chefbazar.vercel.app/'
})

const useAxios = () => {
    return axiosInstance
}
export default useAxios