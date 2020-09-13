const express = require('express');
const PatientController = require('./controllers/PatientController');

const routes = express.Router();

routes.get('/users', PatientController.index);
routes.get('/users/:id', PatientController.show);
routes.post('/users', PatientController.store);
routes.delete('/users/:id', PatientController.destroy);
routes.put('/users/:id', PatientController.update);

module.exports = routes;
