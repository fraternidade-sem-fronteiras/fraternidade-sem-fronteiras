import axios from 'axios'
import Constants from './constants.js'

const instance = axios.create({
  baseURL: Constants.HOST,
})

export default function getAxiosInstance() {
  return instance
}
