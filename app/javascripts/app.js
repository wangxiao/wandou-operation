define([
    'angular',
    'angularRoute',
    'jquery',
    'bootstrapModal',
    'text!templates/auth/sign-in.html',
    'auth/main',
    'text!templates/index/index.html',
    'index/main',
    'common/main',
    'text!templates/monitor/list-all.html',
    'monitor/main',
    'text!templates/rules/rules.html',
    'rules/main',
    'text!templates/search/search-filter.html',
    'search/main',
    'text!templates/search/sql-search.html'
], function(
    angular,
    angularRoute,
    $,
    bootstrapModal,
    signInTpl,
    wdAuth,
    indexTpl,
    wdIndex,
    wdCommon,
    monitorTpl,
    wdMonitor,
    rulesTpl,
    wdRules,
    searchFilterTpl,
    wdSearch,
    sqlSearchTpl
) {
'use strict';
    angular
    .module('wdApp', [
        'ngRoute', 
        'wdAuth', 
        'wdIndex', 
        'wdCommon', 
        'wdMonitor', 
        'wdRules',
        'wdSearch'
    ]).config(function ($routeProvider, $httpProvider) {
        $routeProvider
            .when('/auth', {
                template: signInTpl,
                controller: 'wdLdapCtrl'
            })
            .when('/index', {
                template: indexTpl,
                controller: 'wdIndexCtrl'
            })
            .when('/monitor', {
                template: monitorTpl,
                controller: 'wdMonitorCtrl'
            })
            .when('/rules', {
                template: rulesTpl,
                controller: 'wdRulesCtrl'
            })
            .when('/search-filter', {
                template: searchFilterTpl,
                controller: 'wdSearchFilterCtrl'
            })
            .when('/sql-search', {
                template: sqlSearchTpl,
                controller: 'wdSqlSearchCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

        // 全局 $http 请求配置。
        $httpProvider.interceptors.push(function(wdConfig) {
            return {
                'request': function(config) {
                    config.timeout = wdConfig.httpTimeout;
                    config.url = wdConfig.apiUrl + config.url;
                    return config;
                },

                'response': function(response) {
                    return response.data;
                }
            };
        });
    });

    // 手工初始化 wdApp，一个 element 只能被初始化一次。
    angular.bootstrap(document, ['wdApp']);
});
