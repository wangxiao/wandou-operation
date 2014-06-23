define([
    'angular',
    './controllers/index',
    './services/index'
], function(
    angular,
    indexCtrl,
    indexSer
) {
'use strict';

    angular
        .module('wdIndex', [])
        .controller('wdIndexCtrl', indexCtrl)
        .factory('wdIndexSer', indexSer);

// 结束
});
