define([
    'angular',
    './controllers/search-filter',
    './controllers/sql-search',
    './services/search'
], function(
    angular,
    searchFilterCtrl,
    sqlSearchCtrl,
    searchSer
) {
'use strict';

    angular
        .module('wdSearch', [])
        .controller('wdSearchFilterCtrl', searchFilterCtrl)
        .controller('wdSqlSearchCtrl', sqlSearchCtrl)
        .factory('wdSearchSer', searchSer);

// 结束
});
