define([
], function(
) {
'use strict';
return ['$http',
function($http) {
    return {
        getDocRules: function(opts) {
            if (!opts.srcItemName) {
                delete opts.srcItemName;
            }
            if (!opts.itemName) {
                delete opts.itemName;
            }
            return $http.get('/mappingRule/list', {
                params: opts
            });
        },
        deleteDocRules: function(opts) {
            return $http.post('/mappingRule/update', {
                id: opts.id,
                action: 'delete'
            });
        },
        updateDocRules: function(opts) {
            return $http.post('/mappingRule/update', {
                id: opts.id,
                action: 'update',
                mappingRule: opts
            });
        },
        addDocRules: function(opts) {
            return $http.post('/mappingRule/update', {
                id: opts.id,
                action: 'add',
                mappingRule: opts
            });
        },

        getLabelRules: function() {
            return $http.get('/labelRule/list');
        },
        deleteLabelRules: function(opts) {
            return $http.post('/labelRule/update', {
                id: opts.id,
                action: 'delete'
            });
        },
        updateLabelRules: function(opts) {
            return $http.post('/labelRule/update', {
                id: opts.id,
                action: 'update',
                labelRule: opts
            });
        },
        addLabelRules: function(opts) {
            return $http.post('/labelRule/update', {
                id: opts.id,
                action: 'add',
                labelRule: opts
            });
        },
        addContentTypeRules: function(opts) {
            return $http.post('/contentType/update', {
                id: opts.id,
                action: 'add',
                contentType: opts
            });
        },
        deleteContentTypeRules: function(opts) {
            return $http.post('/contentType/update', {
                id: opts.id,
                action: 'delete'
            });
        },
        updateContentTypeRules: function(opts) {
            return $http.post('/contentType/update', {
                id: opts.id,
                action: 'update',
                contentType: opts
            });
        },
        getClientLabelRules: function() {
            return $http.get('/label/list');
        },
        addClientLabelRules: function(opts) {
            return $http.post('/label/update', {
                    id: opts.id,
                    action: 'add',
                    contentType: opts
            });
        },
        deleteClientLabelRules: function(opts) {
            return $http.post('/label/update', {
                    id: opts.id,
                    action: 'delete'
            });
        },
        updateClientLabelRules: function(opts) {
            return $http.post('/label/update', {
                    id: opts.id,
                    action: 'update',
                    contentType: opts
            });
        }    
    };

    // 结束 
}];
});
