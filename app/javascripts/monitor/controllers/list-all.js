define([
    'underscore'
], function(
    _
) {
'use strict';
return ['$scope', 'wdMonitorSer', '$timeout', '$location',
function indexCtrl($scope, wdMonitorSer, $timeout, $location) {
    $scope.dataList = [];
    $scope.counterList = {};
    $scope.pathTypeOptions = ['全部', '普通缓存路径', '系统缓存路径', '广告路径', '正则缓存路径', '应用主目录'];
    $scope.pathType = $scope.pathTypeOptions[0];
    $scope.adviceLevelOptions = ['建议清理', '谨慎清理'];
    $scope.sortOptions = ['按照下载量排序', '按照 id 排序', '按照项目名排序', '按照条目类型排序', '按照来源排序'];
    $scope.sort = $scope.sortOptions[0];
    $scope.sourceOptions = ['全部'];
    $scope.source = $scope.sourceOptions[0];
    $scope.isCheckedAll = false;
    $scope.batchEditStatus = false;
    $scope.batchEditBtnDisabled = true;

    // 是否显示 loading
    $scope.showLoading = true;

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

    wdMonitorSer.getCounterList().then(function(data) {
        _.each(data, function(v){
            $scope.counterList[v.name] = v.value;
        });
    });

    wdMonitorSer.getCompeteAllList().then(function(data) {
        $scope.dataList = data;
        getSourceOptions(data);
        $timeout(function() {
            $scope.showLoading = false;
        }, 1000);
    });

    wdMonitorSer.getContentTypeList().then(function(data) {
        // console.log(data);
    });

    $scope.editItem = function(item) {
        // 备份当前数据
        item.uiOldData = _.clone(item);
        item.uiEditStatus = true;
    };
    $scope.cancelEditItem = function(item) {
        item.uiEditStatus = false;
        // 此处修改的可能不对 item 没有关联到 dataList 上面
        item = _.clone(item.uiOldData);
    };
    $scope.finishEditItem = function(item) {
        item.uiEditStatus = false;
        delete item.uiOldData;
    };
    $scope.showDetail = function(id) {
        $location.path('/monitor-detail').search({id: id});
    };
    $scope.batchEdit = function() {
        $scope.batchEditStatus = true;
    };
    $scope.cancelBatchEdit = function() {
        $scope.batchEditStatus = false;
    };
    $scope.showDetailHistory = function(id) {
        _.each($scope.dataList, function(v) {
            if (v.id === id) {
                $scope.modalTitle = '竞品监控历史' + '<span class="history-id">id: ' + id + '</span>';
                $scope.modalContent = v.changeHistory;
            }
        });
    };
    $scope.checkedItem = function(item) {
        $scope.isCheckedAll = false;
        if (!item.uiChecked) {
            item.uiChecked = true;
            $scope.batchEditBtnDisabled = false;
        } else {
            item.uiChecked = false;
            $scope.batchEditBtnDisabled = true;
            _.each($scope.dataList, function(v) {
                if (v.uiChecked) {
                    $scope.batchEditBtnDisabled = false;
                }
            });
        }
    };
    $scope.toggleCheckAll = function() {
        if ($scope.isCheckedAll) {
            _.each($scope.dataList, function(v) {
                v.uiChecked = false;
            });
            $scope.isCheckedAll = false;
            $scope.batchEditBtnDisabled = true;
        } else {
            _.each($scope.dataList, function(v) {
                v.uiChecked = true;
            });
            $scope.isCheckedAll = true;
            $scope.batchEditBtnDisabled = false;
        }
    };
}];
});
