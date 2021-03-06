var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var socket = require('socket.io');
var io = socket(http);
var unitControllerModule = require('./Controllers/UnitController');
var userControllerModule = require('./Controllers/UserController');
var locationControllerModule = require('./Controllers/LocationController');


io.on('connection', function(){
    console.log("user has connected...");
})


var unitController = new unitControllerModule('Command', 'Commander');
var userController = new userControllerModule();
var locationController = new locationControllerModule(userController, unitController);
var routes = require('./routes/index')(unitController);
var users = require('./routes/users')(userController, unitController, io);
var units = require('./routes/units')(io, unitController);
var location = require('./routes/location')(io, locationController);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
  if(!req.cookies.userVal)
    res.cookie('userVal', Math.random());
  next();
})

app.use('/', routes);
app.use('/users', users);
app.use('/units', units);
app.use('/location', location);
app.use(express.static('public'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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


http.listen(8080, function(){
  console.log("listening on port 8080....");
})
