define([
    'underscore'
], function(
    _
) {
'use strict';
return ['$scope', 'wdMonitorSer', '$timeout',
function indexCtrl($scope, wdMonitorSer, $timeout) {
    $scope.dataList = [];
    $scope.counterList = {};
    $scope.pathTypeOptions = ['全部', '普通缓存路径', '系统缓存路径', '广告路径', '正则缓存路径', '应用主目录'];
    $scope.pathType = $scope.pathTypeOptions[0];
    $scope.adviceLevelOptions = ['建议清理', '谨慎清理'];
    $scope.sortOptions = ['按照下载量排序', '按照 id 排序', '按照项目名排序', '按照条目类型排序', '按照来源排序'];
    $scope.sort = $scope.sortOptions[0];
    $scope.sourceOptions = ['全部'];
    $scope.source = $scope.sourceOptions[0];

    function getSourceOptions(data) {
        var arr = [];
        _.each(data, function(v) {
            if (!v.source) {
                arr.push('无来源');
            } else {
                arr.push(v.source);
            }
        });
        arr = _.uniq(arr);
        $scope.sourceOptions = $scope.sourceOptions.concat(arr);
    }

    wdMonitorSer.getCompeteAllList().then(function(data) {
        console.log(data);
        $scope.dataList = data;
        getSourceOptions(data);
    });

    wdMonitorSer.getCounterList().then(function(data) {
        _.each(data, function(v){
            $scope.counterList[v.name] = v.value;
        });
    });


    // $scope.showLoading = true;    

    // $scope.modalTitle = 'tttt';
    // $scope.modalContent = 'wafjskajls';
}];
});
