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
            return $http.post('/appStoragePath/list', {}, {
                offset: opts.offset,
                length: opts.size,
                params: opts
            });
        }
    };

    // 结束 
}];
});
