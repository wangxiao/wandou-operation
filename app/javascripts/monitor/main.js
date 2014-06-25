define([
    'angular',
    './controllers/list-all',
    './services/monitor',
    './controllers/monitor-detail'
], function(
    angular,
    monitorCtrl,
    monitorSer,
    monitorDetailCtrl
) {
'use strict';

    angular
        .module('wdMonitor', [])
        .controller('wdMonitorAllCtrl', monitorCtrl)
        .factory('wdMonitorSer', monitorSer)
        .controller('wdMonitorDetailCtrl', monitorDetailCtrl);

// 结束
});
