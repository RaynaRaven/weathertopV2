'use strict';

const stationStore = require ('../models/station-store');
const analytics = require ('./analytics');
const _ = require("lodash");
const logger = require("../utils/logger");

const trends = {
  
  trendTemp(readings){
    let trend = "null";
    if (readings.length >=3){
     const r3 = readings[readings.length - 1];
     const r2 = readings[readings.length - 2];
     const r1 = readings[readings.length - 3];

     if ((r3.temperature> r2.temperature)&&(r2.temperature> r1.temperature)){
       trend = "big white white arrow alternate circle up outline icon";
     }
     else if ((r3.temperature < r2.temperature)&&(r2.temperature < r1.temperature)){
       trend = "big white white arrow alternate circle down outline icon";
     }
     else trend = "big white white arrow alternate circle right outline icon";
    }
    return trend;
  },

  trendWind(readings){
    let trend = "null";
     if (readings.length >=3){
     const r3 = readings[readings.length - 1];
     const r2 = readings[readings.length - 2];
     const r1 = readings[readings.length - 3];

      if ((r3.windSpeed> r2.windSpeed)&&(r2.windSpeed> r1.windSpeed)){
        trend = " big white arrow alternate circle up outline icon";
      }
      else if ((r3.windSpeed < r2.windSpeed)&&(r2.windSpeed < r1.windSpeed)){
        trend = "big white arrow alternate circle down outline icon";
      }
      else trend = "big white arrow alternate circle right outline icon";
    }
    return trend;
  },

 trendPressure(readings){
    let trend = "null";
    if (readings.length >=3){
     const r3 = readings[readings.length - 1];
     const r2 = readings[readings.length - 2];
     const r1 = readings[readings.length - 3];

     if ((r3.pressure> r2.pressure)&&(r2.pressure> r1.pressure)){
        trend = "big white white arrow alternate circle up outline icon";
      }
      else if ((r3.pressure< r2.pressure)&&(r2.pressure < r1.pressure)){
        trend = "big white arrow alternate circle down outline icon";
      }
      else trend = "big white arrow alternate circle right outline icon";
    }
    return trend;
  },
  
}

module.exports = trends;