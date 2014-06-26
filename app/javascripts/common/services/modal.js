define([
], function(
) {
'use strict';
return ['$q',
function($q) {
    var defer = $q.defer();
    return {
        defer: defer,
        show: function() {
            return this.defer.promise;
        }
    };
    // 结束 
}];
});
