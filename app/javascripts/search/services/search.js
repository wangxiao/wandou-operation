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
            return $http.post('/appStoragePath/list', opts);
        },
        applistSearch: function(udid) {
            return $http.get('/pkgName/list/' + udid);
        }
    };

    // 结束 
}];
});
