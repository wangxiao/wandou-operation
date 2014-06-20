define([
    'angular',
    './controllers/rules'
], function(
    angular,
    rulesCtrl
) {
'use strict';

    angular
        .module('wdRules', [])
        .controller('wdRulesCtrl', rulesCtrl);

// 结束
});
