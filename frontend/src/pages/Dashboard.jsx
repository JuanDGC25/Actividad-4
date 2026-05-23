import { useEffect, useState } from 'react'
import api from '../api/axiosConfig'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'

function Dashboard() {
  const [resumen, setResumen] = useState({
    total: 0,
    pendientes: 0,
    en_proceso: 0,
    cerradas: 0,
  })

  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  const { usuario } = useAuth()

  useEffect(() => {
    obtenerResumen()
  }, [])

  const obtenerResumen = async () => {
    try {
      const response = await api.get('/solicitudes/resumen/')
      setResumen(response.data)
    } catch (error) {
      setError('No fue posible cargar el resumen de solicitudes.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <>
      <Navbar />

      <main className="container">
        <section className="page-header">
          <div>
            <h1>Dashboard</h1>
            <p>Bienvenido, {usuario?.nombre}. Rol actual: {usuario?.rol}.</p>
          </div>
        </section>

        {error && <div className="alert-error">{error}</div>}

        {cargando ? (
          <p>Cargando información...</p>
        ) : (
          <section className="cards-grid">
            <article className="summary-card">
              <span>Total</span>
              <strong>{resumen.total}</strong>
            </article>

            <article className="summary-card">
              <span>Pendientes</span>
              <strong>{resumen.pendientes}</strong>
            </article>

            <article className="summary-card">
              <span>En proceso</span>
              <strong>{resumen.en_proceso}</strong>
            </article>

            <article className="summary-card">
              <span>Cerradas</span>
              <strong>{resumen.cerradas}</strong>
            </article>
          </section>
        )}

        <section className="info-box">
          <h2>Objetivo del sistema</h2>
          <p>
            Esta aplicación permite centralizar las solicitudes internas de una organización,
            registrar requerimientos, asignar responsables, actualizar estados y consultar
            indicadores básicos para apoyar la toma de decisiones.
          </p>
        </section>
      </main>
    </>
  )
}

export default Dashboard