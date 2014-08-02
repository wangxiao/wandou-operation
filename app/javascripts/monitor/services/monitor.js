define([
    'underscore'
], function(
    _
) {
'use strict';
return ['$http',
function($http) {
    return {
        idList: [],
        setIdList: function(list) {
            var me = this;
            me.idList = [];
            _.each(list, function(v) {
                me.idList.push(v.id);
            });
        },
        filterObject: {
            pathType: null,
            source: null,
            sort: null,
            order: null
        },
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
        getCompeteNeedReviewList: function(opts) {
            opts.type = 'needReview';
            return $http.get('/review/list', {
                params: opts
            });
        },
        getCompeteIgnoredList: function(opts) {
            opts.type = 'ignored';
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
        upDateOnLineData: function(data) {
            return $http.post('/appStoragePath/update', {
                action: 'save',
                appStoragePath: data,
                id: data.onlineId
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
            var opts = {};
            opts.reviewAppStoragePath = data;
            if (data.mappingRuleId) {
                opts.mappingRuleId = data.mappingRuleId;
            }
            return $http.post('/rule/autolabel', opts);
        },
        getCleanLog: function(id) {
            return $http.get('/cleanLog/' + id);
        },
        getOnlineDataById: function(onlineId) {
            return $http.get('/appStoragePath/list/' + onlineId);
        }
    };
 
    // 结束 
}];
});
