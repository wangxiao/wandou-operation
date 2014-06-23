define([
    'angular',
    './controllers/search-filter',
    './controllers/sql-search'
], function(
    angular,
    searchFilterCtrl,
    sqlSearchCtrl
) {
'use strict';

    angular
        .module('wdSearch', [])
        .controller('wdSearchFilterCtrl', searchFilterCtrl)
        .controller('wdSqlSearchCtrl', sqlSearchCtrl);

// 结束
});
