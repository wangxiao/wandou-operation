define([
    'underscore'
], function(
    _
) {
'use strict';
return ['$scope', 'wdRulesSer', '$location',
function($scope, wdRulesSer, $location) {
    $scope.field = $location.search().action; 
    $scope.title = '';
    $scope.dataList = [];
    $scope.firstFlag = true;
    wdRulesSer.getLabelRules().then(function(data) {
        filter($scope.field, data);
        $scope.firstFlag = false;
    });
    function filter(field, data) {
        switch ($scope.field) {
            case 'desc':
                $scope.title = '文件描述规则';
                _.each(data, function(v) {
                    if (v.field === field) {
                        $scope.dataList.push(v);
                    }
                });
            break;
            case 'alertInfo':
                $scope.title = '清理风险规则';
                var arr = [];
                _.each(data, function(v) {
                    if (v.field === field) {
                        $scope.dataList.push(v);
                    }
                    if (v.field === 'simpleAlertInfo') {
                        arr.push(v);
                    }
                });
                _.each($scope.dataList, function(v) {
                    v.uiSimpleAlertInfo = _.find(arr, function(a) {
                        if (v.type === a.type) {
                            return true;
                        }
                    });
                });
            break;
        }
    }
    $scope.addItem = function() {
        if (!$scope.dataList.length || $scope.dataList[0].id) {
            switch ($scope.field) {
                case 'desc':
                    $scope.dataList.unshift({
                        field: $scope.field,
                        type: '',
                        labelContent: '',
                        uiEditStatus: true
                    });
                break;
                case 'alertInfo':
                    $scope.dataList.unshift({
                        field: $scope.field,
                        type: '',
                        labelContent: '',
                        uiEditStatus: true,
                        uiSimpleAlertInfo: {
                            field: 'simpleAlertInfo',
                            labelContent: ''
                        }
                    });
                break;
            }
        }
    };
    $scope.editItem = function(item) {
        item.uiOld = _.clone(item);
        item.uiEditStatus = true;
    };
    $scope.delItem = function(item) {
        if (item.id) {
            wdRulesSer.deleteLabelRules(item).then(function() {
                _.find($scope.dataList, function(v, i) {
                    if (item.id === v.id) {
                        $scope.dataList.splice(i, 1);
                    }
                });
            });
            if (item.uiSimpleAlertInfo) {
                wdRulesSer.deleteLabelRules(item.uiSimpleAlertInfo);
            }
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
        if (item.id) {
            wdRulesSer.updateLabelRules(item);
            if (item.uiSimpleAlertInfo) {
                item.uiSimpleAlertInfo.type = item.type;
                wdRulesSer.updateLabelRules(item.uiSimpleAlertInfo);
            }
        } else {
            wdRulesSer.addLabelRules(item);
            if (item.uiSimpleAlertInfo) {
                item.uiSimpleAlertInfo.type = item.type;
                wdRulesSer.addLabelRules(item.uiSimpleAlertInfo);
            }
        }
    };
}];
});
