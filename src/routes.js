const express = require('express');
const LoginController = require('./controllers/LoginController');
const PatientController = require('./controllers/PatientController');
const AdminController = require('./controllers/AdminController');
const PsychologistController = require('./controllers/PsychologistController');

const routes = express.Router();

routes.get('/users', PatientController.index);
routes.get('/users/:id', PatientController.show);
routes.post('/users', PatientController.store);
routes.delete('/users/:id', PatientController.destroy);
routes.put('/users/:id', PatientController.update);
routes.put('/user/:email', PatientController.updatePassword);
routes.post('/login', LoginController.show);
routes.post('/admin', AdminController.store);
routes.post('/admin/login', AdminController.show);
routes.post('/admin/psy/create', PsychologistController.store);
routes.get('/admin/psy/list', PsychologistController.index);
routes.delete('/admin/psy/:email', PsychologistController.destroy);

module.exports = routes;