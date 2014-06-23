define([
], function(
) {
'use strict';
return [
'$rootScope', '$http', 'wdConfig',
function($rootScope, $http, wdConfig) {
    return {
        getCounterListNum: function() {
            return $http.get('/counter/list');
        }
    };
    // 结束 
}];
});
