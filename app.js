const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//After Express
const bodyParser = require('body-parser');

//Routers
const indexRouter = require('./routes/index');
const movieRouter = require('./routes/movie');

//DB Connection
const db = require('./helpers/db')();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//After Express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/api/movie', movieRouter);

module.exports = app;
