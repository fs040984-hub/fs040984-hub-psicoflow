import axios from 'axios'

const base = axios.create({ baseURL: 'http://localhost:8000' })

// attach token automatically from localStorage
base.interceptors.request.use(config => {
  try {
    const token = localStorage.getItem('psicoflow_token')
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }
  } catch (e) {}
  return config
})

export default base
