// Inject moduels 

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//  Require Passport
var passport = require('passport');



// Bring in the data model
require('./app_api/models/db');
// Bring in the Passport config after model is defined
require('./app_api/config/passport');



// Bring in the routes for the API (delete the default routes)
var routesApi = require('./app_api/routes/index');

var app = express();

var gestionusers= require('./app_api/routes/gestionusers');
var routefrontoffice= require('./app_api/routes/routefrontoffice');


// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Set the app_client folder to serve static resources
app.use(express.static(path.join(__dirname, 'app_client')));

// Initialise Passport before using the route middleware
app.use(passport.initialize());

// Use the API routes when path starts with /api
app.use('/api', routesApi);

app.use('/gestionusers',gestionusers);
app.use('/routefrontoffice',routefrontoffice);



/*app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'app_client', 'admin.html'));
});*/


app.get('*', function(req, res){
    if (req.url.match('^\/admin/*')) {
        res.sendFile(__dirname + '/app_client/admin.html');
    } else {
        res.sendFile(__dirname + '/app_client/index.html');
    }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
