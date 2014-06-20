define([
    'angular',
    './controllers/list-all'
], function(
    angular,
    monitorCtrl
) {
'use strict';

    angular
        .module('wdMonitor', [])
        .controller('wdMonitorCtrl', monitorCtrl);

// 结束
});
