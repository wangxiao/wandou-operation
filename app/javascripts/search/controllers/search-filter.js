define([
    'underscore'
], function(
    _
) {
'use strict';
return ['$scope', 'wdDataSetting', 'wdSearchSer', '$location',
function($scope, wdDataSetting, wdSearchSer, $location) {
    $scope.dataList = [];
    $scope.pathTypeOptions = wdDataSetting.pathTypeOptions;
    $scope.adviceLevelOptions = wdDataSetting.adviceLevelOptions;
    $scope.filterMap = {};
    $scope.filterMap.ui = {};

    // 当前数据显示的位置，用来分页获取数据，默认从头开始。
    $scope.offset = 0;
    $scope.pageListLength = wdDataSetting.pageListLength();

    // 是否第一次进入
    $scope.firstFlag = true;

    // 原始数据，用来恢复
    var origin = _.clone($scope.filterMap);
    wdDataSetting.getAllContentTypeOptions().then(function(data) {
        $scope.contentTypeOptions = data;
    });

    $scope.getPathType = function(pathType) {
        return wdDataSetting.getPathType(pathType).title;
    };
    
    function filter() {
        if ($scope.filterMap && $scope.filterMap.ui) {
            if ($scope.filterMap.ui.contentTypeOption) {
                $scope.filterMap.contentType = $scope.filterMap.ui.contentTypeOption.id;
            }
            if ($scope.filterMap.ui.pathTypeOption) {
                $scope.filterMap.pathType = $scope.filterMap.ui.pathTypeOption.value;
            }
            if ($scope.filterMap.ui.adviceLevelOption) {
                $scope.filterMap.adviceLevel = $scope.filterMap.ui.adviceLevelOption.value;
            }
        }
    }

    $scope.search = function() {
        filter();
        var filterMap = _.clone($scope.filterMap);
        // 服务端不能接受此字段
        delete filterMap.ui;
        wdSearchSer.searchBy({
            offset: $scope.offset,
            length: $scope.pageListLength,
            filter: filterMap
        }).then(function(data) {
            console.log(data);
            $scope.firstFlag = false;
            $scope.dataList = data;
            format();
        });
    };
    function format() {
        _.each($scope.dataList, function(v) {
            var t = wdDataSetting.getContentTypeTitle(v.contentType);
            if (t && t.uiTitle) {
                v.uiContentType = t.uiTitle;
            }
        });
    }
    $scope.pageUp = function() {
        $scope.offset = Math.max($scope.offset - $scope.pageListLength, 0);
    };
    $scope.pageDown = function() {
        $scope.offset = $scope.offset + $scope.pageListLength;
    };

    // 翻页逻辑
    $scope.$watch('offset', function(value) {
        if (!$scope.firstFlag) {
            $scope.search();
        }
    });

    $scope.showDetail = function(id) {
        $location.path('/monitor-detail').search({id: id, action: 'online'});
    };

    // 根据单页显示数量变化请求数据
    $scope.$watch('pageListLength', _.debounce(function(value) {
        $scope.$apply(function() {
            if (!$scope.firstFlag) {
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
