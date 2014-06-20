define([
    'angular',
    './directives/account-header',
    './directives/sidebar',
    './directives/footer',
    './directives/modal',
    './directives/modal-btn'
], function(
    angular,
    accountHeader,
    sidebar,
    footer,
    modal,
    modalBtn
) {
'use strict';

    angular
        .module('wdCommon', [])
        .directive('wdAccountHeader', accountHeader)
        .directive('wdSidebar', sidebar)
        .directive('wdFooter', footer)
        .directive('wdModal', modal)
        .directive('wdModalBtn', modalBtn);

// 结束
});
