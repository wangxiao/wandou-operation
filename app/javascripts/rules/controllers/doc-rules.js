define([
    'underscore'
], function(
    _
) {
'use strict';
return ['$scope', 'wdRulesSer', 'wdDataSetting',
function($scope, wdRulesSer, wdDataSetting) {
    $scope.dataList = [];
    $scope.adviceLevelOptions = wdDataSetting.adviceLevelOptions;
    wdRulesSer.getDocRules().then(function(data) {
        $scope.dataList = data.splice(0, 10);
        console.log($scope.dataList);
        formatData();
    });

    function formatData() {
        wdDataSetting.getContentTypeOptions().then(function(data) {
            $scope.contentTypeOptions = data;
            _.each($scope.dataList, function(v, i) {
                $scope.dataList[i].uiContentTypeOption = wdDataSetting.getContentTypeTitle(v.ourContentType);
                $scope.dataList[i].uiContentTypeTitle = $scope.dataList[i].uiContentTypeOption.title;
                $scope.dataList[i].uiAdviceLevel = wdDataSetting.adviceLevelOptions[v.ourAdviceLevel];
            });
        });
    }

    $scope.addItem = function() {
        if ($scope.dataList[0].id) {
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
    };

}];
});
