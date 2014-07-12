define([
    'underscore'
], function(
    _
) {
'use strict';
return ['$scope', 'wdSettingSer', '$location', 'wdDataSetting',
function($scope, wdSettingSer, $location, wdDataSetting) {    
    $scope.dataList = [];
    $scope.firstFlag = true;
    $scope.forClientOptions = wdDataSetting.forClientOptions;
    wdSettingSer.getWhiteList().then(function(data) {
        $scope.dataList = data;
        console.log(data);
    }).then(function() {
        return wdDataSetting.getWhiteListTypeOptions().then(function(data) {
            $scope.whiteListTypeOptions = data;
        });
    }).then(function() {
        formatData();
        $scope.firstFlag = true;
    });

    function formatData() {
        _.each($scope.dataList, function(v) {
            v.uiforClientOptions = wdDataSetting.getClientOptions(v.forClient);
            v.uiType = wdDataSetting.getWhiteListType(v.type);
        });
    }

    $scope.addItem = function() {
        if (!$scope.dataList.length || $scope.dataList[0].id) {
            $scope.dataList.unshift({
                id: '',
                filePath: '',
                forClient: true,
                type:'',
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
            wdSettingSer.deleteWhiteList(item).then(function() {
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
        item.type = item.uiType.value;
        item.forClient = item.uiforClientOptions.value;
        if (item.id) {
            wdSettingSer.updateWhiteList(item);
        } else {
            wdSettingSer.addWhiteList(item);
        }
    };
}];
});
