define([
    'angular',
    './directives/account-header',
    './directives/sidebar'
], function(
    angular,
    accountHeader,
    sidebar
) {
'use strict';

    angular
        .module('wdCommon', [])
        .directive('wdAccountHeader', accountHeader)
        .directive('wdSidebar', sidebar);

// 结束
});
