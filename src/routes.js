const express = require('express');

const PatientController = require('./controllers/PatientController');

const routes = express.Router();

routes.get('/user', PatientController.store);

module.exports = routes;
