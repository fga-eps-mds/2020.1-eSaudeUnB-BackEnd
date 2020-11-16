const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(express.json({ limit: '400mb' }));
app.use(express.urlencoded({ limit: '400mb' }));
app.use(cors());
app.use(express.json());
app.use(routes);

module.exports = app;
