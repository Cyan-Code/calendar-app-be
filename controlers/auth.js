const {response} = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario')

// funciones que definen el comportamiento segun las rutas de acceso
const crearUsuario = async (req, res = response) => {

  const {email, password} = req.body

  try {
    let usuario = await Usuario.findOne({email})
    
    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya se encuentra registrado'
      })
    }

    usuario = new Usuario( req.body )
    //Encriptacion de contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save()
    return res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name
    })

  } catch(e) {
    console.log(e);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor comuniquese con el soporte Tecnico'
    })
  } 
}

const loginUsuario = async ( req, res = response) => {
  const {email, password} = req.body

  try{
    const usuario = await Usuario.findOne({email})
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no existe con ese Email'
      })
    }
    // Confirmar los passwords
    const validPassword = bcrypt.compareSync(password, usuario.password)
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Password incorrecto'
      })
    }
    // Generacion del TOKEN
    return res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name
    })

  }catch(e){
    console.log(e);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor comuniquese con el soporte Tecnico'
    })
  }

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