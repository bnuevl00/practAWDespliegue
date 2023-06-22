const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteFilmSchema = new Schema({
 filmId: {
    type: String,
    required: true,
  },

  userId: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    required: true,
  }
});

const favoriteFilm = mongoose.model("favorites", favoriteFilmSchema);

module.exports = favoriteFilm;