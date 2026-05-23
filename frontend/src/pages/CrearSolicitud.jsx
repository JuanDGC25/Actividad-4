import { useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axiosConfig'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'

const initialState = {
  titulo: '',
  descripcion: '',
  categoria: 'Soporte técnico',
  responsable: '',
  prioridad: 'MEDIA',
}

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value,
  }
}

function CrearSolicitud() {
  const [formulario, dispatch] = useReducer(reducer, initialState)
  const [error, setError] = useState('')
  const [guardando, setGuardando] = useState(false)

  const { usuario } = useAuth()
  const navigate = useNavigate()

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

      await api.post('/solicitudes/', {
        ...formulario,
        solicitante: usuario?.nombre || 'Usuario solicitante',
        estado: 'PENDIENTE',
      })

      navigate('/solicitudes')
    } catch (error) {
      setError('No fue posible registrar la solicitud. Verifique los datos.')
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

            <label>Responsable sugerido</label>
            <input
              name="responsable"
              type="text"
              value={formulario.responsable}
              onChange={handleChange}
              placeholder="Ej: Área de sistemas"
            />

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