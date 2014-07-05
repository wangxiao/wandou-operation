define([
    'angular',
    './directives/account-header',
    './directives/sidebar',
    './directives/footer',
    './directives/modal',
    './directives/loading',
    './directives/little-loading',
    './services/sidebar',
    './services/config',
    './services/data-setting',
    './services/storage',
    './services/modal'
], function(
    angular,
    accountHeader,
    sidebar,
    footer,
    modal,
    loading,
    littleLoading,
    sidebarSer,
    config,
    dataSetting,
    storageSer,
    modalSer
) {
'use strict';
    
    angular
        .module('wdCommon', [])
        .directive('wdAccountHeader', accountHeader)
        .directive('wdSidebar', sidebar)
        .directive('wdFooter', footer)
        .directive('wdModal', modal)
        .directive('wdLoading', loading)
        .directive('wdLittleLoading', littleLoading)
        .factory('wdSidebarSer', sidebarSer)
        .factory('wdConfig', config)
        .factory('wdDataSetting', dataSetting)
        .factory('wdStorage', storageSer)
        .factory('wdModalSer', modalSer);

// 结束
});
