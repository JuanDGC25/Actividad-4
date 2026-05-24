import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="navbar">
      <div>
        <h2>Sistema de Solicitudes</h2>
        <span>Gestión interna de requerimientos</span>
      </div>

      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/solicitudes">Solicitudes</Link>
        <Link to="/solicitudes/crear">Crear solicitud</Link>
      </nav>

      <div className="navbar-user">
        <small>
          {usuario?.nombre} <br />
          <span>{usuario?.rol}</span>
        </small>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </header>
  )
}

export default Navbar