define([
], function(
) {
'use strict';
return ['$rootScope', function($rootScope) {

    return {
        apiUrl: 'http://192.168.100.72:8080/appGenes/api/admin',
        // apiUrl: 'http://192.168.110.53:8080/api/admin',
        httpTimeout: 10000
    };
    // 结束 
}];
});
