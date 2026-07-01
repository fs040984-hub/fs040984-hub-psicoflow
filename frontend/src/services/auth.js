import api from './api'

const TOKEN_KEY = 'psicoflow_token'
const USER_KEY = 'psicoflow_user'

export async function login(email, password) {
  const res = await api.post('/api/auth/login', { email, password })
  const { access_token, user } = res.data
  localStorage.setItem(TOKEN_KEY, access_token)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
  return user
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function getUser() {
  try { return JSON.parse(localStorage.getItem(USER_KEY)) } catch(e){ return null }
}
