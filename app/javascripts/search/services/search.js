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
        },
        searchBy: function(opts) {
            return $http.get('/appStoragePath/list', {
                params: opts
            });
        }
    };

    // 结束 
}];
});
