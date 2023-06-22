// Importar los módulos necesarios
const express = require('express');
const router = express.Router();
const Film = require('../models/Film');
const Pending = require('../models/Pending');
const Saw = require('../models/Saw');
const Favourite = require("../models/Favorite");

// Obtener todas las películas
router.get('/:type', async (req, res) => {
  try {
    await Film.find({
      type: req.params.type
    }).then(movies=> {
      console.log(movies);
      res.send(movies);
    })

    
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las películas' });
  }
});

// Obtener todas las películas pendientes de ver
router.post('/showPending/:type', async (req, res) => {
  const {userId} = req.body;
  console.log(userId);
  try {
    await Pending.find({
      type: req.params.type,
      userId: userId 
    }).then(movies=> {
      console.log(movies);
      res.send(movies);
    })
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener las películas ' + error});
  }
});

// Obtener todas las películas vistas
router.post('/showSaw/:type', async (req, res) => {
  const {userId} = req.body;
  console.log(userId);
  try {
    await Saw.find({
      type: req.params.type,
      userId: userId 
    }).then(movies=> {
      console.log(movies);
      res.send(movies);
    })
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener las películas ' + error});
  }
});

// Obtener todas las películas favoritas
router.post('/showFavourite/:type', async (req, res) => {
  const {userId} = req.body;
  console.log(userId);
  try {
    await Favourite.find({
      type: req.params.type,
      userId: userId 
    }).then(movies=> {
      console.log(movies);
      res.send(movies);
    })
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener las películas ' + error});
  }
});

router.post('/:idFilm', async (req, res) => {
  try {
    await Film.find({
      _id: req.params.idFilm
    }).then(movie=> {
      console.log(movie);
      res.send(movie);
    })

    
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las películas' });
  }
});

// Agregar nueva
router.post('/', async (req, res) => {
  console.log(req.body);
  const newMovie = new Film({
    type: req.body.type,
    title: req.body.title,
    rangeAge: req.body.rangeAge,
    synopsis: req.body.synopsis,
    score: req.body.score,
    poster: req.body.poster,
    genre: req.body.genre,
    duration: req.body.duration
  });
  newMovie.save();
  res.send("agregada a la base de datos");
});


// Modificar una película existente
router.put('/', async (req, res) => {
  const movie = req.body;
  console.log(req.body);
  try {
    const updatedMovie = await Film.findByIdAndUpdate(
      movie._id,
      { 
        title: movie.title,
        genre: movie.genre,
        score: movie.score,
        synopsis: movie.synopsis,
        rangeAge: movie.rangeAge,
        duration: movie.duration,
        poster: movie.poster
       },

    );
    if (!updatedMovie) {
      return res.status(404).json({ message: 'Película no encontrada' });
    }
    if(movie.type==="film") res.send("Película '"+movie.title+"' actualizada");
    if(movie.type==="serie") res.send("Serie '"+movie.title+"' actualizada");
  } catch (error) {
    res.send({ message: 'Error al modificar la película contacte con un admin... ups' });
  }
});


// Eliminar una película
router.delete('/:id/:type', async (req, res) => {
  const movieId = req.params.id;
  const type = req.params.type;
  console.log(movieId);
  try {
    const deletedMovie = await Film.findByIdAndRemove(movieId);
    if (!deletedMovie) {
      return res.status(404).json({ message: 'Película no encontrada' });
    }
    if(type==="film") res.send("Película '"+movieId+"' eliminada");
    if(type==="serie") res.send("Serie '"+movieId+"' eliminada");
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la película' });
  }
});

// Marcar una película como favorita
router.post('/favourite/:type', async (req, res) => {
  const type = req.params.type;
  const {id, idUser} = req.body;
  console.log(id+ " " + idUser + " " + type + "----> favoritas");
  Favourite.find({
    userId: idUser,
    filmId: id
  }).then(resp=> {
    if(resp.length===0){
      const newFav = new Favourite({
        type: type,
        filmId: id,
        userId: idUser
      });
      newFav.save();
      res.send("se ha añadido a tu lista de favoritos");
    }else{
      res.send("ya está en tu lista de favoritos");
    }
  })
});

// Marcar una película como pendiente de ver
router.post('/pending/:type', async (req, res) => {
  const type = req.params.type;
  const {id, idUser} = req.body;
  console.log(id + " " + idUser + " " + type + "----> pendientes");
  Pending.find({
    userId: idUser,
    filmId: id
  }).then(resp=> {
    if(resp.length===0){
      const newPending = new Pending({
        type: type,
        filmId: id,
        userId: idUser,
      });
      newPending.save();
      res.send("se ha añadiddo a tu lista de pendientes de ver");
    }else{
      res.send("ya está en tu lista de pendientes de ver");
    }
  })

});

// Marcar una película como vista
router.post('/saw/:type', async (req, res) => {
  const type = req.params.type;
  const {id, idUser} = req.body;
  console.log(id+ " " + idUser + " " + type + "----> vistas");
  Saw.find({
    userId: idUser,
    filmId: id
  }).then(resp=> {
    if(resp.length===0){
      const newSaw = new Saw({
        type: type,
        filmId: id,
        userId: idUser
      });
      newSaw.save();
      res.send("se ha añadido a tu lista de elementos ya vistos");
    }else{
      res.send("ya está en tu lista de elementos ya vistos");
    }
  })
});

// Eliminar una película de pendientes
router.delete('/pending/list/:id/:idUser/:type', async (req, res) => {

  const {id, idUser, type} = req.params;
  console.log(req.params);
  Pending.findByIdAndDelete(
    id
  ).then(async resp=> {
    console.log(resp);
    await Pending.find({
      type: type,
      userId: idUser,
    }).then(movies=> {
      console.log(movies.length);
      res.send(movies);
    })
  })
});

// Eliminar una película de vistos
router.delete('/saw/list/:id/:idUser/:type', async (req, res) => {

  const {id, idUser, type} = req.params;
  console.log(req.params);
  console.log("*****" + id);
  Saw.findByIdAndDelete(
    id
  ).then(async resp=> {
    console.log(resp);
    await Saw.find({
      type: type,
      userId: idUser,
    }).then(movies=> {
      console.log(movies.length);
      res.send(movies);
    })
  })
});

// Eliminar una película de favoritos
router.delete('/favourite/list/:id/:idUser/:type', async (req, res) => {

  const {id, idUser, type} = req.params;
  console.log(req.params);;
  Favourite.findByIdAndDelete(
    id
  ).then(async resp=> {
    console.log(resp);
    await Favourite.find({
      type: type,
      userId: idUser,
    }).then(movies=> {
      console.log(movies.length);
      res.send(movies);
    })
  })
});

module.exports = router;
