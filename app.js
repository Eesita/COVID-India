var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


const fetch = require("node-fetch");
var fs = require('fs');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//fetch required datas from the given link
  fetch("https://pomber.github.io/covid19/timeseries.json")
  .then(response => response.json())
  .then(data => {
    data["India"].forEach(({ date, confirmed, recovered, deaths }) =>
    //console.log
                (`${date} 
                 confirmed: ${confirmed}
                 recovered: ${recovered}
                 deaths: ${deaths}
                 active cases: ${confirmed - recovered - deaths}`)
                )
  
    var parsedCoronaData = data["India"];
    console.log(parsedCoronaData); //print all covid datas of India from given start date to till date
  
    var StringifyAllCoronaData = JSON.stringify(parsedCoronaData);
    fs.writeFile('allCovidJ.json', StringifyAllCoronaData, function(err,) {
      if(err) {
        console.log(err);
      }
    });
  
    var len = data["India"].length;
    console.log(len); //print the length of the covid datas of India
    console.log(JSON.stringify(parsedCoronaData[len-1])); // print the latest covid data of India
    
    var stringifyLatestCoronaData = JSON.stringify(parsedCoronaData[len-1]);
    fs.writeFile('covidJ.json', stringifyLatestCoronaData, function(err, covidData) {
            if(err) {
            console.log(err);
            }
          });
   });

  
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
  res.render('error');
});

module.exports = app;
