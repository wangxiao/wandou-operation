define([
    'underscore'
], function(
    _
) {
'use strict';
return ['$scope', 'wdRulesSer',
function($scope, wdRulesSer) {
    $scope.dataList = [];
    wdRulesSer.getLabelRules().then(function(data) {
        $scope.dataList = data;
        console.log(data);
    });
    $scope.addItem = function() {
        if ($scope.dataList[0].id) {
            $scope.dataList.unshift({
                field: '',
                type: '',
                labelContent: '',
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
