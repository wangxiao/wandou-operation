define([
    'underscore'
], function(
    _
) {
'use strict';
return ['$scope', 'wdMonitorSer', '$timeout', '$location',
function indexCtrl($scope, wdMonitorSer, $timeout, $location) {
    $scope.showLoading = true;
    $scope.detail = {};
    $scope.pathTypeOptions = ['普通缓存路径', '系统缓存路径', '广告路径', '正则缓存路径', '应用主目录'];

    wdMonitorSer.getCompeteDetail($location.search().id).then(function(data) {
        console.log(data);
        $scope.detail = data;
        $timeout(function() {
            $scope.showLoading = false;
        }, 1000);
    });
}];
});
