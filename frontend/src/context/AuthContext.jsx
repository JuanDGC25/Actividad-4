import { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/axiosConfig'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [cargandoSesion, setCargandoSesion] = useState(true)

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario_solicitudes')
    const tokenGuardado = localStorage.getItem('token_solicitudes')

    if (usuarioGuardado && tokenGuardado) {
      setUsuario(JSON.parse(usuarioGuardado))
    }

    setCargandoSesion(false)
  }, [])

  const login = async ({ username, password }) => {
    const response = await api.post('/auth/login/', {
      username,
      password,
    })

    localStorage.setItem('token_solicitudes', response.data.token)
    localStorage.setItem('usuario_solicitudes', JSON.stringify(response.data.usuario))

    setUsuario(response.data.usuario)

    return response.data
  }

  const logout = () => {
    localStorage.removeItem('token_solicitudes')
    localStorage.removeItem('usuario_solicitudes')
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout, cargandoSesion }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}