define([
    'angular',
    './controllers/doc-rules',
    './services/rules',
    './controllers/label-rules',
], function(
    angular,
    docRulesCtrl,
    rulesSer,
    labelRulesCtrl
) {
'use strict';

    angular
        .module('wdRules', [])
        .controller('wdDocRulesCtrl', docRulesCtrl)
        .factory('wdRulesSer', rulesSer)
        .controller('wdLabelRulesCtrl', labelRulesCtrl);

// 结束
});
