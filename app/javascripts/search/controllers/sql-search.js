define([
    'underscore'
], function(
    _
) {
'use strict';
return ['$scope', 'wdSearchSer', 'wdStorage', 'wdDataSetting', '$location', '$window',
function($scope, wdSearchSer, wdStorage, wdDataSetting, $location, $window) {
    $scope.sqlQuery = wdStorage.value('sql-query') || '';
    $scope.showLoading = false;
    $scope.dataList = [];
    $scope.pathTypeOptions = wdDataSetting.pathTypeOptions;

    $scope.$watch('sqlQuery', function() {
        $scope.sqlQuery = $scope.sqlQuery.trim();
        wdStorage.value('sql-query', $scope.sqlQuery);
    });

    $scope.searchSql = function() {
        if ($scope.sqlQuery) {
            if (!$scope.sqlQuery.match(/select\s+\*/g)) {
                $window.alert('暂时只能搜索 select * ');
            } else if (!$scope.sqlQuery.match(/limit/g)) {
                $window.alert('没做分页功能，所以一定要加入 limit 限制长度');
            } else {
                $scope.showLoading = true;
                wdSearchSer.searchSql($scope.sqlQuery).then(function(data) {
                    console.log(data);
                    $scope.dataList = data;
                    $scope.showLoading = false;
                });
            }
        }
    };

    $scope.getPathType = function(pathType) {
        return wdDataSetting.getPathType(pathType).title;
    };
    
    $scope.showDetail = function(id) {
        $location.path('/monitor-detail').search({id: id, action: 'online'});
    };

}];
});
