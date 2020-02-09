'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const users = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
});

users.pre('save', async function(){
  if (!users.username) {
    this.password = await bcrypt.hash(this.password, 10);
    console.log(this.password);
  }
});

users.statics.authenticateBasic = function(auth) {
  return this.findOne({username:auth.username})
    .then(user => user.passCompare(auth.password))
    .catch(console.error);
};
users.methods.passCompare = function(password) {
  return bcrypt.compare(password, this.password)
    .then(valid => valid ? this : null);
};
users.methods.generateToken = function(user) {
  let token = jwt.sign({ username: user.username}, process.env.SECRET);
  return token;
};

users.statics.list =  async function(){
  let results = await this.find({});
  return results;
};


users.statics.authenticateToken = async function(token){
  try {
    let tokenObject = jwt.verify(token, process.env.SECRET);

    if (tokenObject.username) {
      return Promise.resolve(tokenObject);
    } else {
      return Promise.reject();
    }
  } catch (err) {
    return Promise.reject();
  }
};

module.exports = mongoose.model('users',users);