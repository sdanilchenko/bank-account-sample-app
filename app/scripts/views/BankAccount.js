/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'text!templates/BankAccount.hbs'
], function ($, _, Backbone, Handlebars, BankAccountTpl) {
  'use strict';

  var BankAccountView = Backbone.View.extend({
    template: Handlebars.compile(BankAccountTpl),

    id: function () {
      return 'bank-account-' + this.model.cid;
    },

    events: {
      'click button[name=delete]': 'deleteAccount',
      'focus input[type=text]': 'hideError'
    },

    initialize: function () {
      this.listenTo(this.model, 'invalid', this.showErrors);
    },

    render: function () {
      var context = this.model.toJSON();
      context.canBeDeleted = this.model.collection.indexOf(this.model) > 0;
      context.cid = this.model.cid;
      this.$el.html(this.template(context));
      return this;
    },

    showErrors: function (model, error, options) {
      _.forOwn(error.invalidFields, function (text, field) {
        this.$('input[name='+ field + '-' + this.model.cid + ']').addClass('error')
          .next('span.error').text(text).show();
      }, this);
    },

    hideError: function (e) {
      $(e.target).removeClass('error')
        .next('span.error').hide();
    },

    deleteAccount: function () {
      this.model.collection.remove(this.model);
    },

    dataToModel: function () {
      this.model.set({
        iban: this.$('input[name=iban-'+ this.model.cid +']').val(),
        bic: this.$('input[name=bic-'+ this.model.cid +']').val()
      });
    }
  });

  return BankAccountView;
});
