define([
    'angular',
    './controllers/list-all',
    './services/monitor'
], function(
    angular,
    monitorCtrl,
    monitorSer
) {
'use strict';

    angular
        .module('wdMonitor', [])
        .controller('wdMonitorAllCtrl', monitorCtrl)
        .factory('wdMonitorSer', monitorSer);

// 结束
});
