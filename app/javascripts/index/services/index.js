define([
], function(
) {
'use strict';
return ['$http', function($http) {

    return {
        getCoverageList: function(topNum) {
            if (!topNum) {
                return $http.get('/coverage/list');
            } else {
                return $http.get('/coverage/list?topNum=' + topNum);
            }            
        },
        getCounterListNum: function() {
            return $http.get('/counter/list');
        },
        updateCoverage: function(topNum) {
            if (!topNum) {
                return $http.post('/coverage/update');
            } else {
                return $http.post('/coverage/update?topNum=' + topNum);
            }
        }
    };

    // 结束 
}];
});
