define([
], function(
) {
'use strict';
return ['$rootScope', function($rootScope) {

    return {
        apiUrl: '/api/admin',
        // apiUrl: 'http://192.168.100.72:8080/appGenes/api/admin',
        // apiUrl: 'http://10.0.69.156:8080/appGenes/api/admin',
        // apiUrl: 'http://app151.hy01.wandoujia.com:8910/appGenes/api/admin',
        httpTimeout: 10000
    };
    // 结束 
}];
});
