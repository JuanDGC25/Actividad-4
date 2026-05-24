# Sistema Web para la Gestión de Solicitudes Internas

## Actividad 4 - Tecnología Front End en la Construcción de una Aplicación Web II

Proyecto académico desarrollado para la asignatura **Electiva - Desarrollo de Aplicaciones Web** de la **Corporación Universitaria Iberoamericana**.

**Docente:** DIANA MARCE TOQUICA RODRIGUEZ  
**Repositorio:** https://github.com/JuanDGC25/Actividad-4.git

---

## Integrantes

- Juan Diego González Chinchilla
- Sergio Andrey Pulido Rios
- Bany Yohan Guerrero de Haz

---

## Descripción del proyecto

El presente proyecto consiste en el desarrollo de una aplicación web para la **gestión de solicitudes internas dentro de una organización**.

La aplicación permite que los usuarios autenticados puedan registrar, consultar, editar y eliminar solicitudes internas relacionadas con soporte técnico, mantenimiento, compras, talento humano o gestión administrativa.

El sistema está compuesto por tres servicios principales:

- **Base de datos:** PostgreSQL.
- **Backend:** Django y Django REST Framework.
- **Frontend:** ReactJS con Vite.

Cada servicio se ejecuta en un contenedor Docker independiente, permitiendo una arquitectura organizada, modular y fácil de desplegar.

---

## Resultado de aprendizaje relacionado

El proyecto responde al siguiente resultado de aprendizaje:

> Diseñar soluciones para el desarrollo de los requerimientos de software y aplicaciones en diferentes contextos organizacionales.

La solución propuesta responde a una necesidad organizacional concreta: centralizar el registro, seguimiento y control de solicitudes internas. Para esto se diseñó una aplicación web que integra interfaz gráfica, lógica de negocio, autenticación, API REST, documentación Swagger, base de datos y despliegue mediante contenedores.

---

## Saberes aplicados

### Saberes cognitivos

En el proyecto se aplican conocimientos relacionados con:

- Tecnología front-end en la construcción de aplicaciones web.
- Integración entre front-end y back-end.
- Consumo de servicios REST.
- Documentación de API REST con Swagger.
- Manejo de rutas, componentes, hooks y contexto en React.
- Técnicas básicas de testeo desde navegador, Swagger y validación de endpoints.

### Saberes procedimentales

El desarrollo del proyecto evidencia la capacidad de:

- Utilizar ReactJS para construir la interfaz gráfica de una aplicación web.
- Consumir una API REST desde el front-end usando Axios.
- Implementar rutas protegidas y navegación entre vistas.
- Crear formularios para registrar y editar información.
- Conectar el front-end con un back-end desarrollado en Django.
- Proponer una solución front-end acorde a un contexto organizacional.

### Saberes actitudinales

El proyecto incorpora:

- Creatividad en el diseño de la interfaz.
- Organización visual de la información.
- Experiencia de usuario clara y sencilla.
- Uso de mensajes de error y validaciones.
- Flujo funcional orientado a facilitar el trabajo del usuario.

---

## Objetivo general

Desarrollar una aplicación web funcional para la gestión de solicitudes internas de una organización, integrando tecnologías front-end y back-end mediante una API REST documentada con Swagger.

---

## Funcionalidades principales

- Inicio de sesión con usuarios almacenados en base de datos.
- Autenticación mediante token.
- Dashboard con resumen de solicitudes.
- Registro de nuevas solicitudes.
- Listado general de solicitudes.
- Filtro de solicitudes por estado.
- Consulta de solicitudes registradas.
- Edición completa de solicitudes.
- Cambio de responsable, prioridad, estado y observaciones.
- Eliminación de solicitudes.
- Gestión de roles desde tabla en base de datos.
- Gestión de estados desde tabla en base de datos.
- API REST documentada con Swagger.
- Frontend, backend y base de datos ejecutados en contenedores separados.

---

## Tecnologías utilizadas

