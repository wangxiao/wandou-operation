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
    $scope.cleanLog = {};
    $scope.onlineData = {};
    $scope.detail.mappingRuleId = '';
    $scope.action = $location.search().action;
    $scope.getPathType = function(pathType) {
        var t = wdDataSetting.getPathType(pathType);
        if (t) {
            return t.name;
        }
    };

    function showAllData() {
        switch ($scope.action) {
            case 'review':
            case 'public':
                wdMonitorSer.getCompeteDetail($scope.itemId).then(function(data) {
                    console.log(data);
                    $scope.detail = data;
                    wdMonitorSer.getCleanLog(data.onlineId).then(function(data) {
                        $scope.cleanLog = data;
                    });
                    wdMonitorSer.getOnlineDataById(data.onlineId).then(function(data) {
                        console.log(data);
                        $scope.onlineData = data;
                        formatData();
                    });
                });
            break;
            case 'online':
                wdMonitorSer.getListByOnlineId($scope.itemId).then(function(data) {
                    console.log(data);
                    $scope.detail = data;
                    wdMonitorSer.getCleanLog(data.id).then(function(data) {
                        $scope.cleanLog = data;
                    });
                    wdMonitorSer.getOnlineDataById(data.onlineId).then(function(data) {
                        console.log(data);
                        $scope.onlineData = data;
                        formatData();
                    });
                });
            break;
        }
    }

    showAllData();

    function formatData() {
        getContentTypeOptions();
        $scope.detail.uiDeleted = _.find($scope.deletedOptions, function(v) {
            if (v.value === $scope.detail.deleted) {
                return true;
            }
        });
        $scope.detail.uiAdviceLevel = wdDataSetting.getAdviceLevel($scope.detail.adviceLevel);
        $scope.detail.uiSrcAdviceLevelTitle = wdDataSetting.getAdviceLevel($scope.detail.srcAdviceLevel).name;
        $scope.onlineData.uiAdviceLevelOption = wdDataSetting.getAdviceLevel($scope.onlineData.adviceLevel);
        $scope.onlineData.uiDeleted = _.find($scope.deletedOptions, function(v) {
            if (v.value === $scope.onlineData.deleted) {
                return true;
            }
        });
    }
    function getContentTypeOptions() {
        return wdDataSetting.getAllContentTypeOptions().then(function(data) {
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
            $scope.onlineData.uiContentTypeOption = wdDataSetting.getContentTypeTitle($scope.onlineData.contentType);
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
        item.contentType = item.uiContentTypeOption.id;
        var clone = _.clone(item.uiOld);
        delete item.uiOld;
        switch ($scope.action) {
            case 'review':
                wdMonitorSer.upDateCompeteData(item).then(function(data) {
                    if (data.reason) {
                        $window.alert('id:' + item.id + '，' + data.reason);
                    }
                    if (!data.reason && !data.success) {
                        $window.alert('id' + item.id + '，保存失败');
                    }
                    console.log(data);
                    if (data.success) {
                        showAllData();
                    }
                    if (!data.success) {
                        $scope.editStatus = true;
                        item.uiOld = _.clone(clone);
                    }              
                });
            break;
            case 'online':
                wdMonitorSer.upDateOnLineData(item).then(function(data) {
                    if (data.reason) {
                        $window.alert('id:' + item.id + '，' + data.reason);
                    }
                    if (!data.reason && !data.success) {
                        $window.alert('id' + item.id + '，保存失败');
                    }
                    console.log(data);
                    if (data.success) {
                        showAllData();
                    }
                    if (!data.success) {
                        $scope.editStatus = true;
                        item.uiOld = _.clone(clone);
                    }  
                });
            break;
        }
    };
    $scope.public = function(item) {
        if (!$window.confirm('确定要发布上线吗？id:' + item.id)) {
            return;
        }
        wdMonitorSer.publicCompeteData(item).then(function(data) {
            console.log(data);
            if (data.reason) {
                $window.alert('id:' + item.id + '，' + data.reason);
            }
            if (!data.reason && !data.success) {
                $window.alert('id' + item.id + '，发布上线失败');
            }
            if (data.success) {
                getNextDetail(item.id);
            }
        });
    };
    $scope.checkFinish = function(item) {
        if (!$window.confirm('确定审核完成吗？id:' + item.id)) {
            return;
        }
        wdMonitorSer.checkFinishCompeteData(item).then(function(data) {
            if (data.reason) {
                $window.alert('id:' + item.id + '，' + data.reason);
            }
            if (!data.reason && !data.success) {
                $window.alert('id' + item.id + '，审核完成失败');
            }
            if (data.success) {
                getNextDetail(item.id);
            }
            console.log(data);
        });
    };
    // 自动生成文案
    $scope.autoLabelItem = function(item) {
        var backup = _.clone(item);
        delete item.uiOldData;
        if (!item.mappingRuleId) {
            delete item.mappingRuleId;
        } else {
            item.mappingRuleId = Number(item.mappingRuleId);
        }
        wdMonitorSer.autoLabel(item).then(function(data) {
            item.uiEditStatus = true;
            item.uiOldData = backup.uiOldData;
            $scope.detail = data;
            formatData();
        });
    };
    $scope.changeAdviceLevel = function(item) {
        item.uiAdviceLevel = _.find($scope.adviceLevelOptions, function(v) {
            if (item.uiContentTypeOption.adviceLevel === v.value) {
                return true;
            }
        });
    };
    $scope.showDetail = function(id) {
        switch ($scope.action) {
            case 'public':
                $location.path('/monitor-detail').search({id: id, action: 'public'});
            break;
            case 'review':
                $location.path('/monitor-detail').search({id: id, action: 'review'});
            break;
        }
    };
    function getNextDetail(id) {
        var index = 0;
        _.find(wdMonitorSer.idList, function(v, i) {
            if (v === id) {
                wdMonitorSer.idList.splice(i, 1);
                if (i < wdMonitorSer.idList.length) {
                    index = i;
                } else {
                    index = 0;
                }
                return true;
            }
        });
        if (!wdMonitorSer.idList.length) {
            $location.path('/monitor-all').search({});
            return;
        }
        $scope.showDetail(wdMonitorSer.idList[index]);
    }
}];
});
