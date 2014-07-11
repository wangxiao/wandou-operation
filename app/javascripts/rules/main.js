define([
    'angular',
    './controllers/doc-rules',
    './services/rules',
    './controllers/label-rules',
    './controllers/content-type-rules',
    './controllers/client-label-rules'
], function(
    angular,
    docRulesCtrl,
    rulesSer,
    labelRulesCtrl,
    contentTypeRulesCtrl,
    clientLabelRulesCtrl
) {
'use strict';

    angular
        .module('wdRules', [])
        .controller('wdDocRulesCtrl', docRulesCtrl)
        .factory('wdRulesSer', rulesSer)
        .controller('wdLabelRulesCtrl', labelRulesCtrl)
        .controller('wdContentTypeRulesCtrl', contentTypeRulesCtrl)
        .controller('wdClientLabelRulesCtrl', clientLabelRulesCtrl);

// 结束
});