| Capa | Tecnologías |
|---|---|
| Frontend | ReactJS, Vite, JavaScript, React Router DOM, Axios, Context API, CSS |
| Hooks de React | useState, useEffect, useContext, useReducer |
| Backend | Python 3.11, Django 4.2, Django REST Framework |
| Autenticación | Django User Model, TokenAuthentication |
| Documentación API | drf-spectacular, Swagger, Redoc |
| Base de datos | PostgreSQL 16 |
| Configuración | python-decouple, django-cors-headers |
| Contenedores | Docker, Docker Compose |

---

## Arquitectura general

La aplicación se organizó bajo una arquitectura cliente-servidor.

```txt
Usuario
  │
  ▼
Frontend React
  │
  ▼
API REST Django
  │
  ▼
Base de datos PostgreSQL
```

El usuario interactúa con la interfaz desarrollada en React.  
React realiza peticiones HTTP mediante Axios hacia el backend.  
El backend procesa la lógica de negocio mediante Django REST Framework.  
La información se almacena en PostgreSQL.

---

## Estructura del proyecto

```txt
Actividad-4/
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
│   │
│   ├── config/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   │
│   └── solicitudes/
│       ├── admin.py
│       ├── apps.py
│       ├── models.py
│       ├── serializers.py
│       ├── signals.py
│       ├── urls.py
│       ├── views.py
│       └── migrations/
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
```

---

## Modelo de base de datos

El sistema utiliza las siguientes entidades principales:

| Entidad | Descripción | Tabla relacionada |
|---|---|---|
| Usuario | Usuarios del sistema. Se utiliza el modelo User de Django. | `auth_user` |
| Rol | Define el tipo de usuario dentro del sistema. | `solicitudes_rol` |
| PerfilUsuario | Relaciona un usuario con un rol. | `solicitudes_perfilusuario` |
| EstadoSolicitud | Define los estados posibles de una solicitud. | `solicitudes_estadosolicitud` |
| Solicitud | Almacena los requerimientos internos registrados. | `solicitudes_solicitud` |

---

## Roles iniciales

El sistema crea automáticamente los siguientes roles:

| Rol | Función |
|---|---|
| Solicitante | Usuario que registra y consulta solicitudes internas. |
| Responsable | Usuario encargado de atender solicitudes asignadas. |
| Administrador | Usuario encargado de administrar el sistema. |

---

## Estados iniciales

El sistema crea automáticamente los siguientes estados:

| Estado | Código | Descripción |
|---|---|---|
| Pendiente | `PENDIENTE` | Solicitud registrada y pendiente de atención. |
| En proceso | `EN_PROCESO` | Solicitud asignada o en gestión. |
| Cerrada | `CERRADA` | Solicitud atendida y finalizada. |

---

## Campos principales de una solicitud

| Campo | Descripción |
|---|---|
| `titulo` | Asunto principal de la solicitud. |
| `descripcion` | Descripción detallada del requerimiento. |
| `categoria` | Tipo de solicitud. |
| `solicitante` | Usuario que crea la solicitud. |
| `responsable` | Usuario encargado de atenderla. |
| `estado` | Estado actual de la solicitud. |
| `prioridad` | Nivel de prioridad. |
| `observaciones` | Información adicional del seguimiento. |
| `fecha_creacion` | Fecha en que se registra la solicitud. |
| `fecha_actualizacion` | Fecha de última modificación. |

---

# Conceptos solicitados en la actividad

## REST con Swagger

El backend expone una API REST desarrollada con Django REST Framework. Esta API permite realizar operaciones de consulta, creación, actualización y eliminación de solicitudes.

Swagger se implementó mediante `drf-spectacular`, permitiendo documentar y probar los endpoints desde el navegador.

URL local de Swagger:

```txt
http://localhost:8000/api/docs/
```

Ejemplo aplicado:

```txt
GET /api/solicitudes/
```

Este endpoint permite obtener el listado de solicitudes registradas en el sistema.

---

## ReactJS

ReactJS se utilizó para construir la interfaz gráfica de la aplicación. La interfaz está dividida en páginas y componentes reutilizables.

Componentes y páginas principales:

```txt
Login.jsx
Dashboard.jsx
Solicitudes.jsx
CrearSolicitud.jsx
DetalleSolicitud.jsx
Navbar.jsx
ProtectedRoute.jsx
```

