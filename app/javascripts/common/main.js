define([
    'angular',
    './directives/account-header',
    './directives/sidebar',
    './directives/footer',
    './directives/modal',
    './directives/modal-btn',
    './directives/loading',
    './services/sidebar',
    './services/config'
], function(
    angular,
    accountHeader,
    sidebar,
    footer,
    modal,
    modalBtn,
    loading,
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
        .directive('wdLoading', loading)
        .factory('wdSidebarSer', sidebarSer)
        .factory('wdConfig', config);

// 结束
});
