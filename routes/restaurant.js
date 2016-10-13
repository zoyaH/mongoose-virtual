var express = require('express'),
router = express.Router(),
mongoose = require( 'mongoose' ),
Restaurant = mongoose.model('Restaurant');

//Insert sample restaurant
router.post('/', function(req, res, next) {
var newRestaurant = new Restaurant({'name':'Vivanta by Taaj','address':'11, Koregaon Road, Pune, Maharashtra 411001','startTime':9,'endTime':22});
  newRestaurant.save(function(err, restaurant){
    if(err){
      res.json({'error':err.errmsg});
    } else {
      res.json({'success':'Restaurant saved successfully'});
    }
  });
});

// GET restaurant listing
router.get('/', function(req, res, next) {
  Restaurant.find().exec(function(err, restaurants){
    if(err){
      res.json({'error':err.errmsg});
    } else if(restaurants && restaurants.length > 0){
      res.json(restaurants);
    } else {
      res.send('It seems restaurant collection is empty, add one or more restaurant to see list.');
    }
  });
});

module.exports = router;