Ejemplo aplicado:

- `Dashboard.jsx` muestra el resumen de solicitudes.
- `Solicitudes.jsx` muestra el listado general.
- `CrearSolicitud.jsx` permite registrar nuevas solicitudes.
- `DetalleSolicitud.jsx` permite editar completamente una solicitud.

---

## Hooks

El proyecto utiliza los hooks solicitados en la actividad.

| Hook | Uso en el proyecto |
|---|---|
| `useState` | Manejo de estados locales como errores, cargas, formularios y datos. |
| `useEffect` | Carga inicial de datos desde la API. |
| `useContext` | Acceso global a la sesión del usuario. |
| `useReducer` | Manejo del formulario de creación de solicitudes. |

Ejemplos aplicados:

```txt
CrearSolicitud.jsx usa useReducer para administrar los campos del formulario.

Dashboard.jsx usa useEffect para cargar el resumen de solicitudes.

AuthContext.jsx usa useContext para compartir la sesión del usuario.

Login.jsx usa useState para manejar usuario, contraseña, errores y carga.
```

---

## Context API

Context API se implementó en:

```txt
frontend/src/context/AuthContext.jsx
```

Este contexto permite manejar la autenticación de forma global en el frontend.

Funciones principales:

- Guardar usuario autenticado.
- Guardar token en `localStorage`.
- Validar sesión.
- Cerrar sesión.
- Compartir información del usuario con los componentes.

---

## Peticiones HTTP con Axios

Axios se utiliza para conectar el frontend con el backend.

Archivo principal:

```txt
frontend/src/api/axiosConfig.js
```

Desde este archivo se configura:

- URL base de la API.
- Encabezado `Content-Type`.
- Interceptor para enviar automáticamente el token de autenticación.

Ejemplo de token enviado al backend:

```txt
Authorization: Token TOKEN_GENERADO
```

Ejemplos aplicados:

| Método | Uso |
|---|---|
| `GET` | Consultar solicitudes, usuarios, roles, estados y resumen. |
| `POST` | Crear solicitudes e iniciar sesión. |
| `PUT` | Editar completamente una solicitud. |
| `PATCH` | Editar parcialmente una solicitud. |
| `DELETE` | Eliminar solicitudes. |

---

## Rutas y navegación

La navegación se implementó con React Router DOM.

Rutas principales del frontend:

| Ruta | Función |
|---|---|
| `/login` | Inicio de sesión. |
| `/` | Dashboard principal. |
| `/solicitudes` | Listado de solicitudes. |
| `/solicitudes/crear` | Formulario para crear solicitud. |
| `/solicitudes/:id` | Detalle y edición completa de solicitud. |

También se implementó el componente:

```txt
ProtectedRoute.jsx
```

Este componente evita que un usuario sin sesión acceda a las vistas internas del sistema.

---

## Despliegue

El despliegue local se realizó mediante Docker y Docker Compose.

Cada servicio tiene su propio archivo Compose:

| Servicio | Archivo Compose | Contenedor |
|---|---|---|
| Base de datos | `docker-compose.database.yml` | `solicitudes_postgres_db` |
| Backend | `docker-compose.backend.yml` | `solicitudes_backend_django` |
| Frontend | `docker-compose.frontend.yml` | `solicitudes_frontend_react` |

Esta estructura permite separar responsabilidades y facilita la ejecución del proyecto.

---

# Autenticación

La aplicación implementa autenticación sencilla con usuarios almacenados en PostgreSQL.

El backend utiliza:

```txt
Modelo User de Django
TokenAuthentication de Django REST Framework
```

Flujo de autenticación:

```txt
1. El usuario ingresa usuario y contraseña.
2. React envía las credenciales al backend.
3. Django valida los datos.
4. El backend retorna un token.
5. React guarda el token en localStorage.
6. Axios envía el token en cada petición protegida.
```

Usuario inicial creado automáticamente:

```txt
usuario: admin
contraseña: admin123
```

---

## Endpoints principales

| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/auth/login/` | Iniciar sesión. |
| `POST` | `/api/auth/registro/` | Registrar usuario. |
| `GET` | `/api/roles/` | Listar roles. |
| `GET` | `/api/usuarios/` | Listar usuarios. |
| `GET` | `/api/estados/` | Listar estados de solicitud. |
| `GET` | `/api/solicitudes/` | Listar solicitudes. |
| `POST` | `/api/solicitudes/` | Crear solicitud. |
| `GET` | `/api/solicitudes/{id}/` | Consultar solicitud. |
| `PUT` | `/api/solicitudes/{id}/` | Editar solicitud completa. |
| `PATCH` | `/api/solicitudes/{id}/` | Editar parcialmente. |
| `DELETE` | `/api/solicitudes/{id}/` | Eliminar solicitud. |
| `GET` | `/api/solicitudes/resumen/` | Resumen para dashboard. |

---

## Flujo funcional de la aplicación

```txt
1. El usuario ingresa al sistema mediante login.
2. El backend valida las credenciales.
3. El frontend guarda el token de sesión.
4. El usuario accede al dashboard.
5. El sistema muestra el resumen de solicitudes.
6. El usuario puede registrar una nueva solicitud.
7. La solicitud queda asociada al usuario autenticado.
8. La solicitud se crea inicialmente con estado Pendiente.
9. El usuario puede consultar el listado de solicitudes.
10. El usuario puede filtrar solicitudes por estado.
11. El usuario puede editar completamente una solicitud.
12. El sistema actualiza la información en PostgreSQL.
13. El usuario puede cerrar sesión.
```

---

# Variables de entorno

## Backend

Archivo:

```txt
backend/.env
```

Ejemplo:

```env
SECRET_KEY=django-insecure-actividad-4-solicitudes
DEBUG=True

DB_NAME=solicitudes_db
DB_USER=solicitudes_user
DB_PASSWORD=solicitudes_pass
DB_HOST=solicitudes_postgres_db
DB_PORT=5432

ALLOWED_HOSTS=localhost,127.0.0.1,0.0.0.0,solicitudes_backend_django

CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

---

## Frontend

Archivo:

```txt
frontend/.env
```

Ejemplo:

```env
VITE_API_URL=http://localhost:8000/api
```

---

# Ejecución del proyecto con Docker

## 1. Clonar el repositorio

```bash
git clone https://github.com/JuanDGC25/Actividad-4.git
cd Actividad-4
```

---

## 2. Crear red compartida

```bash
docker network create solicitudes_network
```

---

## 3. Levantar base de datos

```bash
docker compose -f docker-compose.database.yml up -d
```

---

## 4. Levantar backend

```bash
docker compose -f docker-compose.backend.yml up -d --build
```

Ver logs:

```bash
docker logs -f solicitudes_backend_django
```

---

## 5. Levantar frontend

```bash
docker compose -f docker-compose.frontend.yml up -d --build
```

Ver logs:

```bash
docker logs -f solicitudes_frontend_react
```

---

## URLs del proyecto

| Servicio | URL |
|---|---|
| Frontend React | `http://localhost:5173` |
| Backend API | `http://localhost:8000/api/` |
| Swagger | `http://localhost:8000/api/docs/` |
| Redoc | `http://localhost:8000/api/redoc/` |
| Django Admin | `http://localhost:8000/admin/` |
| PostgreSQL | `localhost:5434` |

---

# Comandos útiles

## Apagar frontend

```bash
docker compose -f docker-compose.frontend.yml down
```

## Apagar backend

```bash
docker compose -f docker-compose.backend.yml down
```

## Apagar base de datos

```bash
docker compose -f docker-compose.database.yml down
```

## Apagar todos los servicios

```bash
docker compose -f docker-compose.frontend.yml down
docker compose -f docker-compose.backend.yml down
docker compose -f docker-compose.database.yml down
```

## Reconstruir backend

```bash
docker compose -f docker-compose.backend.yml down
docker compose -f docker-compose.backend.yml up -d --build
```

## Reconstruir frontend

