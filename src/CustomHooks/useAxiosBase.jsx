import axios from "axios";

const axiosBase = axios.create({
    baseURL: 'https://shop-smart-server-beta.vercel.app',
})

const useAxiosBase = () => {
    
    return axiosBase;
};

export default useAxiosBase;