define([
    'underscore'
], function(
    _
) {
'use strict';
return ['$scope', 'wdRulesSer', '$location',
function($scope, wdRulesSer, $location) {
    $scope.field = $location.search().action; 
    switch ($scope.field) {
        case 'desc':
            $scope.title = '文件描述规则';
        break;
        case 'alertInfo':
            $scope.title = '清理风险规则';
        break;
    }
    
    $scope.dataList = [];
    wdRulesSer.getLabelRules().then(function(data) {
        console.log(data);
        filter($scope.field, data);
    });
    function filter(field, data) {
        _.each(data, function(v) {
            if (v.field === field) {
                $scope.dataList.push(v);
            }
        });
    }
    $scope.addItem = function() {
        if (!$scope.dataList.length || $scope.dataList[0].id) {
            $scope.dataList.unshift({
                field: $scope.field,
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
