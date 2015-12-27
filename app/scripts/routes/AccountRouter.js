/*global define*/

define([
  'underscore',
  'backbone',
  'models/UserAccount'
], function (_, Backbone, UserAccount) {
  'use strict';

  var AccountRouter = Backbone.Router.extend({
    routes: {
      '': 'start'
    },

    views: [
      'views/PersonalData',
      'views/BankAccounts',
      'views/RegistrationSuccess'
    ],

    initialize() {
      this.model = new UserAccount();
      _.bindAll(this,  'start', 'showPage', 'toStep');

      this.listenTo(this.model, 'change:fulfilledStep', this.toStep);
    },

    //changing views without actual routing (hash change)
    toStep: function (model, options) {
      var nextStep = model.get('fulfilledStep') + 1;
      require([ this.views[nextStep] ], this.showPage);
    },

    start: function () {
      this.toStep(this.model, {});
    },

    showPage : function (View) {
        this.removeCurrentView();
        var pageContainer = $('<div>').attr({id : 'page'})
        $('#container').html(pageContainer);
        this.showParams = {
            el: '#page',
            model: this.model
        };
        var currentView = new View(this.showParams);
        this.setView(currentView);
        currentView.render();
    },

    removeCurrentView : function () {
        if (this.view) {
            this.view.remove();
        }
        this.view = null;
    },

    setView : function (view) {
        this.view = view;
    }

  });

  return AccountRouter;
});
