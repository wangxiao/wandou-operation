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
    'text!templates/monitor/monitor-detail.html',
    'monitor/main',
    'text!templates/rules/doc-rules.html',
    'text!templates/rules/label-rules.html',
    'rules/main',
    'text!templates/search/search-filter.html',
    'search/main',
    'text!templates/search/sql-search.html',
    'text!templates/rules/content-type-rules.html'
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
    monitorDetailTpl,
    wdMonitor,
    docRulesTpl,
    labelRulesTpl,
    wdRules,
    searchFilterTpl,
    wdSearch,
    sqlSearchTpl,
    contentTypeRulesTpl
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
            .when('/monitor-all', {
                template: monitorTpl,
                controller: 'wdMonitorAllCtrl'
            })
            .when('/monitor-detail', {
                template: monitorDetailTpl,
                controller: 'wdMonitorDetailCtrl'
            })
            .when('/doc-rules', {
                template: docRulesTpl,
                controller: 'wdDocRulesCtrl'
            })
            .when('/label-rules', {
                template: labelRulesTpl,
                controller: 'wdLabelRulesCtrl'
            })
            .when('/content-type-rules', {
                template: contentTypeRulesTpl,
                controller: 'wdContentTypeRulesCtrl'
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
                redirectTo: '/auth'
            });

        // 全局 $http 请求配置。
        $httpProvider.interceptors.push(function(wdConfig, $location) {
            return {
                'request': function(config) {
                    config.timeout = wdConfig.httpTimeout;
                    if (!/^[http|https]/.test(config.url)) {
                        config.url = wdConfig.apiUrl + config.url;
                    }
                    return config;
                },
                'response': function(response) {
                    // if (response.status === 403) {
                    //     $location.path('/auth');
                    // }
                    return response.data;
                },
                'responseError': function(response) {
                    if (response.status === 403) {
                        $location.path('/auth');
                    }
                }
            };
        });
    });

    // 手工初始化 wdApp，一个 element 只能被初始化一次。
    angular.bootstrap(document, ['wdApp']);
});
