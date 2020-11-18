const express = require('express');
const LoginController = require('./controllers/LoginController');
const PatientController = require('./controllers/PatientController');
const AdminController = require('./controllers/AdminController');
const PsychologistController = require('./controllers/PsychologistController');
const PsychologyCalendary = require('./controllers/PsychologyCalendary');
const SessionController = require('./controllers/SessionController');

const verifyToken = require('./middlewares/verifyToken');
const isPatient = require('./middlewares/isPatient');
const isPsychologist = require('./middlewares/isPsychologist');
const isAdmin = require('./middlewares/isAdmin');
const WaitingListController = require('./controllers/WaitingListController');

const routes = express.Router();

// Patient routes
routes.get('/users', [verifyToken], PatientController.index);
routes.get('/user/:email', [verifyToken], PatientController.show);
routes.post('/users', PatientController.store);
routes.delete('/user', PatientController.destroy);
routes.put('/user/:email', [verifyToken, isPatient], PatientController.update);
routes.put('/user/password/:email', [verifyToken, isPatient], PatientController.updatePassword);
routes.put('/user/schedule/:email', [verifyToken], PatientController.updateSchedule);
// Login routes
routes.post('/login/patient', LoginController.showUser);
routes.post('/login/psychologist', LoginController.showPsy);

// Admin routes
routes.post('/admin', AdminController.store);
routes.post('/admin/login', AdminController.show);

// Session/authenticate routes
routes.post('/session', [verifyToken, isPsychologist], SessionController.store);
routes.get('/session/:email', [verifyToken, isPsychologist], SessionController.show);
routes.get('/sessions/:email', [verifyToken, isPsychologist], SessionController.index);
routes.put('/session', [verifyToken, isPsychologist], SessionController.update);
routes.delete('/session/:email', [verifyToken, isPsychologist], SessionController.destroy);

// Psy routes
routes.post('/psychologist', [verifyToken, isAdmin], PsychologistController.store);
routes.delete('/psychologist/:email', [verifyToken, isAdmin], PsychologistController.destroy);
routes.put('/calendary/update/', [verifyToken], PsychologyCalendary.update);
routes.post('/calendary/update/', [verifyToken], PsychologyCalendary.index);
routes.post('/calendary/restrict/', [verifyToken], PsychologyCalendary.show);
routes.put('/psyUpdate/:email', [verifyToken, isPsychologist], PsychologistController.update);
routes.put('/psyUpdatePassword/:email', [verifyToken], PsychologistController.updatePassword);
routes.get('/psychologists', [verifyToken], PsychologistController.index);
routes.get(
    '/psychologist/:email',
    [verifyToken],
    PsychologistController.show,
);

// Waiting list routes
routes.get('/waitingList/:email', [verifyToken], WaitingListController.index);
routes.post('/waitingList', [verifyToken], WaitingListController.store);
routes.delete('/waitingList/:email', [verifyToken], WaitingListController.destroy);

module.exports = routes;
