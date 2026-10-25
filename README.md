# API REST de Tareas

API REST desarrollada con Node.js, Express y MongoDB para administrar tareas. Forma parte del proyecto TaskFlow y proporciona los endpoints que consume la aplicación frontend.

## Tecnologías

- **Node.js:** entorno de ejecución.
- **Express:** servidor y definición de rutas HTTP.
- **MongoDB:** base de datos.
- **Mongoose:** conexión con MongoDB, esquema y operaciones sobre las tareas.
- **CORS:** permite las peticiones desde el frontend durante el desarrollo.
- **Nodemon:** reinicio automático del servidor durante el desarrollo.

## Requisitos previos

Antes de ejecutar el proyecto, necesitás tener instalado:

- Node.js y npm.
- MongoDB, ejecutándose localmente.
- Git, para clonar el repositorio.

## Instalación

Cloná el repositorio:

```bash
git clone https://github.com/Rocio0408/api-rest-tareas.git
cd api-rest-tareas
```

Instalá las dependencias:

```bash
npm install
```

## Configuración de la base de datos

La API utiliza MongoDB local con la siguiente URI:

`mongodb://127.0.0.1:27017/dbTareas`

La conexión se configura en `config/db.js`. Asegurate de que MongoDB esté funcionando antes de iniciar el servidor.

La base de datos se llama `dbTareas`. MongoDB creará la base y la colección cuando se almacenen datos por primera vez.

## Ejecución

Para iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

Para ejecutar la API normalmente:

```bash
npm start
```

Por defecto, el servidor escucha en:

`http://localhost:3000`

Podés verificar que funciona realizando una petición GET a la ruta raíz:

```http
GET http://localhost:3000/
```

Respuesta esperada:

```json
{
  "mensaje": "API de tareas funcionando correctamente"
}
```

## Modelo de datos

Cada tarea utiliza los siguientes campos:

| Campo | Tipo | Descripción |
|---|---|---|
| `_id` | ObjectId | Identificador generado por MongoDB. |
| `titulo` | String | Título obligatorio de la tarea. |
| `descripcion` | String | Descripción opcional. |
| `fechaLimite` | Date | Fecha límite opcional. |
| `completada` | Boolean | Indica si la tarea está completada. Por defecto, `false`. |
| `prioridad` | String | Prioridad: `alta`, `media` o `baja`. Por defecto, `media`. |
| `etiquetas` | Array de String | Etiquetas asociadas a la tarea. |

El esquema se encuentra en `models/tareamodel.js`.

## Endpoints disponibles

Todas las rutas se encuentran en `routes/tareas.js`. La URL base local es `http://localhost:3000`.

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/` | Comprueba que la API funciona. |
| GET | `/tareas` | Obtiene todas las tareas. |
| GET | `/tareas/:id` | Obtiene una tarea por su identificador. |
| POST | `/tareas` | Crea una nueva tarea. |
| PUT | `/tareas/:id` | Actualiza una tarea existente. |
| DELETE | `/tareas/:id` | Elimina una tarea. |
| PUT | `/tareas/:id/completar` | Marca una tarea como completada. |
| GET | `/tareas/prioridad/:nivel` | Filtra tareas por prioridad. |
| GET | `/tareas/proximas-vencer/:dias` | Consulta tareas próximas a vencer. |

### 1. Crear una tarea

`POST /tareas`

Ejemplo de cuerpo JSON:

```json
{
  "titulo": "Preparar entrega del proyecto",
  "descripcion": "Revisar los requisitos y probar la aplicación",
  "fechaLimite": "2026-11-10",
  "completada": false,
  "prioridad": "alta",
  "etiquetas": ["universidad", "proyecto"]
}
```

Una creación exitosa devuelve el código HTTP `201` y la tarea guardada.

### 2. Consultar y actualizar una tarea

`GET /tareas/:id` permite consultar una tarea por su identificador.

`PUT /tareas/:id` permite actualizar sus campos. El cuerpo de la petición debe contener los campos que se desean actualizar.

### 3. Eliminar una tarea

`DELETE /tareas/:id` elimina la tarea indicada. Si se encuentra, la API devuelve un mensaje de confirmación y la tarea eliminada.

### 4. Completar una tarea

`PUT /tareas/:id/completar` marca la tarea como completada y devuelve un mensaje junto con la tarea actualizada.

### 5. Filtrar por prioridad

`GET /tareas/prioridad/:nivel`

Los valores admitidos son:

- `alta`
- `media`
- `baja`

Ejemplo:

`GET http://localhost:3000/tareas/prioridad/alta`

Si la prioridad no es válida, la API responde con el código HTTP `400`.

### 6. Consultar tareas próximas a vencer

`GET /tareas/proximas-vencer/:dias`

El parámetro `dias` debe ser un número entero mayor que cero.

Ejemplo:

`GET http://localhost:3000/tareas/proximas-vencer/7`

La consulta incluye las tareas cuya fecha límite está entre el inicio del día actual y el final del día correspondiente al límite indicado, ambos días incluidos.

Si el parámetro no es válido, la API devuelve el código HTTP `400`.

## Códigos de respuesta

La API utiliza códigos HTTP para indicar el resultado de las operaciones:

- `200 OK`: consulta u operación exitosa.
- `201 Created`: tarea creada correctamente.
- `400 Bad Request`: datos o identificador inválidos.
- `404 Not Found`: tarea inexistente.
- `500 Internal Server Error`: error durante una operación del servidor.

Las respuestas de error incluyen un mensaje descriptivo y, según la operación, información adicional del error.

## Configuración CORS

La API permite peticiones desde los siguientes orígenes locales:

- `http://localhost:5173`
- `http://localhost:5174`

Esta configuración permite que el frontend de Vite consuma los endpoints durante el desarrollo.

La configuración está en `app.js`.

## Estructura del proyecto

```text
api-rest-tareas/
├── config/
│   └── db.js
├── models/
│   └── tareamodel.js
├── routes/
│   └── tareas.js
├── app.js
├── package.json
├── package-lock.json
└── README.md
```

## Frontend asociado

Esta API es consumida por la aplicación TaskFlow:

https://github.com/Rocio0408/landing-tareas

El frontend utiliza React, TypeScript, Axios, React Router, Formik y Yup.

Para utilizar la aplicación completa, iniciá MongoDB, ejecutá la API y después iniciá el frontend en una terminal independiente.

## Verificación

Para comprobar que la API funciona:

1. Iniciá MongoDB.
2. Ejecutá `npm run dev`.
3. Consultá `http://localhost:3000/`.
4. Probá las operaciones CRUD y los filtros mediante el frontend o una herramienta para realizar peticiones HTTP.

