const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

//nuevo consulta
router.post("/:idUser", async function (req, res) {
  const idUser = req.params.idUser;
  const {name, email, subject, message, state, response} = req.body;
  console.log(email);
  const contact = new Contact({
    userId: idUser, 
    name: name, 
    email: email,
    subject: subject,
    message: message, 
    status: status,
    response: response,
  });
  contact.save();
  res.send("Mensaje enviado correctamente");
});

//consultar mensajes de un usuario
router.post("/myConsults/:idUser", async function (req, res) {
  const idUser = req.params.idUser;
  Contact.find({
    userId: idUser, 
  }).then(consults=> {
    res.send(consults)
  });
});

//consultar mensajes de todos los usuarios
router.post("/all/consults", async function (req, res) {
  Contact.find().then(consults=> {
    res.send(consults)
  });
});

//actualizar consulta
router.put("/:idConsult", async function (req, res) {
  const idConsult = req.params.idConsult;
  console.log(idConsult);
  Contact.findByIdAndUpdate(
    idConsult,
    {
      response: req.body.response,
      status: req.body.status
    }
  ).then(() => {
    res.send("enviado");
  })
});




module.exports = router;


