const express = require('express');
const LoginController = require('./controllers/LoginController');
const PatientController = require('./controllers/PatientController');
const AdminController = require('./controllers/AdminController');
const PsychologistController = require('./controllers/PsychologistController');
const PsychologyCalendary = require('./controllers/PsychologyCalendary');
const SessionController = require('./controllers/SessionController');

const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

// Patient routes
routes.get('/users', PatientController.index);
routes.get('/user/:email',[authMiddleware], PatientController.show);
routes.post('/users', PatientController.store);
routes.delete('/user', PatientController.destroy);
routes.put('/user/:email', PatientController.update);
routes.put('/user/password/:email', PatientController.updatePassword);

// Login routes
routes.post('/login/patient', LoginController.showUser);
routes.post('/login/psychologist', LoginController.showPsy);

// Admin routes
routes.post('/admin', AdminController.store);
routes.post('/admin/login', AdminController.show);

// Psy routes
routes.post('/psychologist', PsychologistController.store);
routes.get('/psychologists',[authMiddleware], PsychologistController.index);
routes.get('/psychologist/:email',[authMiddleware], PsychologistController.show);
routes.delete('/psychologist/:email', PsychologistController.destroy);
routes.put('/calendary/update/', PsychologyCalendary.update);
routes.post('/calendary/update/', PsychologyCalendary.index);
routes.post('/calendary/restrict/', PsychologyCalendary.show);
routes.put('/psyUpdate/:email', PsychologistController.update);
routes.put('/psyUpdatePassword/:email', PsychologistController.updatePassword);
routes.post('/session', SessionController.store);
routes.get('/session/:email', SessionController.show);
routes.get('/sessions/:email', SessionController.index);
routes.put('/session', SessionController.update);
routes.delete('/session/:email', SessionController.destroy);

module.exports = routes;
