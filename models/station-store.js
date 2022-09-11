"use strict";

const _ = require("lodash");
const JsonStore = require('./json-store');
const logger = require("../utils/logger");

const stationStore = {
  store: new JsonStore('./models/station-store.json', {PlaylistCollection: []}),
  collection: 'stationCollection',

  getAllStations() {
    return this.store.findAll(this.collection);
  },

  getStation(id) {
     return this.store.findOneBy(this.collection, { id: id });
  },
  
  addStation(station) {
    this.store.add(this.collection, station);
    this.store.save();
  },
  
  removeStation(id) {
   const station = this.getStation(id);
   this.store.remove(this.collection, station);
   this.store.save();
  },
  
  removeAllStations() {
    this.store.removeAll(this.collection);
    this.store.save();
  },
  
  addReading(id, reading) {
    const station = this.getStation(id);
    station.readings.push(reading);
    this.store.save();
  },

  removeReading(id, readingId){
    const station = this.getStation(id);
    const readings = station.readings;
    _.remove(readings, {readingid: readingId});
    this.store.save();
  },
  
  getReading(id, readingId){
   const station = this.store.findOneBy(this.collection, {id: id});
   const readings = station.readings.filter(reading => reading.readingid == readingId);
   return readings[0];
 },
  
  getUserStations(userid){
    return this.store.findBy(this.collection, {userid: userid});
  },
  
  updateReading(reading, updatedReading){
    reading.code = updatedReading.code;
    reading.temperature = updatedReading.temperature;
    reading.windSpeed = updatedReading.windSpeed;
    reading.windDirection = updatedReading.windDirection;
    reading.pressure = updatedReading.pressure;
    this.store.save();
  }
};

module.exports = stationStore;
