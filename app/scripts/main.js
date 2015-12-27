/*global require*/
'use strict';

require.config({
  shim: {
  },
  paths: {
    jquery: '../bower_components/jquery/dist/jquery',
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/lodash/lodash',
    handlebars: '../bower_components/handlebars/handlebars.amd',
    text: '../bower_components/requirejs-text/text'
  }
});

require([
  'backbone',
  'routes/AccountRouter'
], function (Backbone, AccountRouter) {
  window.app = new AccountRouter();
  Backbone.history.start();
});
