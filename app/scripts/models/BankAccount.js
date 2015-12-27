/*global define*/

define([
  'underscore',
  'backbone',
  'utils/Validators'
], function (_, Backbone, Validators) {
  'use strict';

  var BankAccountModel = Backbone.Model.extend({
    url: '',

    initialize: function() {
    },

    defaults: {
      iban: '',
      bic: ''
    },

    validate: function(attrs, options) {
      var invalidFields = {},
        hasErrors = false;

      /* DISCLAIMER: I understand, that throwing error messages from model isn't a good idea as they should go to presentation (view),
        but this was done rather for brevity :) */
      if(!Validators.iban(attrs.iban)) {
        invalidFields.iban = 'Please enter valid IBAN (e.g. GB77BARC20201530093459)';
        hasErrors = true;
      }

      if(!Validators.bic(attrs.bic)) {
        invalidFields.bic = 'Please enter valid BIC (e.g. BARCGB22)';
        hasErrors = true;
      }

      if(hasErrors) {
        return { invalidFields: invalidFields };
      }
    }
  });

  return BankAccountModel;
});
