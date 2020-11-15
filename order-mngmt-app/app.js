var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter =require('./routes/product');
var orderRouter =require('./routes/order');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Database
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/order-mgmnt');
var product=db.collection('product');

var user=db.collection('user');
product.insert({"product":"fanta","price":1.30})
product.insert({"product":"coca cola","price":1.80})
product.insert({"product":"pepsi cola","price":1.60})
user.insert({"user":"John Smith"})
user.insert({"user":"James George"})
user.insert({"user":"Catherine maria"})
user.insert({"user":"Bob Smith"})

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// Make our db accessible to our router
app.use(function(req,res,next){
  req.db = db;
  next();
});
app.use('/', indexRouter);
app.use('/users', usersRouter); 
app.use('/products', productRouter); 
app.use('/orders', orderRouter); 


// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? {} : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;