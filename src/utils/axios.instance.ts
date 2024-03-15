import axiosBuilder from 'axios'
import Constants from './constants.js'

const axios = axiosBuilder.create({
  baseURL: Constants.API_URL,
})

export default axios
