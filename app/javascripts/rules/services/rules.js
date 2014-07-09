define([
], function(
) {
'use strict';
return ['$http',
function($http) {
    return {
        getDocRules: function(opts) {
            return $http.get('/mappingRule/list', {
                params: {
                    offset: opts.offset,
                    length: opts.length
                }
            });
        },
        deleteDocRules: function(opts) {
            return $http.post('/mappingRule/update', {}, {
                params: {
                    id: opts.id,
                    action: 'delete'
                }
            });
        },
        updateDocRules: function(opts) {
            return $http.post('/mappingRule/update', {}, {
                params: {
                    id: opts.id,
                    action: 'update',
                    mappingRule: opts
                }
            });
        },
        addDocRules: function(opts) {
            return $http.post('/mappingRule/update', {}, {
                params: {
                    id: opts.id,
                    action: 'add',
                    mappingRule: opts
                }
            });
        },

        getLabelRules: function() {
            return $http.get('/labelRule/list');
        },
        deleteLabelRules: function(opts) {
            return $http.post('/labelRule/update', {}, {
                params: {
                    id: opts.id,
                    action: 'delete'
                }
            });
        },
        updateLabelRules: function(opts) {
            return $http.post('/labelRule/update', {}, {
                params: {
                    id: opts.id,
                    action: 'update',
                    labelRule: opts
                }
            });
        },
        addLabelRules: function(opts) {
            return $http.post('/labelRule/update', {}, {
                params: {
                    id: opts.id,
                    action: 'add',
                    labelRule: opts
                }
            });
        }

    };

    // 结束 
}];
});
