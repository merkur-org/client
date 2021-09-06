import axios from 'axios'

console.log({ apiURL: process.env.NEXT_PUBLIC_API_URL })
const api = axios.create({
  baseURL: 'http://localhost:3333/api'
})

export default api
