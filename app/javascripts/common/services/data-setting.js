define([
    'underscore'
], function(
    _
) {
'use strict';
return ['$http', '$q', 'wdStorage',
function($http, $q, wdStorage) {
    var contentTypeOptions = [];
    return {
        pathTypeOptions: ['全部', '普通缓存路径', '系统缓存路径', '广告路径', '正则缓存路径', '应用主目录'],
        adviceLevelOptions: ['建议清理', '谨慎清理'],
        pageListLength: function(value) {
            if (value) {
                wdStorage.value('page-list-length', value);
            } else {
                return Number(wdStorage.value('page-list-length')) || 10;
            }
        },
        getContentTypeOptions: function() {
            var defer = $q.defer();
            if (contentTypeOptions.length) {
                defer.resolve(contentTypeOptions);
            } else {
                $http.get('/meta/list/').then(function(data) {
                    contentTypeOptions = data.contentTypes;
                    defer.resolve(contentTypeOptions);
                });
            }
            return defer.promise;
        },
        getContentTypeTitle: function(contentType) {
            contentType = Number(contentType);
            return _.find(contentTypeOptions, function(v) {
                if (Number(v.id) === contentType) {
                    return v.title;
                }
            });
        }
    };
    // 结束 
}];
});
