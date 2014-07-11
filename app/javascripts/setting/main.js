define([
    'angular',
    './controllers/white-list',
    './services/setting'
], function(
    angular,
    whiteListCtrl,
    settingSer
) {
'use strict';

    angular
        .module('wdSetting', [])
        .controller('wdWhiteListCtrl', whiteListCtrl)
        .factory('wdSettingSer', settingSer);

// 结束
});
