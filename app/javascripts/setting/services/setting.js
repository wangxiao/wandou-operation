define([
], function(
) {
'use strict';
return ['$http',
function($http) {
    return {
        getWhiteList: function(opts) {
            return $http.get('/whiteList/list');
        },
        deleteWhiteList: function(opts) {
            return $http.post('/whiteList/update', {
                    id: opts.id,
                    action: 'delete'
            });
        },
        updateWhiteList: function(opts) {
            return $http.post('/whiteList/update', {
                    id: opts.id,
                    action: 'update',
                    whiteList: opts
            });
        },
        addWhiteList: function(opts) {
            return $http.post('/whiteList/update', {
                    id: opts.id,
                    action: 'add',
                    whiteList: opts
            });
        }
    };

    // 结束 
}];
});
