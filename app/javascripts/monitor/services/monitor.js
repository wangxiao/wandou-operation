define([
], function(
) {
'use strict';
return ['$http',
function($http) {
    return {
        getCompeteAllList: function(opts) {
            // return $http.post('/review/list', {}, {
            //     params: {
            //         type: 'needReview',
            //         offset: 0,
            //         length: 10,
            //         filter: {
            //             action: action || '',
            //             top: 10
            //         }
            //     }
            // });
            return $http.get('/review/list', {
                params: {
                    type: 'needReview',
                    offset: opts.offset || 0,
                    length: opts.length || 10,
                    action: opts.action || ''
                }
            });
        },
        getCounterList: function() {
            return $http.get('/counter/list');
        },
        getCompeteDetail: function(id) {
            return $http.get('/review/list/' + id);
        },
        upDateCompeteData: function(data) {
            return $http.post('/mining/action', {}, {
                params: {
                    type: 1, //1：修改 2：上线 3：忽略 4：下线
                    data: data,
                    id: data.id
                }
            });
        },
        publicCompeteData: function(id) {
            return $http.post('/mining/action', {}, {
                params: {
                    type: 2, //1：修改 2：上线 3：忽略 4：下线
                    id: id
                }
            });
        },
        ignoreCompeteDate: function(id) {
            return $http.post('/mining/action', {}, {
                params: {
                    type: 3, //1：修改 2：上线 3：忽略 4：下线
                    id: id
                }
            });
        },
        offlineCompeteDate: function(id) {
            return $http.post('/mining/action', {}, {
                params: {
                    type: 4, //1：修改 2：上线 3：忽略 4：下线
                    id: id
                }
            });
        }
    };

    // 结束 
}];
});
