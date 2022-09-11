'use strict';

const stationStore = require ('../models/station-store');
const maxmin = require ('./maxmin');
const trends = require ('./trends');
const _ = require("lodash");
const logger = require("../utils/logger");


const analytics = {
  
  updateWeather(station){
    let lastReading = null;
    if (station.readings.length >0) {
    lastReading = station.readings[station.readings.length - 1];
    station.code = lastReading.code;
    station.tempC = lastReading.temperature;
    station.pressure = lastReading.pressure;
      
    station.weatherCode = analytics.weatherCodes(lastReading.code);
    station.weatherIcon = analytics.weatherIcon(lastReading.code);
    
    station.tempF = analytics.tempF(lastReading.temperature);
    station.windBft = analytics.beaufort(lastReading.windSpeed);
    station.windChill = analytics.windChill(lastReading.temperature, lastReading.windSpeed).toFixed(2);
    station.windCompass = analytics.windCompass(lastReading.windDirection);
    
    station.maxTemp = maxmin.maxTemp(station.readings);
    station.minTemp = maxmin.minTemp(station.readings);
    station.maxWind = maxmin.maxWind(station.readings);
    station.minWind = maxmin.minWind(station.readings);
    station.maxPressure = maxmin.maxPressure(station.readings);
    station.minPressure = maxmin.minPressure(station.readings);
      
    station.trendTemp = trends.trendTemp(station.readings);
    station.trendWind = trends.trendWind(station.readings);
    station.trendPressure = trends.trendPressure(station.readings);
      
    logger.info(station);
    }
  },

  windChill(temp, windspeed){
    return 13.12 + 0.6215 * temp -  11.37 * (Math.pow(windspeed, 0.16)) + 0.3965 * temp * (Math.pow(windspeed, 0.16));
  },
  
  weatherCodes(code){
  const weatherCodes = new Map();
  weatherCodes.set('100','Clear');
  weatherCodes.set('200','Partial Clouds');
  weatherCodes.set('300','Cloudy');
  weatherCodes.set('400','Light Showers');
  weatherCodes.set('500','Heavy Showers');
  weatherCodes.set('600','Rain');
  weatherCodes.set('700','Snow');
  weatherCodes.set('800','T-storm');
  return weatherCodes.get(code);
  },
  
  weatherIcon(code){
  const weatherIcons = new Map();
  weatherIcons.set('100',"big circular colored white sun icon"); 
  weatherIcons.set('200',"big circular colored white cloud sun icon");
  weatherIcons.set('300',"big circular colored white cloud icon");
  weatherIcons.set('400',"big circular colored white cloud sun rain icon");
  weatherIcons.set('500',"big circular colored white cloud showers heavy icon");
  weatherIcons.set('600',"big circular colored white cloud rain icon");
  weatherIcons.set('700',"big circular colored white snowflake icon");
  weatherIcons.set('800',"big circular colored white poo storm icon");
  return weatherIcons.get(code);
  },
  
  
  tempF(tempC) {
  return(tempC * 1.8) + 32;
  },
  
  beaufort(windspeed) {
    if (windspeed == 0) {
      return 0;
    } else if (windspeed >= 1 && windspeed <= 6) {
      return 1;
    } else if (windspeed >= 7 && windspeed <= 11) {
      return 2;
    } else if (windspeed >= 12 && windspeed <= 19) {
      return 3;
    } else if (windspeed >= 20 && windspeed <= 29) {
      return 4;
    } else if (windspeed >= 30 && windspeed <= 39) {
      return 5;
    } else if (windspeed >= 40 && windspeed <= 50) {
      return 6;
    } else if (windspeed >= 51 && windspeed <= 62) {
      return 7;
    } else if (windspeed >= 63 && windspeed <= 75) {
      return 8;
    } else if (windspeed >= 76 && windspeed <= 87) {
      return 9;
    } else if (windspeed >= 88 && windspeed <= 102) {
      return 10;
    } else if (windspeed >= 103 && windspeed <= 117) {
      return 11;
    } else if (windspeed >= 117) {
      return 12;
    }
    return -1;
  },
  
  windCompass(deg) {
      if (deg > 11.25 && deg <= 33.75) {
      return "North North East";
    } else if (deg > 33.75 && deg <= 56.25) {
      return "East North East";
    } else if (deg > 56.25 && deg <= 78.75) {
      return "East";
    } else if (deg > 78.75 && deg <= 101.25) {
      return "East South East";
    } else if (deg > 101.25 && deg <= 123.75) {
      return "East South East";
    } else if (deg > 123.75 && deg <= 146.25) {
      return "South East";
    } else if (deg > 146.25 && deg <= 168.75) {
      return "South South East";
    } else if (deg > 168.75 && deg <= 191.25) {
      return "South";
    } else if (deg > 191.25 && deg <= 213.75) {
      return "South South West";
    } else if (deg > 213.75 && deg <= 236.25) {
      return "South West";
    } else if (deg > 236.25 && deg <= 258.75) {
      return "West South West";
    } else if (deg > 258.75 && deg <= 281.25) {
      return "West";
    } else if (deg > 281.25 && deg <= 303.75) {
      return "West North West";
    } else if (deg > 303.75 && deg <= 326.25) {
      return "North West";
    } else if (deg > 326.25 && deg <= 348.75) {
      return "North North West";
    } else {
      return "North";
    }
  },
  
};

module.exports = analytics;


   