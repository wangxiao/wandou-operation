define([
    'underscore'
], function(
    _
) {
'use strict';
return ['$http', '$q', 'wdStorage',
function($http, $q, wdStorage) {
    // 过滤过的 contentType
    var contentTypeOptions = [];
    // 全部 contentType
    var allContentTypeOptions = [];
    var labelIdOptions = [];
    var labelOrderTypeOptions = [];
    var contentOrderTypeOptions = [];
    var contentShowTypeOptions = [];
    var whiteListTypeOptions = [];

    return {
        userName: function(value) {
            if (value) {
                wdStorage.value('user-name', value);
            } else {
                return wdStorage.value('user-name');
            }
        },
        forClientOptions: [
            {value: true, name: '是'},
            {value: false, name: '否'}
        ],
        getClientOptions: function(value) {
            return _.find(this.forClientOptions, function(v) {
                if (v.value === value) {
                    return true;
                }
            });
        },
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
            {value: 'liebao', name: '竞品1'},
            {value: '360', name: '竞品2'},
            {value: 'lbe', name: '竞品3'},
            {value: 'wdj', name: 'wdj'}
        ],
        getSource: function(value) {
            return _.find(this.sourceOptions, function(v) {
                if (v.value === value) {
                    return true;
                }
            });
        },
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
                $http.get('/contentType/list/').then(function(data) {
                    allContentTypeOptions = data;
                    contentTypeOptions = [];
                    // 根据运营给出的逻辑，去掉前 50，并且显示上面要增加 id。
                    _.each(data, function(v, i) {
                        if (v.id > 50) {
                            v.uiTitle = v.id + ' ' + v.title;
                            contentTypeOptions.push(v);
                        }
                    });
                    defer.resolve(contentTypeOptions);
                });
            }
            return defer.promise;
        },
        getAllContentTypeOptions: function() {
            var defer = $q.defer();
            if (allContentTypeOptions.length) {
                defer.resolve(allContentTypeOptions);
            } else {
                $http.get('/contentType/list/').then(function(data) {
                    allContentTypeOptions = [];
                    // 根据运营给出的逻辑，去掉前 50，并且显示上面要增加 id。
                    _.each(data, function(v, i) {
                        v.uiTitle = v.id + ' ' + v.title;
                        allContentTypeOptions.push(v);
                    });
                    defer.resolve(allContentTypeOptions);
                });
            }
            return defer.promise;
        },
        getContentTypeTitle: function(contentType) {
            contentType = Number(contentType);
            return _.find(allContentTypeOptions, function(v) {
                if (Number(v.id) === contentType) {
                    return true;
                }
            });
        },
        getLabelIdOptions: function() {
            var defer = $q.defer();
            if (labelIdOptions.length) {
                defer.resolve(labelIdOptions);
            } else {
                $http.get('/label/list/').then(function(data) {
                    labelIdOptions = data;
                    defer.resolve(labelIdOptions);
                });
            }
            return defer.promise;
        },
        getLabelId: function(labelId) {
            return _.find(labelIdOptions, function(v) {
                if (v.id === labelId) {
                    return true;
                }
            }); 
        },
        getLabelOrderTypeOptions: function() {
            var defer = $q.defer();
            $http.get('/enum/list').then(function(data) {
                var arr = [];
                _.each(data, function(v) {
                    if (v.fieldName === 'labelOrderType') {
                        arr.push(v);
                    }
                });
                labelOrderTypeOptions = arr;
                defer.resolve(arr);
            });
            return defer.promise;
        },
        getLabelOrderType: function(value) {
            return _.find(labelOrderTypeOptions, function(v) {
                if (v.value === value) {
                    return true;
                }
            });
        },
        getContentOrderTypeOptions: function() {
            var defer = $q.defer();
            $http.get('/enum/list').then(function(data) {
                var arr = [];
                _.each(data, function(v) {
                    if (v.fieldName === 'contentOrderType') {
                        arr.push(v);
                    }
                });
                contentOrderTypeOptions = arr;
                defer.resolve(arr);
            });
            return defer.promise;
        },
        getContentOrderType: function(value) {
            return _.find(contentOrderTypeOptions, function(v) {
                if (v.value === value) {
                    return true;
                }
            });
        },
        getContentShowTypeOptions: function() {
            var defer = $q.defer();
            $http.get('/enum/list').then(function(data) {
                var arr = [];
                _.each(data, function(v) {
                    if (v.fieldName === 'contentShowType') {
                        arr.push(v);
                    }
                });
                contentShowTypeOptions = arr;
                defer.resolve(arr);
            });
            return defer.promise;
        },
        getContentShowType: function(value) {
            return _.find(contentShowTypeOptions, function(v) {
                if (v.value === value) {
                    return true;
                }
            });
        },
        getWhiteListTypeOptions: function() {
            var defer = $q.defer();
            $http.get('/enum/list').then(function(data) {
                var arr = [];
                _.each(data, function(v) {
                    if (v.fieldName === 'whiteListType') {
                        arr.push(v);
                    }
                });
                whiteListTypeOptions = arr;
                defer.resolve(arr);
            });
            return defer.promise;
        },
        getWhiteListType: function(name) {
            return _.find(whiteListTypeOptions, function(v) {
                if (v.name === name) {
                    return true;
                }
            });
        }
    };
    // 结束 
}];
});
