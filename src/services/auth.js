// src/services/auth.js

const USERS_KEY = 'users'
const TOKEN_KEY = 'token'

function readUsers() {
  const raw = localStorage.getItem(USERS_KEY)
  return raw ? JSON.parse(raw) : []
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

async function sha256(text) {
  const enc = new TextEncoder().encode(text)
  const hashBuffer = await crypto.subtle.digest('SHA-256', enc)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

function newToken() {
  return crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2)
}

export async function register(payload) {
  const users = readUsers()

  const exists = users.some(u => u.username.toLowerCase() === payload.username.toLowerCase())
  if (exists) {
    throw new Error('Username นี้ถูกใช้งานแล้ว')
  }

  const passwordHash = await sha256(payload.password)

  users.push({
    username: payload.username,
    passwordHash,
    fullName: payload.fullName,
    gender: payload.gender,
    phone: payload.phone,
    email: payload.email,
    birthDate: payload.birthDate,
    createdAt: new Date().toISOString(),
  })

  writeUsers(users)
  return true
}

export async function login({ username, password }) {
  const users = readUsers()
  const user = users.find(u => u.username.toLowerCase() === username.toLowerCase())
  if (!user) throw new Error('ไม่พบผู้ใช้')

  const passwordHash = await sha256(password)
  if (passwordHash !== user.passwordHash) throw new Error('รหัสผ่านไม่ถูกต้อง')

  const token = newToken()
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem('currentUser', JSON.stringify({ username: user.username, fullName: user.fullName }))
  return token
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem('currentUser')
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function getCurrentUser() {
  const raw = localStorage.getItem('currentUser')
  return raw ? JSON.parse(raw) : null
}