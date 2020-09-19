const express = require('express');
const LoginController = require('./controllers/LoginController');
const PatientController = require('./controllers/PatientController');

const routes = express.Router();

routes.get('/users', PatientController.index);
routes.get('/users/:id', PatientController.show);
routes.post('/users', PatientController.store);
routes.delete('/users/:id', PatientController.destroy);
routes.put('/users/:id', PatientController.update);
routes.put('/user/:email', PatientController.updatePassword);
routes.post('/login', LoginController.show);

module.exports = routes;