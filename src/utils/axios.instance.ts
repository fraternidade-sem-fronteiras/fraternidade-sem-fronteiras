import axiosBuilder from 'axios'

const axios = axiosBuilder.create()

axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
)

export default axios
