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
        getListByOnlineId: function(id) {
            return $http.get('/review/listByOnlineId/' + id);
        },
        upDateCompeteData: function(data) {
            return $http.post('/review/update', {
                action: 'save',
                reviewAppStoragePath: data,
                id: data.id
            });
        },
        // 审核完成
        checkFinishCompeteData: function(data) {
            return $http.post('/review/update', {
                action: 'reviewed',
                id: data.id
            });
        },
        publicCompeteData: function(data) {
            return $http.post('/review/update', {
                action: 'online',
                id: data.id
            });
        },
        ignoreCompeteDate: function(data) {
            return $http.post('/review/update', {
                action: 'ignore',
                id: data.id
            });
        },
        offlineCompeteDate: function(data) {
            return $http.post('/review/update', {
                action: 'offline',
                id: data.id
            });
        },
        // 自动生成文案
        autoLabel: function(data) {
            return $http.post('/rule/autolabel', data);
        },
        getCleanLog: function(id) {
            return $http.get('/cleanLog/' + id);
        }
    };

    // 结束 
}];
});
