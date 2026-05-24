import { useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axiosConfig'
import Navbar from '../components/Navbar'

const initialState = {
  titulo: '',
  descripcion: '',
  categoria: 'Soporte técnico',
  responsable: '',
  prioridad: 'MEDIA',
  observaciones: '',
}

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value,
  }
}

function CrearSolicitud() {
  const [formulario, dispatch] = useReducer(reducer, initialState)
  const [usuarios, setUsuarios] = useState([])
  const [error, setError] = useState('')
  const [guardando, setGuardando] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    obtenerUsuarios()
  }, [])

  const obtenerUsuarios = async () => {
    try {
      const response = await api.get('/usuarios/')
      setUsuarios(response.data)
    } catch (error) {
    console.error("ERROR COMPLETO:", error);
    console.error("RESPONSE:", error.response);
    console.error("DATA:", error.response?.data);

    setError(
        JSON.stringify(error.response?.data || "Error desconocido")
    );
}
  }

  const handleChange = (e) => {
    dispatch({
      name: e.target.name,
      value: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
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
        responsable: formulario.responsable || null,
        prioridad: formulario.prioridad,
        observaciones: formulario.observaciones,
      }

      await api.post('/solicitudes/', payload)

      navigate('/solicitudes')
    } catch (error) {
    console.error("ERROR COMPLETO:", error);
    console.error("RESPONSE:", error.response);
    console.error("DATA:", error.response?.data);

    setError(
        JSON.stringify(error.response?.data || "Error desconocido")
    );
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
            <h1>Crear solicitud</h1>
            <p>Registre un nuevo requerimiento interno para su seguimiento.</p>
          </div>
        </section>

        <section className="form-card">
          {error && <div className="alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <label>Título</label>
            <input
              name="titulo"
              type="text"
              value={formulario.titulo}
              onChange={handleChange}
              placeholder="Ej: Error con equipo de cómputo"
            />

            <label>Descripción</label>
            <textarea
              name="descripcion"
              value={formulario.descripcion}
              onChange={handleChange}
              placeholder="Describa la solicitud o inconveniente presentado"
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

            <label>Responsable</label>
            <select
              name="responsable"
              value={formulario.responsable}
              onChange={handleChange}
            >
              <option value="">Sin asignar</option>
              {usuarios.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.first_name || usuario.username} {usuario.last_name || ''}
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
              placeholder="Observaciones adicionales"
              rows="3"
            />

            <div className="form-actions">
              <button type="button" className="button-secondary" onClick={() => navigate('/solicitudes')}>
                Cancelar
              </button>

              <button type="submit" disabled={guardando}>
                {guardando ? 'Guardando...' : 'Guardar solicitud'}
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  )
}

export default CrearSolicitud