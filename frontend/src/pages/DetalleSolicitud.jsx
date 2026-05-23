import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import api from '../api/axiosConfig'
import Navbar from '../components/Navbar'

function DetalleSolicitud() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [solicitud, setSolicitud] = useState(null)
  const [estado, setEstado] = useState('')
  const [responsable, setResponsable] = useState('')
  const [cargando, setCargando] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    obtenerSolicitud()
  }, [id])

  const obtenerSolicitud = async () => {
    try {
      const response = await api.get(`/solicitudes/${id}/`)
      setSolicitud(response.data)
      setEstado(response.data.estado)
      setResponsable(response.data.responsable || '')
    } catch (error) {
      setError('No fue posible cargar la solicitud.')
    } finally {
      setCargando(false)
    }
  }

  const actualizarEstado = async (e) => {
    e.preventDefault()
    setError('')

    try {
      setGuardando(true)

      await api.patch(`/solicitudes/${id}/`, {
        estado,
        responsable,
      })

      navigate('/solicitudes')
    } catch (error) {
      setError('No fue posible actualizar la solicitud.')
    } finally {
      setGuardando(false)
    }
  }

  return (
    <>
      <Navbar />

      <main className="container">
        <section className="page-header">
          <div>
            <h1>Detalle de solicitud</h1>
            <p>Consulta y actualización del estado del requerimiento.</p>
          </div>

          <Link className="button-secondary" to="/solicitudes">
            Volver
          </Link>
        </section>

        {error && <div className="alert-error">{error}</div>}

        {cargando ? (
          <p>Cargando detalle...</p>
        ) : solicitud ? (
          <section className="detail-grid">
            <article className="detail-card">
              <h2>{solicitud.titulo}</h2>

              <p>
                <strong>Descripción:</strong><br />
                {solicitud.descripcion}
              </p>

              <p><strong>Categoría:</strong> {solicitud.categoria}</p>
              <p><strong>Solicitante:</strong> {solicitud.solicitante}</p>
              <p><strong>Prioridad:</strong> {solicitud.prioridad}</p>
              <p><strong>Estado actual:</strong> {solicitud.estado.replace('_', ' ')}</p>
              <p><strong>Fecha creación:</strong> {new Date(solicitud.fecha_creacion).toLocaleString()}</p>
            </article>

            <article className="form-card">
              <h2>Actualizar seguimiento</h2>

              <form onSubmit={actualizarEstado}>
                <label>Responsable</label>
                <input
                  type="text"
                  value={responsable}
                  onChange={(e) => setResponsable(e.target.value)}
                  placeholder="Ej: Área de sistemas"
                />

                <label>Estado</label>
                <select value={estado} onChange={(e) => setEstado(e.target.value)}>
                  <option value="PENDIENTE">Pendiente</option>
                  <option value="EN_PROCESO">En proceso</option>
                  <option value="CERRADA">Cerrada</option>
                </select>

                <button type="submit" disabled={guardando}>
                  {guardando ? 'Actualizando...' : 'Actualizar solicitud'}
                </button>
              </form>
            </article>
          </section>
        ) : (
          <div className="empty-state">
            La solicitud no fue encontrada.
          </div>
        )}
      </main>
    </>
  )
}

export default DetalleSolicitud