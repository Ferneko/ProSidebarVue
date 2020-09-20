import axios from 'axios'
const HTTP = axios.create({
  baseURL: 'https://localhost:44333/',
  headers: {
    'Authorization': 'Bearer '+localStorage.getItem("jwt")
  }
})

export default HTTP;