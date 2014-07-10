define([
    'angular',
    './controllers/search-filter',
    './controllers/sql-search',
    './services/search',
    './controllers/applist-search'
], function(
    angular,
    searchFilterCtrl,
    sqlSearchCtrl,
    searchSer,
    applistSearchCtrl
) {
'use strict';

    angular
        .module('wdSearch', [])
        .controller('wdSearchFilterCtrl', searchFilterCtrl)
        .controller('wdSqlSearchCtrl', sqlSearchCtrl)
        .factory('wdSearchSer', searchSer)
        .controller('wdApplistSearchCtrl', applistSearchCtrl);

// 结束
});
