import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import api from '../api/axiosConfig'
import Navbar from '../components/Navbar'

function DetalleSolicitud() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formulario, setFormulario] = useState({
    titulo: '',
    descripcion: '',
    categoria: '',
    solicitante: '',
    responsable: '',
    estado: '',
    prioridad: '',
    observaciones: '',
  })

  const [usuarios, setUsuarios] = useState([])
  const [estados, setEstados] = useState([])
  const [cargando, setCargando] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    cargarDatos()
  }, [id])

  const cargarDatos = async () => {
    try {
      const [solicitudResponse, usuariosResponse, estadosResponse] = await Promise.all([
        api.get(`/solicitudes/${id}/`),
        api.get('/usuarios/'),
        api.get('/estados/'),
      ])

      const solicitud = solicitudResponse.data

      setFormulario({
        titulo: solicitud.titulo || '',
        descripcion: solicitud.descripcion || '',
        categoria: solicitud.categoria || '',
        solicitante: solicitud.solicitante || '',
        responsable: solicitud.responsable || '',
        estado: solicitud.estado || '',
        prioridad: solicitud.prioridad || '',
        observaciones: solicitud.observaciones || '',
      })

      setUsuarios(usuariosResponse.data)
      setEstados(estadosResponse.data)
    } catch (error) {
      setError('No fue posible cargar la información de la solicitud.')
    } finally {
      setCargando(false)
    }
  }

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    })
  }

  const actualizarSolicitud = async (e) => {
    e.preventDefault()
    setError('')

    if (formulario.titulo.trim().length < 5) {
      setError('El título debe tener al menos 5 caracteres.')
      return
    }

    if (formulario.descripcion.trim().length < 10) {
      setError('La descripción debe tener al menos 10 caracteres.')
      return
    }

    try {
      setGuardando(true)

      const payload = {
        titulo: formulario.titulo,
        descripcion: formulario.descripcion,
        categoria: formulario.categoria,
        solicitante: formulario.solicitante,
        responsable: formulario.responsable || null,
        estado: formulario.estado,
        prioridad: formulario.prioridad,
        observaciones: formulario.observaciones,
      }

      await api.put(`/solicitudes/${id}/`, payload)

      navigate('/solicitudes')
    } catch (error) {
      setError('No fue posible actualizar completamente la solicitud.')
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
            <h1>Editar solicitud</h1>
            <p>Actualización completa del requerimiento interno.</p>
          </div>

          <Link className="button-secondary" to="/solicitudes">
            Volver
          </Link>
        </section>

        {error && <div className="alert-error">{error}</div>}

        {cargando ? (
          <p>Cargando detalle...</p>
        ) : (
          <section className="form-card">
            <form onSubmit={actualizarSolicitud}>
              <label>Título</label>
              <input
                name="titulo"
                type="text"
                value={formulario.titulo}
                onChange={handleChange}
              />

              <label>Descripción</label>
              <textarea
                name="descripcion"
                value={formulario.descripcion}
                onChange={handleChange}
                rows="5"
              />

              <label>Categoría</label>
              <select
                name="categoria"
                value={formulario.categoria}
                onChange={handleChange}
              >
                <option value="Soporte técnico">Soporte técnico</option>
                <option value="Mantenimiento">Mantenimiento</option>
                <option value="Compras">Compras</option>
                <option value="Talento humano">Talento humano</option>
                <option value="Gestión administrativa">Gestión administrativa</option>
              </select>

              <label>Solicitante</label>
              <select
                name="solicitante"
                value={formulario.solicitante}
                onChange={handleChange}
              >
                {usuarios.map((usuario) => (
                  <option key={usuario.id} value={usuario.id}>
                    {usuario.first_name || usuario.username} {usuario.last_name || ''}
                  </option>
                ))}
              </select>

              <label>Responsable</label>
              <select
                name="responsable"
                value={formulario.responsable || ''}
                onChange={handleChange}
              >
                <option value="">Sin asignar</option>
                {usuarios.map((usuario) => (
                  <option key={usuario.id} value={usuario.id}>
                    {usuario.first_name || usuario.username} {usuario.last_name || ''}
                  </option>
                ))}
              </select>

              <label>Estado</label>
              <select
                name="estado"
                value={formulario.estado}
                onChange={handleChange}
              >
                {estados.map((estado) => (
                  <option key={estado.id} value={estado.id}>
                    {estado.nombre}
                  </option>
                ))}
              </select>

              <label>Prioridad</label>
              <select
                name="prioridad"
                value={formulario.prioridad}
                onChange={handleChange}
              >
                <option value="BAJA">Baja</option>
                <option value="MEDIA">Media</option>
                <option value="ALTA">Alta</option>
              </select>

              <label>Observaciones</label>
              <textarea
                name="observaciones"
                value={formulario.observaciones}
                onChange={handleChange}
                rows="3"
              />

              <div className="form-actions">
                <button type="button" className="button-secondary" onClick={() => navigate('/solicitudes')}>
                  Cancelar
                </button>

                <button type="submit" disabled={guardando}>
                  {guardando ? 'Actualizando...' : 'Guardar cambios'}
                </button>
              </div>
            </form>
          </section>
        )}
      </main>
    </>
  )
}

export default DetalleSolicitud