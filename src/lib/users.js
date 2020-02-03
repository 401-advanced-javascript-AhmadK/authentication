/* eslint-disable no-unused-vars */
'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

let SECRET = 'lovleysecret';

// let db = {};
// let users = {};

const usersSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
});

class Users {
  constructor(schema){
    this.schema = schema;
  }

  create (record) {

    if (!this.schema[record.username]) {
      record.password = bcrypt.hash(record.password, 10);
      this.schema[record.username] = record;
      this.schema[record.username].save();
      return record;
    }else{console.error();}

  }
  // users.save = async function(record) {

  //   if (!db[record.username]) {
  //     record.password = await bcrypt.hash(record.password, 5);

  //     db[record.username] = record;
  //     return record;
  //   }

  //   return Promise.reject();
  // }

  authenticateBasic(user, pass){
    let valid = bcrypt.compare(pass, this.schema[user].password);
    return valid ? this.schema[user] : console.error();
  }

  // users.authenticateBasic = async function(user,pass) {
  //   let valid = await bcrypt.compare(pass, db[user].password);
  //   return valid ? db[user] : Promise.reject();
  // }

  generateToken(user){
    let token = jwt.sign({ username: user.username}, SECRET);
    return token;
  }

  // list(){
  //   return this.schema;
  // }
  // users.generateToken = function(user) {
  //   let token = jwt.sign({ username: user.username}, SECRET);
  //   return token;
}

// users.list = () => db;
module.exports =  Users;