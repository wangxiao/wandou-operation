define([
], function(
) {
'use strict';
return ['$http', function($http) {
    return {
        getCompeteAllList: function() {
            return $http.get('/review/list?type=needReview');
        },
        getCounterList: function() {
            return $http.get('/counter/list');
        },
        getContentTypeList: function() {
        }
    };

    // 结束 
}];
});
