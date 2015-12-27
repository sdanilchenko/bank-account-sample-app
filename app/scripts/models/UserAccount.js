/*global define*/

define([
  'underscore',
  'backbone',
  'utils/Validators',
  'collections/BankAccounts'
], function (_, Backbone, Validators, BankAccounts) {
  'use strict';

  var UserAccountModel = Backbone.Model.extend({
    //url: '',

    initialize: function() {
    },

    defaults: {
      firstName: '',
      lastName: '',
      dob: '',
      bankAccounts: new BankAccounts([ {} ]),
      fulfilledStep: -1
    },

    //different validation will be executed depending on the current step
    validators: [
      /* validate only personal data at first step */
      function (attrs, options) {
        var invalidFields = {},
          hasErrors = false;

        /* DISCLAIMER: I understand, that throwing error messages from model isn't a good idea as they rather belong to presentation (view),
          but this was done for brevity :) */
        if(!Validators.alpha(attrs.firstName)) {
          invalidFields.firstName = 'Please enter valid value!';
          hasErrors = true;
        }

        if(!Validators.alpha(attrs.lastName)) {
          invalidFields.lastName = 'Please enter valid value!';
          hasErrors = true;
        }

        if(!Validators.date(attrs.dob)) {
          invalidFields.dob = 'Please specify your date of birth!';
          hasErrors = true;
        }

        if(hasErrors) {
          return { invalidFields: invalidFields };
        }

      },

      /* validate bank accounts data at second step
        the main point here to trigger validation on each BankAccountModel */
      function (attr, options) {
        var allValid = this.get('bankAccounts').reduce(function (memo, account) {
          return account.isValid();
        }, false);
        if(!allValid) {
          return 'Bank account(s)  invalid';
        }
      }
    ],

    validate: function(attrs, options) {
      //get validation function depending on the fullfilled step
      var index = _.inRange(attrs.fulfilledStep, 0, 2) ? attrs.fulfilledStep : 0;
      return this.validators[index].call(this, attrs, options);
    }

  });

  return UserAccountModel;
});
