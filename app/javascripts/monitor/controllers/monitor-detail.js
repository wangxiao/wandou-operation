define([
    'underscore'
], function(
    _
) {
'use strict';
return ['$scope', 'wdMonitorSer', '$timeout', '$location', 'wdDataSetting', '$window',
function indexCtrl($scope, wdMonitorSer, $timeout, $location, wdDataSetting, $window) {
    $scope.detail = {};
    $scope.editStatus = false;
    $scope.pathTypeOptions = wdDataSetting.pathTypeOptions;
    $scope.adviceLevelOptions = wdDataSetting.adviceLevelOptions;
    $scope.deletedOptions = wdDataSetting.deletedOptions;
    $scope.itemId = $location.search().id;
    var action = $location.search().action;
    $scope.getPathType = function(pathType) {
        var t = wdDataSetting.getPathType(pathType);
        if (t) {
            return t.name;
        }
    };
    switch (action) {
        case 'review':
            wdMonitorSer.getCompeteDetail($scope.itemId).then(function(data) {
                console.log(data);
                $scope.detail = data;
                formatData();
                wdMonitorSer.getCleanLog(data.onlineId).then(function(data) {
                    $scope.cleanLog = data;
                });
            });
        break;
        case 'online':
            wdMonitorSer.getListByOnlineId($scope.itemId).then(function(data) {
                console.log(data);
                $scope.detail = data;
                formatData();
                wdMonitorSer.getCleanLog(data.id).then(function(data) {
                    $scope.cleanLog = data;
                });
            });
        break;
    }
    function formatData() {
        getContentTypeOptions();
        $scope.detail.uiDeleted = _.find($scope.deletedOptions, function(v) {
            if (v.value === $scope.detail.deleted) {
                return true;
            }
        });
        $scope.detail.uiAdviceLevel = wdDataSetting.getAdviceLevel($scope.detail.adviceLevel);
        $scope.detail.uiSrcAdviceLevelTitle = wdDataSetting.getAdviceLevel($scope.detail.srcAdviceLevel).name;
    }
    function getContentTypeOptions() {
        return wdDataSetting.getContentTypeOptions().then(function(data) {
            $scope.contentTypeOptions = data;
            var t = wdDataSetting.getContentTypeTitle($scope.detail.contentType);
            if (t) {
                $scope.detail.uiContentTypeTitle = t.uiTitle;
                // 给 select 使用
                $scope.detail.uiContentTypeOption = t;
            }
            t = wdDataSetting.getContentTypeTitle($scope.detail.srcContentType);
            if (t) {
                $scope.detail.uiSrcContentTypeTitle = t.uiTitle;
                // 给 select 使用
                $scope.detail.uiSrcContentTypeOption = t;
            }
        });
    }
    $scope.edit = function(item) {
        $scope.editStatus = true;
        item.uiOld = _.clone(item);
    };
    $scope.cancel = function(item) {
        $scope.editStatus = false;
        $scope.detail = item.uiOld;
    };
    $scope.finish = function(item) {
        $scope.editStatus = false;
        item.adviceLevel = item.uiAdviceLevel.value;
        item.uiContentTypeTitle = item.uiContentTypeOption.uiTitle;
        delete item.uiOld;
        switch (action) {
            case 'review':
                wdMonitorSer.upDateCompeteData(item).then(function(data) {
                    if (data.reason) {
                        $window.alert('id:' + item.id + '，' + data.reason);
                    }
                    console.log(data);
                    if (!data.reason && !data.success) {
                        $window.alert('id' + item.id + '，保存失败');
                    }
                    console.log(data);
                });
            break;
            case 'online':
                wdMonitorSer.upDateOnLineData(item).then(function(data) {
                    if (data.reason) {
                        $window.alert('id:' + item.id + '，' + data.reason);
                    }
                    console.log(data);
                    if (!data.reason && !data.success) {
                        $window.alert('id' + item.id + '，保存失败');
                    }
                    console.log(data);
                });
            break;
        }
    };
    // 自动生成文案
    // $scope.autoLabelItem = function(item) {
    //     var backup = _.clone(item);
    //     delete item.uiOldData;
    //     wdMonitorSer.autoLabel(item).then(function(data) {
    //         console.log(data);
    //         item.uiEditStatus = true;
    //         item.uiOldData = backup.uiOldData;
    //         $scope.detail = data;
    //         formatData();
    //     });
    // };
    $scope.changeAdviceLevel = function(item) {
        item.uiAdviceLevel = _.find($scope.adviceLevelOptions, function(v) {
            if (item.uiContentTypeOption.adviceLevel === v.value) {
                return true;
            }
        });
    };
}];
});
