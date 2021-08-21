import axios from 'axios'

console.log({ apiURL: process.env.NEXT_PUBLIC_API_URL })
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://165.227.214.134/api'
})

export default api
