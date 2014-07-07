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
        pathTypeOptions: [
            {value: null, name: '全部'},
            {value: 1, name: '普通缓存路径'},
            {value: 2, name: '系统缓存路径'},
            {value: 3, name: '广告路径'},
            {value: 4, name: '正则缓存路径'},
            {value: 5, name: '应用主目录'}
        ],
        getPathType: function(pathType) {
            if (pathType === 0 || pathType) {
                return _.find(this.pathTypeOptions, function(v) {
                    if (pathType === v.value) {
                        return true;
                    }
                });
            }
        },
        adviceLevelOptions: [
            {value: 0, name: '建议清理'},
            {value: 1, name: '谨慎清理'}
        ],
        getAdviceLevel: function(adviceLevel) {
            return _.find(this.adviceLevelOptions, function(v) {
                if (adviceLevel === v.value) {
                    return true;
                }
            });
        },
        // 这个字段应该从服务器获取，写在客户端不是很合理。
        sourceOptions: [
            {value: null, name: '全部'},
            {value: 'liebao', name: 'liebao'},
            {value: '360', name: '360'},
            {value: 'lbe', name: 'lbe'},
            {value: 'wdj', name: 'wdj'}
        ],
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
                    contentTypeOptions = [];
                    // 根据运营给出的逻辑，去掉前 50，并且显示上面要增加 id。
                    _.each(data.contentTypes, function(v, i) {
                        if (v.id > 50) {
                            v.title = v.id + ' ' + v.title;
                            contentTypeOptions.push(v);
                        }
                    });
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
