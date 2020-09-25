const express = require('express');
const LoginController = require('./controllers/LoginController');
const PatientController = require('./controllers/PatientController');
const AdminController = require('./controllers/AdminController');
const PsychologistController = require('./controllers/PsychologistController');
const PsychologyCalendary = require('./controllers/PsychologyCalendary');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

// Patient routes
routes.get('/users', PatientController.index);
routes.get('/user/:email', PatientController.show);
routes.post('/users', PatientController.store);
routes.delete('/user', PatientController.destroy);
routes.put('/userUpdate/:email', PatientController.update);
routes.put('/user/:email', PatientController.updatePassword);

// Login routes
routes.post('/loginUser', LoginController.showUser);
routes.post('/loginPsy', LoginController.showPsy);

// Admin routes
routes.post('/admin', AdminController.store);
routes.post('/admin/login', AdminController.show);

// Psy routes
routes.post('/admin/psy/create', PsychologistController.store);
routes.get('/admin/psy/list', PsychologistController.index);
routes.get('/psy/:email', PsychologistController.show);
routes.delete('/admin/psy/:email', PsychologistController.destroy);
routes.put('/calendary/update/', PsychologyCalendary.update);
routes.post('/calendary/update/', PsychologyCalendary.index);
routes.post('/calendary/restrict/', PsychologyCalendary.show);
routes.put('/psyUpdate/:email', PsychologistController.update);
routes.put('/psyUpdatePassword/:email', PsychologistController.updatePassword);
routes.post('/session', SessionController.store);
routes.get('/session/:email', SessionController.show);
routes.get('/session/all/:email', SessionController.index);
routes.put('/session', SessionController.update);
routes.delete('/session/:email', SessionController.destroy);

module.exports = routes;
