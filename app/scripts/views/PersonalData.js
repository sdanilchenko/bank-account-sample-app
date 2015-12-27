/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'text!templates/PersonalData.hbs'
], function ($, _, Backbone, Handlebars, PersonalDataTpl) {
  'use strict';

  var PersonalDataView = Backbone.View.extend({

    template: Handlebars.compile(PersonalDataTpl),

    events: {
      'click button[name=save]': 'savePersonalData',
      'focus input[type=text]': 'hideError',
      'focus input[type=date]': 'hideError'
    },

    initialize: function () {
      _.bindAll(this, 'showErrors');
      this.listenTo(this.model, 'invalid', this.showErrors);
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
    },

    savePersonalData: function (e) {
      this.model.set({
        firstName: this.$('input[name=firstName]').val(),
        lastName: this.$('input[name=lastName]').val(),
        dob: this.$('input[name=dob]').val(),
        fulfilledStep: 0
      }, {
        validate: true
      });
    },

    showErrors: function (model, error, options) {
      _.forOwn(error.invalidFields, function (text, field) {
        this.$('input[name='+ field +']').addClass('error')
          .next('span.error').text(text).show();
      }, this);
    },

    hideError: function (e) {
      $(e.target).removeClass('error')
        .next('span.error').hide();
    }

  });

  return PersonalDataView;
});
