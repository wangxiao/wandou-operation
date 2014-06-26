define([
], function(
) {
'use strict';
return ['$http',
function($http) {
    return {
        getCompeteAllList: function() {
            return $http.get('/review/list?type=needReview&offset=0&length=10');
        },
        getCounterList: function() {
            return $http.get('/counter/list');
        },
        getContentTypeList: function() {
            return $http.get('/meta/list/');
        },
        getCompeteDetail: function(id) {
            return $http.get('/review/list/' + id);
        }
    };

    // 结束 
}];
});
