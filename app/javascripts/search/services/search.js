define([
], function(
) {
'use strict';
return ['$http',
function($http) {
    return {
        searchSql: function(sql) {
            return $http.post('/appStoragePath/query', sql);
        },
        searchBy: function(opts) {
            return $http.post('/appStoragePath/list', {
                offset: opts.offset,
                length: opts.size,
                params: opts
            });
        },
        applistSearch: function(udid) {
            return $http.get('/pkgName/list/' + udid);
        }
    };

    // 结束 
}];
});
