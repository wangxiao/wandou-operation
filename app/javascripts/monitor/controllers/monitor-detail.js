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
    $scope.getPathType = function(pathType) {
        var t = wdDataSetting.getPathType(pathType);
        if (t) {
            return t.title;
        }
    };
    wdMonitorSer.getCompeteDetail($location.search().id).then(function(data) {
        console.log(data);
        $scope.detail = data;
        formatData();
    });
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
