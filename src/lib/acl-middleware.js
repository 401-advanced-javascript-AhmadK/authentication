'use strict';

const users = require('./users.js');

module.exports = (capability) => {

  return (req, res, next) => {
    try {
      if (users.checkCapabilities(capability, req.user.capabilities)) {
        next();
      }
      else {
        next('Access Denied');
      }
    } catch (e) {
      next('Invalid Login');
    }
  };
};