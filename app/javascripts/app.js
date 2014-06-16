define([
    'angular',
    'angularRoute',
    'text!templates/a.html',
    'jquery'
], function(
    angular,
    angularRoute,
    aTpl,
    $
) {
'use strict';

    angular
    .module('wdApp', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/wangxiao', {
                template: aTpl
            })
            .otherwise({
                redirectTo: '/'
            });
    });
    angular.bootstrap(document, ['wdApp']);
});
