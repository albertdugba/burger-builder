import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://burger-react-app-7c56b.firebaseio.com/",
});

export default axiosInstance;
