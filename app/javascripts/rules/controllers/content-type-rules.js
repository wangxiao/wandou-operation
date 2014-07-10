define([
    'underscore'
], function(
    _
) {
'use strict';
return ['$scope', 'wdRulesSer', '$location', 'wdDataSetting',
function($scope, wdRulesSer, $location, wdDataSetting) {    
    $scope.dataList = [];
    $scope.firstFlag = true;
    $scope.adviceLevelOptions = wdDataSetting.adviceLevelOptions;

    wdDataSetting.getAllContentTypeOptions().then(function(data) {
        $scope.dataList = data;
        return wdDataSetting.getLabelIdOptions().then(function(data) {
            $scope.labelIdOptions = data;
        });
    }).then(function() {
        return wdDataSetting.getLabelOrderTypeOptions().then(function(data) {
            $scope.labelOrderTypeOptions = data;
        });
    }).then(function() {
        return wdDataSetting.getContentOrderTypeOptions().then(function(data) {
            $scope.contentOrderTypeOptions = data;
        });
    }).then(function() {
        return wdDataSetting.getContentShowTypeOptions().then(function(data) {
            $scope.contentShowTypeOptions = data;
        });
    }).then(function() {
        formatData();
        $scope.firstFlag = true;
    });

    function formatData() {
        _.each($scope.dataList, function(v) {
            v.uiAdviceLevel = wdDataSetting.getAdviceLevel(v.adviceLevel);
            v.uiLabelId = wdDataSetting.getLabelId(v.labelId);
            v.uiOrderType = wdDataSetting.getContentOrderType(v.orderType);
            v.uiShowType = wdDataSetting.getContentShowType(v.showType);
        });
    }

    $scope.addItem = function() {
        if (!$scope.dataList.length || $scope.dataList[0].id) {
            $scope.dataList.unshift({
                id: null,
                title: '',
                alertInfo: '',
                adviceLevel: 1,
                desc: '',
                labelId: 1,
                orderType: 1,
                rank: 0,
                showType: 0,
                uiEditStatus: true
            });
        }
    };
    $scope.editItem = function(item) {
        item.uiOld = _.clone(item);
        item.uiEditStatus = true;
    };
    $scope.delItem = function(item) {
        if (item.id) {
            wdRulesSer.deleteContentTypeRules(item).then(function() {
                _.find($scope.dataList, function(v, i) {
                    if (item.id === v.id) {
                        $scope.dataList.splice(i, 1);
                    }
                });
            });
        } else {
            $scope.dataList.shift();
        }
    };
    $scope.cancelItem = function(item) {
        if (item.id) {
            _.find($scope.dataList, function(v, i) {
                if (item.id === v.id) {
                    $scope.dataList[i] = item.uiOld;
                }
            });
        } else {
            $scope.dataList.shift();
        }
    };
    $scope.finishItem = function(item) {
        item.uiEditStatus = false;
        delete item.uiOld;
        item.adviceLevel = item.uiAdviceLevel.value;
        item.labelId = item.uiLabelId.id;
        item.orderType = item.uiOrderType.value;
        item.showType = item.uiShowType.value;
        if (item.id) {
            wdRulesSer.updateContentTypeRules(item);
        } else {
            wdRulesSer.addContentTypeRules(item);
        }
    };
}];
});
