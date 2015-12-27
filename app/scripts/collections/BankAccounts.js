/*global define*/

define([
  'backbone',
  'models/BankAccount'
], function (Backbone, BankAccount) {
  'use strict';

  var BankAccountsCollection = Backbone.Collection.extend({
    model: BankAccount
  });

  return BankAccountsCollection;
});
