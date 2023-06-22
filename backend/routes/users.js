// Importar los módulos necesarios
const express = require('express');
const router = express.Router();
const Users = require('../models/User');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    await Users.find().then(users=> {
      console.log(users);
      res.send(users);
    })
    
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la lista de usuarios' });
  }
});

// Agregar un nuevo usuario
router.post('/newUser', async (req, res) => {
  console.log(req.body);
  const { username, userType } = req.body;
  Users.find({
    name: req.body.name,
    email: req.body.email,
  }).then(resp=> {
    if(resp.length==0){
      const newUser = new Users({ 
        name: req.body.name, 
        surname: req.body.surname,
        email:req.body.email,
        password: req.body.password,
        userType: "normal" 
      });

      try {
        const savedUser = newUser.save();
        res.send(req.body.name + " te damos la bienvenida a nuestra comunidad peliculera.");
      } catch (error) {
        res.status(500).send({ message: 'Error al agregar el usuario' + error });
      }
    }else{
      res.send("Ya existe un usuario con ese nombre de usuario");
    }
  })
});

//convertir en admin/normal
router.put('/:idUser', async (req, res) => {
  const {type} = req.body;
  try {
    const updatedUser = await Users.findByIdAndUpdate(
      req.params.idUser,
      { 
        userType: type
       },

    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'Persona no encontrada' });
    }
    if(type==="admin") res.send("El usuario '"+req.params.idUser+"' ahora es administrador");
    if(type==="normal") res.send("El usuario '"+req.params.idUser+"' ahora es usuario normal");
  } catch (error) {
    res.send({ message: 'No se ha podido cambiar al usuario' + error});
  }
});
//borrar un usuario
router.delete('/:idUser', async (req, res) => {
  try {
    const updatedUser = await Users.findByIdAndDelete(
      req.params.idUser,
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'Persona no encontrada' });
    }
    res.send("El usuario '"+req.params.idUser+"' ha sido eliminado de la base de datos");
  } catch (error) {
    res.send({ message: 'No se ha podido borrar al usuario' + error});
  }
});

module.exports = router;