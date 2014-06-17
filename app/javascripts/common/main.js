define([
    'angular',
    './directives/account-header',
    './directives/sidebar',
    './directives/footer'
], function(
    angular,
    accountHeader,
    sidebar,
    footer
) {
'use strict';

    angular
        .module('wdCommon', [])
        .directive('wdAccountHeader', accountHeader)
        .directive('wdSidebar', sidebar)
        .directive('wdFooter', footer);

// 结束
});
