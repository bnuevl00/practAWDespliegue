const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const filmSchema = new Schema({
  type: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  genre: {
    type: String,
    required: true
  },

  rangeAge: {
    type: String,
    required: true
  },

  score: {
    type: Number,
    required: true
  },

  duration: {
    type: String,
    required: true
  },

  synopsis: {
    type: String,
    required: true
  },

  poster: {
    type: String,
    required: true
  }
});

const Film = mongoose.model("Film", filmSchema);

module.exports = Film;