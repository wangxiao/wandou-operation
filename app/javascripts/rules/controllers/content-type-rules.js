define([
    'underscore'
], function(
    _
) {
'use strict';
return ['$scope', 'wdRulesSer', '$location', 'wdDataSetting',
function($scope, wdRulesSer, $location, wdDataSetting) {    
    $scope.dataList = [];
    $scope.adviceLevelOptions = wdDataSetting.adviceLevelOptions;
    wdDataSetting.getAllContentTypeOptions().then(function(data) {
        console.log(data);
        $scope.dataList = data;
        formatData();
    });

    function formatData() {
        _.each($scope.dataList, function(v) {
            v.uiAdviceLevel = wdDataSetting.getAdviceLevel(v.adviceLevel);
        });
    }

    $scope.addItem = function() {
        if (!$scope.dataList.length || $scope.dataList[0].id) {
            $scope.dataList.unshift({
                adviceLevel: 1,
                alertInfo: '',
                desc: '',
                id: null,
                title: ''
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
        item.adviceLevel = item.uiAdviceLevel.value;
    };
}];
});
