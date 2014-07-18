define([
    'underscore'
], function(
    _
) {
'use strict';
return ['$scope', 'wdRulesSer', '$location', 'wdDataSetting', '$window',
function($scope, wdRulesSer, $location, wdDataSetting, $window) {    
    $scope.dataList = [];
    $scope.firstFlag = true;

    wdRulesSer.getClientLabelRules().then(function(data) {
        $scope.dataList = data;
    }).then(function() {
        return wdDataSetting.getLabelOrderTypeOptions().then(function(data) {
            $scope.labelOrderTypeOptions = data;
        });
    }).then(function() {
        formatData();
        $scope.firstFlag = true;
    });

    function formatData() {
        _.each($scope.dataList, function(v) {
            v.uiOrderType = wdDataSetting.getLabelOrderType(v.orderType);
        });
    }

    $scope.addItem = function() {
        if (!$scope.dataList.length || $scope.dataList[0].id) {
            $scope.dataList.unshift({
                id: null,
                name: '',
                orderType: 1,
                rank: 0,
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
            wdRulesSer.deleteClientLabelRules(item).then(function(data) {
                if (data.reason) {
                    $window.alert('id:' + item.id + '，' + data.reason);
                }
                if (!data.reason && !data.success) {
                    $window.alert('id' + item.id + '，删除失败');
                }
                if (data.success) {
                    _.find($scope.dataList, function(v, i) {
                        if (item.id === v.id) {
                            $scope.dataList.splice(i, 1);
                        }
                    });
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
        var clone = _.clone(item.uiOld);
        delete item.uiOld;
        item.orderType = item.uiOrderType.value;
        if (item.id) {
            wdRulesSer.updateClientLabelRules(item).then(function(data) {
                if (data.reason) {
                    $window.alert('id:' + item.id + '，' + data.reason);
                }
                if (!data.reason && !data.success) {
                    $window.alert('id' + item.id + '，更新失败');
                }  
                if (!data.success) {
                    item.uiEditStatus = true;
                    item.uiOld = _.clone(clone);
                }
                if (data.success) {
                    item.id = data.id;
                } 
            });
        } else {
            wdRulesSer.addClientLabelRules(item).then(function(data) {
                if (data.reason) {
                    $window.alert('id:' + item.id + '，' + data.reason);
                }
                if (!data.reason && !data.success) {
                    $window.alert('id' + item.id + '，添加失败');
                }                 
                if (!data.success) {
                    item.uiEditStatus = true;
                    item.uiOld = _.clone(clone);
                }   
                if (data.success) {
                    item.id = data.id;
                }            
            });
        }
    };
}];
});
