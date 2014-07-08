define([
    'underscore'
], function(
    _
) {
'use strict';
return ['$scope', 'wdRulesSer', 'wdDataSetting',
function($scope, wdRulesSer, wdDataSetting) {
    $scope.alertInfoOptions = [
        {name: 'a', value: 'a'},
        {name: 'b', value: 'b'},
        {name: 'c', value: 'c'},
        {name: 'd', value: 'd'},
        {name: 'e', value: 'e'}
    ];
    function getAlertInfo(alertInfo) {
        return _.find($scope.alertInfoOptions, function(v) {
            if (v.value === alertInfo) {
                return true;
            }
        });
    }
    $scope.dataList = [];
    $scope.adviceLevelOptions = wdDataSetting.adviceLevelOptions;
    $scope.docDescOptions = [];
    wdRulesSer.getLabelRules().then(function(data) {
        _.each(data, function(v) {
            $scope.docDescOptions.push(v.type);
        });
        $scope.docDescOptions = _.uniq($scope.docDescOptions);
    });

    wdRulesSer.getDocRules().then(function(data) {
        console.log($scope.dataList);
        formatData();
    });

    function formatData() {
        wdDataSetting.getContentTypeOptions().then(function(data) {
            $scope.contentTypeOptions = data;
            _.each($scope.dataList, function(v, i) {
                $scope.dataList[i].uiContentTypeOption = wdDataSetting.getContentTypeTitle(v.ourContentType);
                $scope.dataList[i].uiContentTypeTitle = $scope.dataList[i].uiContentTypeOption.uiTitle;
                $scope.dataList[i].uiAdviceLevel = wdDataSetting.getAdviceLevel(v.ourAdviceLevel);
                $scope.dataList[i].uiAdviceLevelTitle = wdDataSetting.getAdviceLevel(v.ourAdviceLevel).name;
                $scope.dataList[i].uiAlertInfo = getAlertInfo(v.ourAlertInfo);
            });
        });
    }

    $scope.addItem = function() {
        if (!$scope.dataList.length || $scope.dataList[0].id) {
            $scope.dataList.unshift({
                // id: 11,
                // ourAdviceLevel: 1,
                // ourAlertInfo: "b",
                // ourContentType: 63,
                ourDesc: '',
                ourItemName: '',
                ourSimpleAlertInfo: '',
                // srcAlertInfo: null,
                srcDesc: '',
                srcItemName: '',
                srcNotice: '',
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
            _.find($scope.dataList, function(v, i) {
                if (item.id === v.id) {
                    $scope.dataList.splice(i, 1);
                }
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
        item.ourAlertInfo = item.uiAlertInfo.value;
    };

}];
});
