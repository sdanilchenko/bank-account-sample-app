/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'text!templates/BankAccounts.hbs',
  'views/BankAccount'
], function ($, _, Backbone, Handlebars, BankAccountsTpl, BankAccountView) {
  'use strict';

  var BankAccountsView = Backbone.View.extend({
    template: Handlebars.compile(BankAccountsTpl),

    events: {
      'click button[name=addAccount]': 'addAccount',
      'click button[name=save]': 'save'
    },

    initialize: function () {
      _.bindAll(this, 'addAccountView', 'accountModelToView', 'removeSubView');

      this.listenTo(this.model.get('bankAccounts'), 'add', this.addAccountView);
      this.listenTo(this.model.get('bankAccounts'), 'remove', this.removeAccountView);

      this.bankAccountViews = this.model.get('bankAccounts').map(this.accountModelToView);
    },

    render: function () {
      //collect containing elements for all bankAccount views
      var accountElems = _.map(this.bankAccountViews, function (accountView) {
        return accountView.render().$el;
      });
      this.$el.html(this.template(this.model.toJSON()));
      this.accountsContainer = this.$('#accounts-container');
      this.accountsContainer.append(accountElems);
    },

    addAccount: function (e) {
      this.model.get('bankAccounts').add({});
    },

    save: function (e) {
      //set user's input for each bank account into model
      _.forEach(this.bankAccountViews, function (accountView) {
        accountView.dataToModel();
      });

      this.model.set('fulfilledStep', 1, { validate: true });
    },

    remove: function () {
      _.forEach(this.bankAccountViews, this.removeSubView);
      Backbone.View.prototype.remove.apply(this, arguments);
    },

    removeSubView: function (view) {
      view.remove();
    },

    addAccountView: function (bankAccount) {
      var view = this.accountModelToView(bankAccount);
      this.bankAccountViews.push(view);
      this.accountsContainer.append(view.render().$el);
    },

    removeAccountView: function (bankAccount) {
      var view = _.find(this.bankAccountViews, { model: bankAccount });
      this.removeSubView(view);
    },

    accountModelToView: function (bankAccount) {
      return new BankAccountView({ model: bankAccount });
    }
  });

  return BankAccountsView;
});
