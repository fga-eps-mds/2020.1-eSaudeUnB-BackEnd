const express = require('express');
const LoginController = require('./controllers/LoginController');
const PatientController = require('./controllers/PatientController');

const routes = express.Router();

routes.get('/users', PatientController.index);
routes.get('/user', PatientController.show);
routes.post('/users', PatientController.store);
routes.delete('/user', PatientController.destroy);
routes.put('/user', PatientController.update);
routes.post('/login', LoginController.show);

module.exports = routes;
