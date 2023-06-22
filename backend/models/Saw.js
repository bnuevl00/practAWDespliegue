const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const viewedFilmSchema = new Schema({
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

const viewedFilm = mongoose.model("vieweds", viewedFilmSchema);

module.exports = viewedFilm;