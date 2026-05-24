import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axiosConfig'
import Navbar from '../components/Navbar'

function Solicitudes() {
  const [solicitudes, setSolicitudes] = useState([])
  const [estadoFiltro, setEstadoFiltro] = useState('')
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    obtenerSolicitudes()
  }, [estadoFiltro])

  const obtenerSolicitudes = async () => {
    try {
      setCargando(true)

      const url = estadoFiltro
        ? `/solicitudes/?estado=${estadoFiltro}`
        : '/solicitudes/'

      const response = await api.get(url)
      setSolicitudes(response.data)
    } catch (error) {
      setError('No fue posible cargar las solicitudes.')
    } finally {
      setCargando(false)
    }
  }

  const eliminarSolicitud = async (id) => {
    const confirmar = window.confirm('¿Desea eliminar esta solicitud?')

    if (!confirmar) return

    try {
      await api.delete(`/solicitudes/${id}/`)
      obtenerSolicitudes()
    } catch (error) {
      setError('No fue posible eliminar la solicitud.')
    }
  }

  return (
    <>
      <Navbar />

      <main className="container">
        <section className="page-header">
          <div>
            <h1>Solicitudes</h1>
            <p>Listado general de requerimientos registrados en el sistema.</p>
          </div>

          <Link className="button-primary" to="/solicitudes/crear">
            Nueva solicitud
          </Link>
        </section>

        <section className="filters">
          <label>Filtrar por estado</label>
          <select value={estadoFiltro} onChange={(e) => setEstadoFiltro(e.target.value)}>
            <option value="">Todos</option>
            <option value="PENDIENTE">Pendiente</option>
            <option value="EN_PROCESO">En proceso</option>
            <option value="CERRADA">Cerrada</option>
          </select>
        </section>

        {error && <div className="alert-error">{error}</div>}

        {cargando ? (
          <p>Cargando solicitudes...</p>
        ) : solicitudes.length === 0 ? (
          <div className="empty-state">
            No hay solicitudes registradas.
          </div>
        ) : (
          <section className="table-card">
            <table>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Categoría</th>
                  <th>Solicitante</th>
                  <th>Prioridad</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {solicitudes.map((solicitud) => (
                  <tr key={solicitud.id}>
                    <td>{solicitud.titulo}</td>
                    <td>{solicitud.categoria}</td>
                    <td>{solicitud.solicitante_nombre}</td>
                    <td>
                      <span className={`badge badge-${solicitud.prioridad.toLowerCase()}`}>
                        {solicitud.prioridad}
                      </span>
                    </td>
                    <td>
                      <span className={`status status-${solicitud.estado_codigo.toLowerCase()}`}>
                        {solicitud.estado_nombre}
                      </span>
                    </td>
                    <td className="actions">
                      <Link to={`/solicitudes/${solicitud.id}`}>Ver</Link>
                      <button onClick={() => eliminarSolicitud(solicitud.id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </main>
    </>
  )
}

export default Solicitudes