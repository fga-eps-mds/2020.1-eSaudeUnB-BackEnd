const express = require('express');
const PatientController = require('./controllers/PatientController');

const routes = express.Router();

routes.get('/users', PatientController.index);
routes.get('/users/:_id', PatientController.show);
routes.post('/users', PatientController.store);
routes.delete('/users/:_id', PatientController.destroy);
routes.put('/users/:_id', PatientController.update);


module.exports = routes;
