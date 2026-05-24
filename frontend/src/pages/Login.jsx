import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [formulario, setFormulario] = useState({
    username: '',
    password: '',
  })

  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formulario.username.trim() || !formulario.password.trim()) {
      setError('Ingrese usuario y contraseña.')
      return
    }

    try {
      setCargando(true)

      await login(formulario)

      navigate('/')
    } catch (error) {
      setError('Usuario o contraseña incorrectos.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <main className="login-container">
      <section className="login-card">
        <h1>Sistema de Solicitudes Internas</h1>
        <p>
          Ingrese con un usuario registrado en la base de datos para gestionar las solicitudes.
        </p>

        <div className="credentials-box">
          <strong>Usuario inicial:</strong>
          <span>admin / admin123</span>
        </div>

        {error && <div className="alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>Usuario</label>
          <input
            name="username"
            type="text"
            placeholder="Ej: admin"
            value={formulario.username}
            onChange={handleChange}
          />

          <label>Contraseña</label>
          <input
            name="password"
            type="password"
            placeholder="Ingrese su contraseña"
            value={formulario.password}
            onChange={handleChange}
          />

          <button type="submit" disabled={cargando}>
            {cargando ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default Login