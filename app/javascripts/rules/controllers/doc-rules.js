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

    // 当前数据显示的位置，用来分页获取数据，默认从头开始。
    $scope.offset = 0;
    $scope.pageListLength = wdDataSetting.pageListLength();

    // 是否第一次进入
    var firstFlag = true;

    wdRulesSer.getLabelRules().then(function(data) {
        _.each(data, function(v) {
            $scope.docDescOptions.push(v.type);
        });
        $scope.docDescOptions = _.uniq($scope.docDescOptions);
    });

    function showAllData() {
        wdRulesSer.getDocRules({
            offset: $scope.offset,
            length: $scope.pageListLength
        }).then(function(data) {
            $scope.dataList = data;
            console.log(data);
            formatData();
            firstFlag = false;
        });
    }

    function formatData() {
        wdDataSetting.getContentTypeOptions().then(function(data) {
            $scope.contentTypeOptions = data;
            _.each($scope.dataList, function(v, i) {
                $scope.dataList[i].uiContentTypeOption = wdDataSetting.getContentTypeTitle(v.ourContentType);
                $scope.dataList[i].uiContentTypeTitle = $scope.dataList[i].uiContentTypeOption.uiTitle;
                $scope.dataList[i].uiAdviceLevel = wdDataSetting.getAdviceLevel(v.ourAdviceLevel);
                $scope.dataList[i].uiAdviceLevelTitle = wdDataSetting.getAdviceLevel(v.ourAdviceLevel).name;
                $scope.dataList[i].uiAlertInfo = getAlertInfo(v.ourAlertInfo);
                $scope.dataList[i].uiSimpleAlertInfo = getAlertInfo(v.ourAlertInfo);
            });
        });
    }

    showAllData();
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
            wdRulesSer.deleteDocRules(item).then(function() {
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
        item.ourAlertInfo = item.uiAlertInfo.value;
        item.ourSimpleAlertInfo = item.uiSimpleAlertInfo.value;
        item.ourAdviceLevel = item.uiAdviceLevel.value;
        if (item.id) {
            wdRulesSer.updateDocRules(item);
        } else {
            console.log(item);
            wdRulesSer.addDocRules(item);
        }
    };

    $scope.pageUp = function() {
        $scope.offset = Math.max($scope.offset - $scope.pageListLength, 0);
    };

    $scope.pageDown = function() {
        $scope.offset = $scope.offset + $scope.pageListLength;
    };

    // 翻页逻辑
    $scope.$watch('offset', function(value) {
        if (!firstFlag) {
            showAllData();
        }
    });

    // // 根据单页显示数量变化请求数据
    // $scope.$watch('pageListLength', _.debounce(function(value) {
    //     $scope.$apply(function() {
    //         if (!firstFlag) {
    //             var reg = /[^\d]/g;
    //             if (value && !reg.test(value)) {
    //                 if (value < 1) {
    //                     $scope.pageListLength = 1;
    //                 }
    //                 if (value > 100) {
    //                     $scope.pageListLength = 100;
    //                 }
    //                 wdDataSetting.pageListLength($scope.pageListLength);
    //                 $scope.search();
    //             }
    //         }
    //     });
    // }, 300));
}];
});
