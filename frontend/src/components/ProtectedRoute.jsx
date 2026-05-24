import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children }) {
  const { usuario, cargandoSesion } = useAuth()

  if (cargandoSesion) {
    return <p style={{ padding: '24px' }}>Validando sesión...</p>
  }

  if (!usuario) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute