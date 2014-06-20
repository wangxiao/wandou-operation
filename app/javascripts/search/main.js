define([
    'angular',
    './controllers/search-filter'
], function(
    angular,
    searchFilterCtrl
) {
'use strict';

    angular
        .module('wdSearch', [])
        .controller('wdSearchFilterCtrl', searchFilterCtrl);

// 结束
});
