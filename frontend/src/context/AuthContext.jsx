import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario_solicitudes')

    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado))
    }
  }, [])

  const login = ({ nombre, rol }) => {
    const datosUsuario = {
      nombre,
      rol,
    }

    localStorage.setItem('usuario_solicitudes', JSON.stringify(datosUsuario))
    setUsuario(datosUsuario)
  }

  const logout = () => {
    localStorage.removeItem('usuario_solicitudes')
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}