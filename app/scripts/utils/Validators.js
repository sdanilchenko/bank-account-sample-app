define([], function () {
  'use strict';

  var  validationRegex = {
    // Matches only english and russian letters
    alpha: /^[а-яА-ЯёЁa-zA-Z]+$/,

    // Matches Date in format yyyy-mm-dd, separator can be "-", "/", " " or "."    
    date: /(19|20)\d\d-((0[1-9]|1[012])-(0[1-9]|[12]\d)|(0[13-9]|1[012])-30|(0[13578]|1[02])-31)/,

    // IBAN matcher, example GB77BARC20201530093459
    iban: /^[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{4}[0-9]{7}([a-zA-Z0-9]?){0,16}$/,

    // BIC matcher, example BARCGB22
    bic: /^[a-zA-Z]{4}[a-zA-Z]{2}[a-zA-Z0-9]{2}([a-zA-Z0-9]{3})?$/
  },
  Validators = {};

  // map validation Regex to same-named functions on validators object
  for (var key in validationRegex) { if(validationRegex.hasOwnProperty(key)) {
    Validators[key] = (function (vRegex) {
      return function(value) {
        return vRegex.test(value);
      }
    })(validationRegex[key]);
  }}

  return Validators;
});
