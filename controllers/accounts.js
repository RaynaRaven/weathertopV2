'use strict';

const userstore = require('../models/user-store');
const logger = require('../utils/logger');
const uuid = require('uuid');
const stationStore = require("../models/station-store");

const accounts = {
  
  index(request, response){
    const viewData = {
      title: 'Login or Signup',
    };
    response.render('index', viewData);
  },
  
  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },
  
  logout(request, response) {
    response.cookie('station', '');
    response.redirect('/');
  },
  
  signup(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('signup', viewData);
  },
  
  profile(request, response){
    const currentUser = accounts.getCurrentUser(request);
    const viewData = {
      title: 'Edit your personal details',
      firstName: currentUser.firstName,
      lastName : currentUser.lastName,
      password : currentUser.password,
      email : currentUser.email, 
    };
    logger.info(viewData);
    response.render('profile', viewData);
  },
  
  register(request, response) {
    const user = request.body;
    user.id = uuid.v1();
    userstore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.redirect('/');
  },
  
  authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    const password = userstore.checkPassword (request.body.password);
    if ((user)&&(password)) {
      response.cookie('station', user.email);
      logger.info(`logging in ${user.email}`);
      response.redirect('/dashboard');
    } else {
      response.redirect('/login');
    }
  },
  
   getCurrentUser(request) {
    const userEmail = request.cookies.station;
    logger.info("userEmail = ", userEmail);
    return userstore.getUserByEmail(userEmail);
  },
  
  updateUser(request, response){
    const currentUser = accounts.getCurrentUser(request);
    const updatedUser = {
      firstName: request.body.firstName,
      lastName : request.body.lastName,
      password : request.body.password,
      email : request.body.email,  
    }
    userstore.updateUser(currentUser, updatedUser);
    response.redirect('/profile');
  }, 
  
  
  
};
  
module.exports = accounts;