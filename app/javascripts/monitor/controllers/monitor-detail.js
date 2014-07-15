define([
    'underscore'
], function(
    _
) {
'use strict';
return ['$scope', 'wdMonitorSer', '$timeout', '$location', 'wdDataSetting',
function indexCtrl($scope, wdMonitorSer, $timeout, $location, wdDataSetting) {
    $scope.detail = {};
    $scope.editStatus = false;
    $scope.pathTypeOptions = wdDataSetting.pathTypeOptions;
    $scope.adviceLevelOptions = wdDataSetting.adviceLevelOptions;
    $scope.itemId = $location.search().id;
    var action = $location.search().action;
    $scope.getPathType = function(pathType) {
        var t = wdDataSetting.getPathType(pathType);
        if (t) {
            return t.title;
        }
    };
    switch (action) {
        case 'review':
            wdMonitorSer.getCompeteDetail($scope.itemId).then(function(data) {
                $scope.detail = data;
                formatData();
                wdMonitorSer.getCleanLog(data.onlineId).then(function(data) {
                    $scope.cleanLog = data;
                });
            });
        break;
        case 'online':
            wdMonitorSer.getListByOnlineId($scope.itemId).then(function(data) {
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
        $scope.detail.uiAdviceLevel = wdDataSetting.getAdviceLevel($scope.detail.adviceLevel);
        $scope.detail.uiSrcAdviceLevelTitle = wdDataSetting.getAdviceLevel($scope.detail.srcAdviceLevel).name;
        $scope.detail.uiAdviceLevelTitle = wdDataSetting.getAdviceLevel($scope.detail.adviceLevel).name;
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
        item.uiContentTypeTitle = item.uiContentTypeOption.uiTitle;
        wdMonitorSer.upDateCompeteData(item).then(function(data) {
            console.log(data);
        });
    };
}];
});
