define([
], function(
) {
'use strict';
return ['$http',
function($http) {
    return {
        getDocRules: function() {
            return $http.get('/mappingRule/list', {
                params: {
                    offset: 0,
                    length: 10
                }
            });
        },
        getLabelRules: function() {
            return $http.get('/labelRule/list');
        }
    };

    // 结束 
}];
});
