const express = require('express');
const LoginController = require('./controllers/LoginController');
const PatientController = require('./controllers/PatientController');
const AdminController = require('./controllers/AdminController');
const PsychologistController = require('./controllers/PsychologistController');
const PsychologistCalendaryController = require('./controllers/PsychologiCalendaryController');

const routes = express.Router();

routes.get('/users', PatientController.index);
routes.get('/user', PatientController.show);
routes.post('/users', PatientController.store);
routes.delete('/user', PatientController.destroy);
routes.put('/user', PatientController.update);
routes.post('/login', LoginController.show);
routes.post('/admin', AdminController.store);
routes.post('/admin/login', AdminController.show);
routes.post('/admin/psy/create', PsychologistController.store);
routes.get('/admin/psy/list', PsychologistController.index);
routes.delete('/admin/psy/:email', PsychologistController.destroy);
routes.post('/calendary/create/', PsychologistCalendaryController.store);
routes.get('/calendary/list/', PsychologistCalendaryController.index);
routes.put('/calendary/update/', PsychologistController.update);
module.exports = routes;
