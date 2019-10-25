var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const es6renderer = require("express-es6-template-engine");
const session = require("express-session");
const FileStore = require("session-file-store")(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.engine('html', es6renderer);
app.set('views','./views');
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    store: new FileStore(),
    // secret: process.env.SESSION_SECRET,
    secret: "ya",
    resave: false,
    saveUninitialized: true,
    is_logged_in: false
}))


app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
