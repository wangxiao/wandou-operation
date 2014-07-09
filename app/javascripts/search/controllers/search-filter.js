define([
    'underscore'
], function(
    _
) {
'use strict';
return ['$scope', 'wdDataSetting', 'wdSearchSer',
function($scope, wdDataSetting, wdSearchSer) {
    $scope.dataList = [];
    $scope.pathTypeOptions = wdDataSetting.pathTypeOptions;
    $scope.adviceLevelOptions = wdDataSetting.adviceLevelOptions;
    $scope.filterMap = {};
    $scope.filterMap.ui = {};

    // 当前数据显示的位置，用来分页获取数据，默认从头开始。
    $scope.offset = 0;
    $scope.pageListLength = wdDataSetting.pageListLength();

    // 是否第一次进入
    var firstFlag = true;

    // 原始数据，用来恢复
    var origin = _.clone($scope.filterMap);
    wdDataSetting.getAllContentTypeOptions().then(function(data) {
        $scope.contentTypeOptions = data;
    });

    $scope.getPathType = function(pathType) {
        return wdDataSetting.getPathType(pathType).title;
    };
    
    function filter() {
        console.log($scope.filterMap.ui.pathTypeOption);
        if ($scope.filterMap.ui.contentTypeOption) {
            $scope.filterMap.contentType = $scope.filterMap.ui.contentTypeOption.id;
        }
        if ($scope.filterMap.ui.pathTypeOption) {
            $scope.filterMap.pathType = $scope.filterMap.ui.pathTypeOption.value;
        }
        if ($scope.filterMap.ui.adviceLevelOption) {
            $scope.filterMap.adviceLevel = $scope.filterMap.ui.adviceLevelOption.value;
        }
        delete $scope.filterMap.ui;   
    }

    $scope.search = function() {
        filter();
        wdSearchSer.searchBy({
            offset: $scope.offset,
            length: $scope.pageListLength,
            filter: $scope.filterMap
        }).then(function(data) {
            firstFlag = false;
            $scope.dataList = data;
        });
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
            $scope.search();
        }
    });

    // 根据单页显示数量变化请求数据
    $scope.$watch('pageListLength', _.debounce(function(value) {
        $scope.$apply(function() {
            if (!firstFlag) {
                var reg = /[^\d]/g;
                if (value && !reg.test(value)) {
                    if (value < 1) {
                        $scope.pageListLength = 1;
                    }
                    if (value > 100) {
                        $scope.pageListLength = 100;
                    }
                    wdDataSetting.pageListLength($scope.pageListLength);
                    $scope.search();
                }
            }
        });
    }, 300));
}];
});
