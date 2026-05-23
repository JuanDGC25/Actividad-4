# Sistema Web para la Gestión de Solicitudes Internas

## Actividad 4 - Tecnología Front End en la Construcción de una Aplicación Web II

Proyecto académico desarrollado para la asignatura **Electiva - Desarrollo de Aplicaciones Web** de la **Corporación Universitaria Iberoamericana**.

Docente: **DIANA MARCE TOQUICA RODRIGUEZ**

---

## Integrantes

- Juan Diego González Chinchilla
- Sergio Andrey Pulido Rios
- Bany Yohan Guerrero de Haz

---

## Descripción del proyecto

El presente proyecto consiste en el desarrollo de una aplicación web para la gestión de solicitudes internas dentro de una organización.

La aplicación permite registrar, consultar, actualizar y hacer seguimiento a solicitudes o requerimientos internos, tales como soporte técnico, mantenimiento, compras, talento humano o gestión administrativa.

El sistema está compuesto por tres servicios principales ejecutados en contenedores Docker independientes:

- Base de datos PostgreSQL.
- Backend desarrollado con Django y Django REST Framework.
- Frontend desarrollado con ReactJS y Vite.

Esta separación permite mantener una arquitectura organizada, modular y fácil de desplegar.

---

## Objetivo general

Desarrollar una aplicación web funcional que permita gestionar solicitudes internas de una organización, integrando tecnologías backend y frontend mediante una API REST documentada con Swagger.

---

## Funcionalidades principales

- Login sencillo simulado.
- Dashboard con resumen de solicitudes.
- Registro de nuevas solicitudes.
- Listado general de solicitudes.
- Filtro por estado.
- Consulta del detalle de una solicitud.
- Actualización de estado y responsable.
- Eliminación de solicitudes.
- API REST documentada con Swagger.
- Backend y frontend ejecutados en contenedores separados.
- Base de datos PostgreSQL en contenedor independiente.

---

## Tecnologías utilizadas

### Backend

- Python 3.11
- Django
- Django REST Framework
- PostgreSQL
- drf-spectacular
- django-cors-headers
- python-decouple
- psycopg2-binary

### Frontend

- ReactJS
- Vite
- JavaScript
- React Router DOM
- Axios
- Context API
- Hooks:
  - useState
  - useEffect
  - useContext
  - useReducer
- CSS

### Base de datos

- PostgreSQL 16

### Contenedores

- Docker
- Docker Compose

---

## Estructura del proyecto

```txt
actividad-4-solicitudes/
│
├── docker-compose.database.yml
├── docker-compose.backend.yml
├── docker-compose.frontend.yml
│
├── backend/
│   ├── Dockerfile
│   ├── entrypoint.sh
│   ├── requirements.txt
│   ├── .env.example
│   ├── manage.py
│   ├── config/
│   │   ├── settings.py
│   │   └── urls.py
│   │
│   └── solicitudes/
│       ├── models.py
│       ├── serializers.py
│       ├── views.py
│       ├── urls.py
│       └── admin.py
│
└── frontend/
    ├── Dockerfile
    ├── package.json
    ├── vite.config.js
    ├── .env.example
    ├── index.html
    │
    └── src/
        ├── api/
        │   └── axiosConfig.js
        │
        ├── components/
        │   ├── Navbar.jsx
        │   └── ProtectedRoute.jsx
        │
        ├── context/
        │   └── AuthContext.jsx
        │
        ├── pages/
        │   ├── Login.jsx
        │   ├── Dashboard.jsx
        │   ├── Solicitudes.jsx
        │   ├── CrearSolicitud.jsx
        │   └── DetalleSolicitud.jsx
        │
        ├── styles/
        │   └── main.css
        │
        ├── App.jsx
        └── main.jsx