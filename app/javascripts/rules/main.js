define([
    'angular',
    './controllers/doc-rules',
    './services/rules',
    './controllers/label-rules',
    './controllers/content-type-rules'
], function(
    angular,
    docRulesCtrl,
    rulesSer,
    labelRulesCtrl,
    contentTypeRulesCtrl
) {
'use strict';

    angular
        .module('wdRules', [])
        .controller('wdDocRulesCtrl', docRulesCtrl)
        .factory('wdRulesSer', rulesSer)
        .controller('wdLabelRulesCtrl', labelRulesCtrl)
        .controller('wdContentTypeRulesCtrl', contentTypeRulesCtrl);

// 结束
});
