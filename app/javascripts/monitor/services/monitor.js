define([
], function(
) {
'use strict';
return ['$http',
function($http) {
    return {
        getCompeteAllList: function(opts) {
            opts.type = 'needReview';
            return $http.get('/review/list', {
                params: opts
            });
        },
        getCompeteOnlineList: function(opts) {
            opts.type = 'needOnline';
            return $http.get('/review/list', {
                params: opts
            });
        },
        getCounterList: function() {
            return $http.get('/counter/list');
        },
        getCompeteDetail: function(id) {
            return $http.get('/review/list/' + id);
        },
        upDateCompeteData: function(data) {
            return $http.post('/review/update', {}, {
                params: {
                    action: 'save',
                    reviewAppStoragePath: data,
                    id: data.id
                }
            });
        },
        // 审核完成
        checkFinishCompeteData: function(data) {
            return $http.post('/review/update', {}, {
                params: {
                    action: 'reviewed',
                    id: data.id
                }
            });
        },
        publicCompeteData: function(data) {
            return $http.post('/review/update', {}, {
                params: {
                    action: 'online',
                    reviewAppStoragePath: data,
                    id: data.id
                }
            });
        },
        ignoreCompeteDate: function(data) {
            return $http.post('/review/update', {}, {
                params: {
                    action: 'ignore',
                    reviewAppStoragePath: data,
                    id: data.id
                }
            });
        },
        offlineCompeteDate: function(data) {
            return $http.post('/review/update', {}, {
                params: {
                    action: 'offline',
                    reviewAppStoragePath: data,
                    id: data.id
                }
            });
        },
        // 自动生成文案
        autoLabel: function(data) {
            return $http.post('/rule/autolabel', {}, {
                params: {
                    reviewAppStoragePath: data
                }
            });
        }
    };

    // 结束 
}];
});
