const express = require('express')
require('dotenv').config()
const { dbConnection } = require('./db/config')

//Crear el servidor de express
const app = express();

// DB
dbConnection()

//Directorio publico
app.use( express.static('public') )

// LEctura y parseo del body
app.use( express.json() )

//Rutas
app.use('/api/auth', require('./routes/auth'))
// TODO: Crud: Eventos


// Escuchar peticiones

app.listen( process.env.PORT, () => {
  console.log(`Server corriendo en el puerto: ${process.env.PORT}`);
})
