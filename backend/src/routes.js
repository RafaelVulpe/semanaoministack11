const express = require('express');
const OngController = require('./controllers/OngController');
const CasoController = require('./controllers/CasoController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const routes = express.Router();


routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.Index);
routes.post('/ongs', OngController.Create);

routes.post('/casos', CasoController.Create);
routes.get('/casos', CasoController.Index);
routes.delete('/casos/:id', CasoController.delete);

routes.get('/profile', ProfileController.Index);

module.exports = routes;

