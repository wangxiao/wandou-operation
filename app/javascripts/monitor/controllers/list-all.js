define([
    'underscore'
], function(
    _
) {
'use strict';
return ['$scope', 'wdMonitorSer', '$timeout', '$location', 'wdDataSetting', 'wdModalSer',
function indexCtrl($scope, wdMonitorSer, $timeout, $location, wdDataSetting, wdModalSer) {
    $scope.dataList = [];
    $scope.counterList = {};
    $scope.pathTypeOptions = wdDataSetting.pathTypeOptions;
    $scope.pathType = $scope.pathTypeOptions[0];
    $scope.adviceLevelOptions = wdDataSetting.adviceLevelOptions;
    $scope.sortOptions = [
        {value: 'installCount', name: '按照下载量排序'},
        {value: 'id', name: '按照 id 排序'},
        {value: 'itemName', name: '按照项目名排序'},
        {value: 'contentType', name: '按照条目类型排序'},
        {value: 'source', name: '按照来源排序'}
    ];
    $scope.sort = $scope.sortOptions[0];
    $scope.sourceOptions = wdDataSetting.sourceOptions;
    $scope.source = $scope.sourceOptions[0];
    $scope.orderOptions = [
        {value:'desc', name: '降序'},
        {value:'asc', name: '升序'}
    ];
    $scope.order = $scope.orderOptions[0];
    $scope.isCheckedAll = false;
    $scope.batchEditStatus = false;
    $scope.batchEditBtnDisabled = true;
    $scope.showModal = false;
    $scope.pageListLength = wdDataSetting.pageListLength();

    // 是否显示 loading
    $scope.showLoading = true;
    $scope.contentTypeOptions = [];

    // 当前数据显示的位置，用来分页获取数据，默认从头开始。
    $scope.offset = 0;

    function getSourceOptions(data) {
        var arr = [];
        _.each(data, function(v) {
            if (!v.source) {
                arr.push('无来源');
            } else {
                arr.push(v.source);
            }
        });
        arr = _.uniq(arr);
        $scope.sourceOptions = _.uniq($scope.sourceOptions.concat(arr));
    }

    function getContentTypeOptions() {
        return wdDataSetting.getContentTypeOptions().then(function(data) {
            $scope.contentTypeOptions = data;
            _.each($scope.dataList, function(v) {
                var t = wdDataSetting.getContentTypeTitle(v.contentType);
                if (t) {
                    v.uiContentTypeTitle = t.title;
                    // 给 select 使用
                    v.uiContentTypeOption = t;
                }
            });
        });
    }

    wdMonitorSer.getCounterList().then(function(data) {
        _.each(data, function(v){
            $scope.counterList[v.name] = v.value;
        });
    });

    function formatData() {
        getSourceOptions($scope.dataList);
        getContentTypeOptions();

    }

    function showAllData() {
        wdMonitorSer.getCompeteAllList({
            action: $location.search().action,
            size: $scope.pageListLength,
            offset: $scope.offset,
            pathType: $scope.pathType.value,
            source: $scope.sourceOptions.indexOf($scope.source) ? $scope.source : null,
            orderBy: $scope.sort.value,
            order: $scope.order.value
        }).then(function(data) {
            $scope.dataList = data;
            $scope.showLoading = false;
            if (data.length) {
                formatData();
            } else {
                $scope.pageUp();
            }
        });
    }

    $scope.getPathType = function(pathType) {
        return wdDataSetting.getPathType(pathType);
    };

    $scope.editItem = function(item) {
        // 备份当前数据
        item.uiOldData = _.clone(item);
        item.uiEditStatus = true;
        item.uiAdviceLevel = $scope.adviceLevelOptions[item.adviceLevel];
    };
    $scope.cancelEditItem = function(item) {
        item.uiEditStatus = false;
        _.each($scope.dataList, function(v, i) {
            if (v.id === item.id) {
                $scope.dataList[i] = item.uiOldData;
            }
        });
    };
    $scope.finishEditItem = function(item, flag) {
        item.uiEditStatus = false;
        item.contentType = item.uiContentTypeOption.id;
        item.uiContentTypeTitle = wdDataSetting.getContentTypeTitle(item.contentType).title;
        item.adviceLevel = $scope.adviceLevelOptions.indexOf(item.uiAdviceLevel);
        delete item.uiOldData;
        if (!flag) {
            wdMonitorSer.upDateCompeteData(item).then(function(data) {
                console.log(data);
            });
        }
    };
    $scope.ignoreItem = function(item) {
        $scope.finishEditItem(item, true);
        wdMonitorSer.ignoreCompeteDate(item).then(function(data) {
            console.log(data);
        });
    };
    $scope.publicItem = function(item) {
        $scope.finishEditItem(item, true);
        wdMonitorSer.publicCompeteData(item).then(function(data) {
            console.log(data);
        });
    };
    $scope.offlineItem = function(item) {
        $scope.finishEditItem(item, true);
        wdMonitorSer.offlineCompeteDate(item).then(function(data) {
            console.log(data);
        });
    };
    // 自动生成文案
    $scope.autoLabelItem = function(item) {
        var item2 = _.clone(item);
        delete item2.uiOldData;
        wdMonitorSer.autoLabel(item2).then(function(data) {
            console.log(data);
        });
    };
    $scope.showDetail = function(id) {
        $location.path('/monitor-detail').search({id: id});
    };
    $scope.batchEdit = function() {
        $scope.batchEditStatus = true;
        _.each($scope.dataList, function(v) {
            if (v.uiChecked) {
                $scope.editItem(v);
            }
        });
    };
    $scope.cancelBatchEdit = function() {
        $scope.batchEditStatus = false;
        _.each($scope.dataList, function(v) {
            if (v.uiChecked) {
                $scope.cancelEditItem(v);
            }
        });
    };
    $scope.finishBatchEdit = function() {
        $scope.batchEditStatus = false;
        _.each($scope.dataList, function(v) {
            if (v.uiChecked) {
                $scope.finishEditItem(v);
            }
        });
    };
    $scope.showDetailHistory = function(id) {
        _.each($scope.dataList, function(v) {
            if (v.id === id) {
                $scope.modalTitle = '竞品监控历史' + '<span class="history-id">id: ' + id + '</span>';
                $scope.modalContent = '';
                _.each(v.changeHistories, function(m) {
                    $scope.modalContent = '<p>' + m.time + '</p><p>' + m.src + '</p><p>' + m.field + '</p>操作：<p>' + m.action + '</p><p>从</p><p>' + m.from + '</p><p>变为</p><p>' + m.to + '</p><br>';
                });
            }
        });
        $scope.showModal = true;
        wdModalSer.show().then(function() {
            $scope.showModal = false;
        });
    };
    $scope.checkedItem = function(item) {
        $scope.isCheckedAll = false;
        if (!item.uiChecked) {
            item.uiChecked = true;
            $scope.batchEditBtnDisabled = false;
        } else {
            item.uiChecked = false;
            $scope.batchEditBtnDisabled = true;
            _.each($scope.dataList, function(v) {
                if (v.uiChecked) {
                    $scope.batchEditBtnDisabled = false;
                }
            });
        }
    };
    $scope.toggleCheckAll = function() {
        if ($scope.isCheckedAll) {
            _.each($scope.dataList, function(v) {
                v.uiChecked = false;
            });
            $scope.isCheckedAll = false;
            $scope.batchEditBtnDisabled = true;
        } else {
            _.each($scope.dataList, function(v) {
                v.uiChecked = true;
            });
            $scope.isCheckedAll = true;
            $scope.batchEditBtnDisabled = false;
        }
    };
    $scope.pageUp = function() {
        $scope.offset = Math.max($scope.offset - $scope.pageListLength, 0);
    };
    $scope.pageDown = function() {
        $scope.offset = $scope.offset + $scope.pageListLength;
    };

    // 根据单页显示数量变化请求数据
    $scope.$watch('pageListLength', _.debounce(function(value) {
        $scope.$apply(function() {
            var reg = /[^\d]/g;
            if (value && !reg.test(value)) {
                if (value < 1) {
                    $scope.pageListLength = 1;
                }
                if (value > 100) {
                    $scope.pageListLength = 100;
                }
                wdDataSetting.pageListLength($scope.pageListLength);
                showAllData();
            }
        });
    }, 300));

    $scope.$watchCollection(function() {
        return [$scope.pathType, $scope.source, $scope.sort, $scope.order];
    }, _.debounce(function(value) {
        $scope.$apply(function() {
            $scope.offset = 0;
            showAllData();
        });
    }, 300));
    
    // 翻页逻辑
    $scope.$watch('offset', function(value) {
        showAllData();
    });
}];
});
