const express = require('express')
require('dotenv').config()
const { dbConnection } = require('./db/config')
const cors = require('cors')

//Crear el servidor de express
const app = express();

// DB
dbConnection()

// Cors
app.use(cors())
 

//Directorio publico
app.use( express.static('public') )

// LEctura y parseo del body
app.use( express.json() )

//Rutas
app.use('/api/auth', require('./routes/auth'))

//Crud: Eventos
app.use('/api/events', require('./routes/events'))


// Escuchar peticiones

app.listen( process.env.PORT, () => {
  console.log(`Server corriendo en el puerto: ${process.env.PORT}`);
})
