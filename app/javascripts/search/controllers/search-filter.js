define([
    'underscore'
], function(
    _
) {
'use strict';
return ['$scope', 'wdDataSetting', 'wdSearchSer',
function($scope, wdDataSetting, wdSearchSer) {
    $scope.dataList = [];
    $scope.pathTypeOptions = wdDataSetting.pathTypeOptions;
    $scope.adviceLevelOptions = wdDataSetting.adviceLevelOptions;
    $scope.filterMap = {
        pathTypeOption: $scope.pathTypeOptions[1],
        adviceLevelOption: $scope.adviceLevelOptions[0]
    };
    // 原始数据，用来恢复
    var origin = _.clone($scope.filterMap);
    wdDataSetting.getContentTypeOptions().then(function(data) {
        $scope.contentTypeOptions = data;
        $scope.filterMap.contentTypeOption = $scope.contentTypeOptions[0];
    });

    $scope.getPathType = function(pathType) {
        return wdDataSetting.getPathType(pathType).title;
    };
    
    $scope.search = function() {
        wdSearchSer.searchBy($scope.filterMap).then(function(data) {
            $scope.dataList = data;
        });
    };
    $scope.reset = function() {
        $scope.filterMap = _.clone(origin);
    };
}];
});
