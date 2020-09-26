const mongoose = require("mongoose");
const { stringify } = require("uuid");

const PsychologistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  bond: {
    type: String,
    required: true,
  },
  bibliography: {
    type: String,
  },
  specialization: {
    type: String,
  },
  week_day: [
    {
      week_day: String,
      from: String,
      to: String,
      id: Number,
    },
  ],
  restrict: [
    {
      year: String,
      day: String,
      month: String,
    },
  ],
});

module.exports = mongoose.model("Psychologist", PsychologistSchema);
