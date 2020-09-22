const express = require('express');
const LoginController = require('./controllers/LoginController');
const PatientController = require('./controllers/PatientController');
const AdminController = require('./controllers/AdminController');
const PsychologistController = require('./controllers/PsychologistController');

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
routes.delete('/admin/psy/:email', PsychologistController.destroy);
routes.put('/psyUpdate/:email', PsychologistController.update);
routes.put('/psyUpdatePassword/:email', PsychologistController.updatePassword);

module.exports = routes;
