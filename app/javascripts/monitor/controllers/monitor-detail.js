define([
    'underscore'
], function(
    _
) {
'use strict';
return ['$scope', 'wdMonitorSer', '$timeout', '$location', 'wdDataSetting',
function indexCtrl($scope, wdMonitorSer, $timeout, $location, wdDataSetting) {
    $scope.detail = {};
    $scope.pathTypeOptions = wdDataSetting.pathTypeOptions;
    $scope.getPathType = function(pathType) {
        return wdDataSetting.getPathType(pathType);
    };
    wdMonitorSer.getCompeteDetail($location.search().id).then(function(data) {
        console.log(data);
        $scope.detail = data;
    });
}];
});
