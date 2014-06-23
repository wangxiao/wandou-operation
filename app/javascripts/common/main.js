define([
    'angular',
    './directives/account-header',
    './directives/sidebar',
    './directives/footer',
    './directives/modal',
    './directives/modal-btn',
    './services/sidebar',
    './services/config'
], function(
    angular,
    accountHeader,
    sidebar,
    footer,
    modal,
    modalBtn,
    sidebarSer,
    config
) {
'use strict';
    
    angular
        .module('wdCommon', [])
        .directive('wdAccountHeader', accountHeader)
        .directive('wdSidebar', sidebar)
        .directive('wdFooter', footer)
        .directive('wdModal', modal)
        .directive('wdModalBtn', modalBtn)
        .factory('wdSidebarSer', sidebarSer)
        .factory('wdConfig', config);

// 结束
});
