import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [nombre, setNombre] = useState('')
  const [rol, setRol] = useState('Solicitante')
  const [error, setError] = useState('')

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (nombre.trim().length < 3) {
      setError('Ingrese un nombre válido para continuar.')
      return
    }

    login({
      nombre: nombre.trim(),
      rol,
    })

    navigate('/')
  }

  return (
    <main className="login-container">
      <section className="login-card">
        <h1>Sistema de Solicitudes Internas</h1>
        <p>
          Ingrese al sistema para registrar, consultar y hacer seguimiento a las solicitudes internas.
        </p>

        {error && <div className="alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>Nombre del usuario</label>
          <input
            type="text"
            placeholder="Ej: Juan Diego González"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <label>Rol</label>
          <select value={rol} onChange={(e) => setRol(e.target.value)}>
            <option value="Solicitante">Solicitante</option>
            <option value="Responsable">Responsable de área</option>
            <option value="Administrador">Administrador</option>
          </select>

          <button type="submit">Ingresar</button>
        </form>
      </section>
    </main>
  )
}

export default Login