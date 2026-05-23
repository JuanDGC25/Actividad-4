import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Solicitudes from './pages/Solicitudes'
import CrearSolicitud from './pages/CrearSolicitud'
import DetalleSolicitud from './pages/DetalleSolicitud'
import './styles/main.css'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/solicitudes"
            element={
              <ProtectedRoute>
                <Solicitudes />
              </ProtectedRoute>
            }
          />

          <Route
            path="/solicitudes/crear"
            element={
              <ProtectedRoute>
                <CrearSolicitud />
              </ProtectedRoute>
            }
          />

          <Route
            path="/solicitudes/:id"
            element={
              <ProtectedRoute>
                <DetalleSolicitud />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App