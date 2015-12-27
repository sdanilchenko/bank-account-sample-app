/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'text!templates/RegistrationSuccess.hbs'
], function ($, _, Backbone, Handlebars, RegistrationSuccessTpl) {
  'use strict';

  var RegistrationSuccessView = Backbone.View.extend({
    template: Handlebars.compile(RegistrationSuccessTpl),

    tagName: '',

    events: {},

    initialize: function () {
    },

    render: function () {
      var context = _.assign(this.model.toJSON(), { bankAccounts: this.model.get('bankAccounts').toJSON() });
      this.$el.html(this.template(context));
    }
  });

  return RegistrationSuccessView;
});
