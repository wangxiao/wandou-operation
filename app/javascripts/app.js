define([
    'angular',
    'angularRoute',
    'jquery',
    'text!templates/auth/sign-in.html',
    'auth/main',
    'text!templates/index/index.html',
    'index/main',
    'common/main'
], function(
    angular,
    angularRoute,
    $,
    signInTpl,
    wdAuth,
    indexTpl,
    wdIndex,
    wdCommon
) {
'use strict';
    angular
    .module('wdApp', ['ngRoute', 'wdAuth', 'wdIndex', 'wdCommon'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/auth', {
                template: signInTpl,
                controller: 'wdLdapCtrl'
            })
            .when('/index', {
                template: indexTpl,
                controller: 'wdIndexCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
    // 手工初始化 wdApp，一个 element 只能被初始化一次。
    angular.bootstrap(document, ['wdApp']);
});
