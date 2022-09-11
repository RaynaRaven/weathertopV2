'use strict';

const stationStore = require ('../models/station-store');
const analytics = require ('./analytics');
const _ = require("lodash");
const logger = require("../utils/logger");

const maxmin = {
  
  minTemp(readings){
   let minVal = _.minBy(readings, _.property('temperature'));
    return minVal.temperature;
  },
  
  maxTemp(readings){
   let maxVal = _.maxBy(readings, _.property('temperature'));
    return maxVal.temperature;
  },
  
  minWind(readings){
   let minVal = _.minBy(readings, _.property('windSpeed'));
    return minVal.windSpeed;
  },
  
  maxWind(readings){
   let maxVal = _.maxBy(readings, _.property('windSpeed'));
    return maxVal.windSpeed;
  },
  
  minPressure(readings){
   let minVal = _.minBy(readings, _.property('pressure'));
    return minVal.pressure;
  },
  
  maxPressure(readings){
    let maxVal = _.maxBy(readings, _.property('pressure'));
    return maxVal.pressure;
  },
  
  
}

module.exports = maxmin;