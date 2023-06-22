const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pendingFilmSchema = new Schema({
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

const pendingFilm = mongoose.model("pendings", pendingFilmSchema);

module.exports = pendingFilm;