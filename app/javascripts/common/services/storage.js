define([
], function(
) {
'use strict';
return ['$window', function($window) {
    var storage = $window.localStorage;
    return {
        value: function(name, value) {
            if (arguments.length === 1) {
                return storage.getItem(name);
            } else {
                storage.setItem(name, value);
            }
        },
        remove: function(name) {
            storage.removeItem(name);
        }
    };
    // 结束 
}];
});
