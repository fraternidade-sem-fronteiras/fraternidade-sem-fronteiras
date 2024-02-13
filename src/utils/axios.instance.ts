import axios from 'axios'
import Constants from './constants.js'

const instance = axios.create({
  baseURL: Constants.API_URL,
})

export default function getAxiosInstance() {
  return instance
}
