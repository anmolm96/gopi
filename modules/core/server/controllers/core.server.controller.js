'use strict';

var validator = require('validator'),
  path = require('path'),
  config = require(path.resolve('./config/config')),
  request = require('request');

/**
 * Render the main application page
 */
exports.renderIndex = function (req, res) {
  var safeUserObject = null;
  if (req.user) {
    safeUserObject = {
      displayName: validator.escape(req.user.displayName),
      provider: validator.escape(req.user.provider),
      username: validator.escape(req.user.username),
      created: req.user.created.toString(),
      roles: req.user.roles,
      profileImageURL: req.user.profileImageURL,
      email: validator.escape(req.user.email),
      address: validator.escape(req.user.address),
      phoneNum: req.user.phoneNum,
      quantity: validator.escape(req.user.quantity),
      milkType: req.user.milkType,
      timeSlot: validator.escape(req.user.timeSlot),
      active: req.user.active,
      amountDue: validator.escape(req.user.amountDue),
      runningBill: validator.escape(req.user.runningBill),
      lastName: validator.escape(req.user.lastName),
      firstName: validator.escape(req.user.firstName),
      additionalProvidersData: req.user.additionalProvidersData
    };
  }

  res.render('modules/core/server/views/index', {
    user: JSON.stringify(safeUserObject),
    sharedConfig: JSON.stringify(config.shared)
  });
};

/**
 * Render the server error page
 */
exports.renderServerError = function (req, res) {
  res.status(500).render('modules/core/server/views/500', {
    error: 'Oops! Something went wrong...'
  });
};

/**
 * Render the server not found responses
 * Performs content-negotiation on the Accept HTTP header
 */
exports.renderNotFound = function (req, res) {

  res.status(404).format({
    'text/html': function () {
      res.render('modules/core/server/views/404', {
        url: req.originalUrl
      });
    },
    'application/json': function () {
      res.json({
        error: 'Path not found'
      });
    },
    'default': function () {
      res.send('Path not found');
    }
  });
};

/**
 *  Handles the Razorpay Payment
 */
 exports.razorpayPayment = function(req, res) {
   var pay_url = "https://"+config.razorpay.key_id +
   ":"+ config.razorpay.key_secret+"@api.razorpay.com/v1/payments/" +
   req.body.payment_id + "/capture";

   request({
     method: 'POST',
     url: pay_url,
     form: {
       amount: req.body.amount
     }
   }, function(err, res, body){
   });
 };
