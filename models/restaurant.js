'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//check current time range is in between start and end time.
var getIsOpenStatus = function(startTime, endTime) {
  var today = new Date(),
  resultObj = {};
    resultObj.open = (startTime <= today.getHours()) && (today.getHours() <= endTime) ? true : false;
  return resultObj;
};

//Restaurant Schema
var RestaurantSchema = new Schema({
  name: {
    type: String,
    required:true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  //for simplicity we are storing time in 24 hour format
  startTime:{   
    type: Number
  },
  endTime:{
    type: Number
      }
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});


//Virtual Fields
RestaurantSchema
  .virtual('isOpen')
  .get(function() {
    var isOpenStatus = getIsOpenStatus(this.startTime, this.endTime);
    return isOpenStatus.open;
  });

var Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = Restaurant;