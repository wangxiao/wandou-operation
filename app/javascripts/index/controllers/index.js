define([
    'underscore'
], function(
    _
) {
'use strict';
return ['$scope', 'wdIndexSer', '$location', 'wdDataSetting',
function($scope, wdIndexSer, $location, wdDataSetting) {

    $scope.topNumOptions = [
        {name: '全部', value: 0},
        {name: 'TOP2000', value: 2000},
        {name: 'TOP1000', value: 1000},
        {name: 'TOP500', value: 500},
        {name: 'TOP200', value: 200},
        {name: 'TOP100', value: 100},
        {name: 'TOP50', value: 50}
    ];

    // 选择数据库总览的数量，默认全部是 0 。
    $scope.topNum = $scope.topNumOptions[4];
    $scope.coverageList = [];
    $scope.counterList = {};
    $scope.showLoading = true;

    function formatTime(time) {
        var date = time ? new Date(time) : new Date();
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }

    $scope.$watch('topNum', function(newValue, oldValue) {
        wdIndexSer.getCoverageList(newValue.value).then(function(data) {
            $scope.showLoading = false;
            $scope.coverageList = data;
            if (data[0]) {
                $scope.updateTime = formatTime(data[0].updateTime);
            }
        });
    });
    
    wdIndexSer.getCounterListNum().then(function(data) {
        _.each(data, function(v){
            $scope.counterList[v.name] = v.value;
        });
    });

    $scope.updateCoverage = function() {
        wdIndexSer.updateCoverage($scope.topNum.value).then(function(data) {
            $scope.coverageList = data;
            if (data[0]) {
                $scope.updateTime = formatTime(data[0].updateTime);
            }
        });
    };

    $scope.goToMonitor = function() {
        $location.path('/monitor-all');
    };
}];
});
