var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Routeurs
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var messagesRouter = require('./routes/messages');

// Application Express
var app = express();
console.log("On passe dans : app.js");

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS (Cross-Origin Resource Sharing)
var cors = require('cors');
app.use(cors());

// Sessions
var session = require('express-session');
var db = require('./models/db.js');
const connection = require('./models/db.js');
require('dotenv').config();
var mysqlStore = require('express-mysql-session')(session);

const IN_PROD = process.env.NODE_ENV === 'production';
const TWO_HOURS = 1000 * 60 * 60 * 2;   // deux heures en millisecondes

const options = {
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  createDatabaseTable: true
};

const sessionStore = new mysqlStore(options);

app.use(session({
  name: process.env.SESS_NAME,
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    secure: IN_PROD,
    sameSite: true,
    maxAge: TWO_HOURS,
    httpOnly: true
  }
}));

// Cookies
app.use(cookieParser());

// Définir le répertoire des ressources statiques publiques
app.use(express.static(path.join(__dirname, 'public')));

// Définition des routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/messages', messagesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{ title:"Erreur !", message:"Erreur" });
});

module.exports = app;