```bash
docker compose -f docker-compose.frontend.yml down
docker compose -f docker-compose.frontend.yml up -d --build
```

## Verificar contenedores activos

```bash
docker ps
```

## Entrar a PostgreSQL

```bash
docker exec -it solicitudes_postgres_db psql -U solicitudes_user -d solicitudes_db
```

---

# Técnicas de testeo aplicadas

## Pruebas en backend

Se validaron los endpoints desde Swagger:

```txt
http://localhost:8000/api/docs/
```

Pruebas realizadas:

- Login de usuario.
- Listado de solicitudes.
- Creación de solicitud.
- Edición completa de solicitud.
- Eliminación de solicitud.
- Consulta de roles.
- Consulta de estados.
- Consulta de resumen para dashboard.

---

## Pruebas en frontend

Se validó el flujo de navegación desde el navegador:

```txt
http://localhost:5173
```

Pruebas realizadas:

- Login con usuario registrado.
- Protección de rutas internas.
- Visualización del dashboard.
- Registro de una nueva solicitud.
- Listado de solicitudes.
- Filtro por estado.
- Edición completa de una solicitud.
- Eliminación de una solicitud.
- Cierre de sesión.

---

## Pruebas de integración

Se verificó la comunicación entre React y Django mediante Axios.

Pruebas realizadas:

- El frontend envía credenciales al backend.
- El backend retorna token.
- Axios envía el token en cada petición.
- React consume datos reales desde PostgreSQL.
- Los cambios realizados desde el frontend se reflejan en la base de datos.
- Los errores de validación del backend se muestran o se controlan desde el frontend.

---

# Relación con la rúbrica

## Presentación del documento

El proyecto permite elaborar el documento final en PDF con:

- Portada.
- Desarrollo del ejercicio.
- Bibliografía.
- Introducción.
- Conceptos solicitados.
- Ejemplos aplicados.
- URL del código fuente.
- Evidencias del funcionamiento.
- Normas APA séptima edición.

---

## Aplicación de tecnologías back-end

El proyecto cumple este criterio porque implementa:

- Backend con Django.
- API REST con Django REST Framework.
- Autenticación por token.
- Base de datos PostgreSQL.
- Modelos relacionales.
- Serializers con validaciones.
- Views organizadas por responsabilidad.
- Endpoints documentados con Swagger.
- Manejo de errores mediante validaciones del backend.
- Contenedor independiente para el backend.

---

## Aplicación de tecnologías front-end

El proyecto cumple este criterio porque implementa:

- Frontend con ReactJS.
- Componentes reutilizables.
- Hooks solicitados en la actividad.
- Context API para autenticación.
- Axios para peticiones HTTP.
- Rutas y navegación con React Router DOM.
- Rutas protegidas.
- Interfaz visual organizada.
- Formularios funcionales.
- Edición completa de solicitudes.
- Experiencia de usuario sencilla y clara.
- Contenedor independiente para el frontend.

---

# Evidencias sugeridas para el documento PDF

Para el documento final de la actividad se recomienda incluir capturas de:

- Login.
- Dashboard.
- Listado de solicitudes.
- Formulario de creación.
- Edición completa de solicitud.
- Swagger con endpoints.
- Contenedores Docker en ejecución.
- Repositorio de GitHub.

---

# Bibliografía sugerida para el documento

Pérez Ibarra, S. G., Quispe, J. R., Mullicundo, F. F., & Lamas, D. A. (2021, abril 15-16). *Herramientas y tecnologías para el desarrollo web desde el frontend y backend*. XXIII Workshop de Investigadores en Ciencias de la Computación, Chilecito, La Rioja.

Regla, P. D. (2014). *Diseño, contenidos y desarrollo del front-end del sitio web del proyecto auralizarte* [Trabajo de grado, Universidad Pública de Navarra].

Valdivia Caballero, J. J. (2021). *Modelo de procesos para el desarrollo del front-end de aplicaciones web* [Tesis de maestría, Universidad Nacional Mayor de San Marcos].

Martínez Martínez, A. (2021). *Proyecto feedback backend y frontend web* [Trabajo de grado, Universitat Jaume].


---