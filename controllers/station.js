"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const uuid = require('uuid');
const analytics = require('../utils/analytics');
const trends = require('../utils/trends');
const maxmin = require('../utils/maxmin');


const station = {
  index(request, response) {
    const stationId = request.params.id;
    logger.debug('Station id = ', stationId);
    const station = stationStore.getStation(stationId);
    const viewData = {
      name: station.name,
      station: station,
    };
    analytics.updateWeather(station);
    response.render('station', viewData);
  },

  deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.info('Deleting Reading ${readingId} from Station ${stationId}');
    stationStore.removeReading(stationId, readingId);
    response.redirect('/station/' + stationId);
  },
  
  addReading(request, response){
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const date = new Date;
    const newReading = {
      readingid: uuid.v1(),
      date: date.toLocaleString([]),
      code: request.body.code, 
      temperature: request.body.temperature,
      windSpeed: request.body.windSpeed, 
      windDirection: request.body.windDirection,
      pressure: request.body.pressure,
    };
    logger.info('New Reading = ', newReading);
    stationStore.addReading(stationId, newReading);
    response.redirect('/station/'+ stationId);
  },
};

module.exports = station;
