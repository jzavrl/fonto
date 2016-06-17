// Required Angular and Angular Material scripts
var angular = require('angular'),
  ngan = require('angular-animate'),
  ngar = require('angular-aria'),
  ngme = require('angular-messages'),
  md = require('angular-material');

var app = angular.module('FontoApp', ['ngMaterial'])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue', {
        'default': 'A200'
      })
      .accentPalette('pink');
  });
