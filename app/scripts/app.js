'use strict';

/**
 * @ngdoc overview
 * @name wandouOperationApp
 * @description
 * # wandouOperationApp
 *
 * Main module of the application.
 */
angular
  .module('wandouOperationApp', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
