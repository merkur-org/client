import axios from 'axios'

console.log({ apiURL: process.env.NEXT_PUBLIC_API_URL })
const api = axios.create({
  baseURL: 'http://137.184.28.204/api' // process.env.NEXT_PUBLIC_API_URL
})

export default api
