const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email);
  const logUser = await User.find({
    email: email, 
    password: password
  });
  console.log(logUser);

  res.send(logUser);
});



// Modificar un usuario existente
router.put('/users/:id', async (req, res) => {
  const userId = req.params.id;
  const { username, userType } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, userType },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error al modificar el usuario' });
  }
});


module.exports = router;


