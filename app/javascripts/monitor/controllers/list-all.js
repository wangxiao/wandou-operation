define([
    'underscore'
], function(
    _
) {
'use strict';
return ['$scope', 'wdMonitorSer', '$timeout', '$location', 'wdDataSetting', 'wdModalSer',
function indexCtrl($scope, wdMonitorSer, $timeout, $location, wdDataSetting, wdModalSer) {
    // 是否是第一次进入
    $scope.firstFlag = true; 
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

    var action = $location.search().action;

    // 用于数据服务，获取根据 action 获取。
    var actionObj = {
        new: 1,
        change: 2,
        offline: 3
    };

    // 当前数据显示的位置，用来分页获取数据，默认从头开始。
    $scope.offset = 0;

    function getContentTypeOptions() {
        return wdDataSetting.getContentTypeOptions().then(function(data) {
            $scope.contentTypeOptions = data;
            _.each($scope.dataList, function(v) {
                v.uiContentTypeOption = wdDataSetting.getContentTypeTitle(v.contentType); 
            });
        });
    }

    function getAdviceLevel() {
        _.each($scope.dataList, function(v) {
            v.uiAdviceLevel = wdDataSetting.getAdviceLevel(v.adviceLevel);
            v.uiAdviceLevelTitle = wdDataSetting.getAdviceLevel(v.adviceLevel).name;
            v.uiSrcAdviceLevelTitle = wdDataSetting.getAdviceLevel(v.srcAdviceLevel).name;
        });
    }

    wdMonitorSer.getCounterList().then(function(data) {
        _.each(data, function(v){
            $scope.counterList[v.name] = v.value;
        });
    });

    function formatData() {
        getContentTypeOptions();
        getAdviceLevel();
    }

    function showAllData() {
        var opts = {
            size: $scope.pageListLength,
            offset: $scope.offset,
            pathType: $scope.pathType.value,
            source: $scope.source.value,
            orderBy: $scope.sort.value,
            order: $scope.order.value
        };
        var success = function(data) {
            $scope.firstFlag = false;
            $scope.dataList = data;
            $scope.showLoading = false;
            if (data.length) {
                formatData();
            } else {
                $scope.pageUp();
            }
        };
        switch (action) {
            case 'online':
                wdMonitorSer.getCompeteOnlineList(opts).then(function(data) {
                    success(data);
                });
            break;
            case 'new':
                if ($scope.firstFlag) {
                    $scope.sort = $scope.sortOptions[2];
                    opts.orderBy = $scope.sort.value;
                }
                opts.action = actionObj[action];
                wdMonitorSer.getCompeteOnlineList(opts).then(function(data) {
                    success(data);
                });
            break;
            default:
                opts.action = actionObj[action];
                wdMonitorSer.getCompeteAllList(opts).then(function(data) {
                    success(data);
                });
            break;
        }
    }

    function deleteItem(id) {
        _.find($scope.dataList, function(v, i) {
            if (v.id === id) {
                $scope.dataList.splice(i, 1);
            }
        });
    }
    $scope.getPathType = function(pathType) {
        return wdDataSetting.getPathType(pathType).title;
    };

    $scope.editItem = function(item) {
        // 备份当前数据
        item.uiOldData = _.clone(item);
        item.uiEditStatus = true;
        item.uiAdviceLevel = wdDataSetting.getAdviceLevel(item.adviceLevel);
    };

    $scope.cancelEditItem = function(item) {
        item.uiEditStatus = false;
        _.each($scope.dataList, function(v, i) {
            if (v.id === item.id) {
                $scope.dataList[i] = item.uiOldData;
            }
        });
    };

    // 保存当前编辑，flag 是内部参数，用来标记是否只是界面改变，还是需要真正的提交数据。
    $scope.finishEditItem = function(item, flag) {
        item.uiEditStatus = false;
        item.contentType = item.uiContentTypeOption.id;
        item.adviceLevel = item.uiAdviceLevel.value;
        delete item.uiOldData;
        if (!flag) {
            wdMonitorSer.upDateCompeteData(item).then(function(data) {
                console.log(data);
            });
        }
    };
    $scope.checkFinish = function(item) {
        wdMonitorSer.checkFinishCompeteData(item).then(function(data) {
            console.log(data);
            deleteItem(item);
        });
    };
    $scope.ignoreItem = function(item) {
        $scope.finishEditItem(item, true);
        wdMonitorSer.ignoreCompeteDate(item).then(function(data) {
            console.log(data);
            deleteItem(item.id);
        });
    };
    $scope.publicItem = function(item) {
        $scope.finishEditItem(item, true);
        wdMonitorSer.publicCompeteData(item).then(function(data) {
            console.log(data);
            deleteItem(item.id);
        });
    };
    $scope.offlineItem = function(item) {
        $scope.finishEditItem(item, true);
        wdMonitorSer.offlineCompeteDate(item).then(function(data) {
            console.log(data);
            deleteItem(item.id);
        });
    };
    // 自动生成文案
    $scope.autoLabelItem = function(item) {
        var backup = _.clone(item);
        delete item.uiOldData;
        wdMonitorSer.autoLabel(item).then(function(data) {
            console.log(data);
            _.find($scope.dataList, function(v, i) {
                if (item.id === v.id) {
                    $scope.dataList[i] = data;
                    $scope.dataList[i].uiEditStatus = true;
                    $scope.dataList[i].uiOldData = item.uiOldData;
                }
            });
            formatData();           
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
                $scope.showLoading = true;
                wdDataSetting.pageListLength($scope.pageListLength);
                showAllData();
            }
        });
    }, 300));

    $scope.$watchCollection(function() {
        return [$scope.pathType, $scope.source, $scope.sort, $scope.order];
    }, _.debounce(function(value) {
        $scope.$apply(function() {
            $scope.showLoading = true;
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
