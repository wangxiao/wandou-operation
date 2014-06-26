define([
], function(
) {
'use strict';
return ['$http',
function($http) {
    return {
        searchSql: function(sql) {
            return $http.post('/appStoragePath/query', {}, {
                params: {
                    sql: sql
                }
            });
        }
    };

    // 结束 
}];
});
