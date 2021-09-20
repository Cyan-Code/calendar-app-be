const {response} = require('express')

// funciones que definen el comportamiento segun las rutas de acceso
const crearUsuario = (req, res = response) => {
  const {name, email, password} = req.body
  
  res.json({
    ok: true,
    msg: 'Register',
    name,
    email,
    password
  })
}

const loginUsuario = ( req, res = response) => {
  const {email, password} = req.body

  res.json({
    ok: true,
    msg: 'login',
    email,
    password
  })
}

const revalidarToken = ( req, res = response) => {
  res.json({
    ok: true,
    msg: 'renew'
  })
}


module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken
}