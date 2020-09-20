const express = require('express');
const LoginController = require('./controllers/LoginController');
const PatientController = require('./controllers/PatientController');
const AdminController = require('./controllers/AdminController');
const AdminLoginController = require('./controllers/AdminLoginController');
const PsychologistController = require('./controllers/PsychologistController');

const routes = express.Router();

routes.get('/users', PatientController.index);
routes.get('/user', PatientController.show);
routes.post('/users', PatientController.store);
routes.delete('/user', PatientController.destroy);
routes.put('/user', PatientController.update);
routes.post('/login', LoginController.show);
routes.post('/admin', AdminController.store);
routes.post('/admin/login', AdminLoginController.show);
routes.post('/admin/psy/create', PsychologistController.store);
routes.get('/admin/psy/list', PsychologistController.index);
routes.delete('/admin/psy/:email', PsychologistController.destroy);

module.exports = routes;
