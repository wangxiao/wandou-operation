define([
], function(
) {
'use strict';
return ['$scope', 'wdSearchSer', 'wdStorage', 'wdDataSetting', '$location',
function($scope, wdSearchSer, wdStorage, wdDataSetting, $location) {
    $scope.sqlQuery = wdStorage.value('sql-query') || '';
    $scope.showLoading = false;
    $scope.dataList = [];
    $scope.pathTypeOptions = wdDataSetting.pathTypeOptions;

    $scope.$watch('sqlQuery', function() {
        wdStorage.value('sql-query', $scope.sqlQuery);
    });

    $scope.searchSql = function() {
        $scope.showLoading = true;
        wdSearchSer.searchSql($scope.sqlQuery).then(function(data) {
            console.log(data);
            $scope.dataList = data;
            $scope.showLoading = false;
        });
    };

    $scope.showDetail = function(id) {
        $location.path('/monitor-detail').search({id: id});
    };

}];
});
