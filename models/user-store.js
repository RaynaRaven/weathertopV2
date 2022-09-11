'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const userStore = {
  
  store: new JsonStore('./models/user-store.json', {users: []}),
  collection: 'users',
  
  getAllUsers() {
    return this.store.findALl(this.collection);
  },
  
  addUser(user) {
    this.store.add(this.collection, user);
    this.store.save();
  },
  
  getUserById(id) {
    return this.store.findOneBy(this.collection, {id: id});
  },
  
  getUserByEmail(email){
    return this.store.findOneBy(this.collection, {email: email});
  },
  
  checkPassword(password){
    return this.store.findOneBy(this.collection, {password: password});
  },
  
  updateUser(currentUser, updatedUser){
    currentUser.firstName = updatedUser.firstName === "" ? currentUser.firstName : updatedUser.firstName;
    currentUser.lastName = updatedUser.lastName === "" ? currentUser.lastName : updatedUser.lastName;
    currentUser.email = updatedUser.email === "" ? currentUser.email : updatedUser.email;
    currentUser.password = updatedUser.password === "" ? currentUser.password : updatedUser.password;
    this.store.save();
  },
}

module.exports = userStore;