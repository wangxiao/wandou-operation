define([
    'angular',
    './controllers/index'
], function(
    angular,
    indexCtrl
) {
'use strict';

    angular
        .module('wdIndex', [])
        .controller('wdIndexCtrl', indexCtrl);

// 结束
});
