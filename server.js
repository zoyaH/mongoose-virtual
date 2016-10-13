var express = require("express");
var app = express();
var mongoose = require('mongoose');
// Create the database connection 
mongoose.connect('mongodb://127.0.0.1:27017/virtual-sample');

//models need to be initialised before routes
var restaurantModel = require('./models/restaurant');
// initialise routes here
var routes = require('./routes/index');
var restaurant = require('./routes/restaurant');

app.use('/', routes);
app.use('/restaurants', restaurant);

app.listen(3000,function(){
    console.log("Working on port 3000");
});
