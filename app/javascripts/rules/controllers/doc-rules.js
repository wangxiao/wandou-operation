define([
], function(
) {
'use strict';
return ['$scope', 'wdRulesSer',
function($scope, wdRulesSer) {
    $scope.dataList = [];
    wdRulesSer.getDocRules().then(function(data) {
        $scope.dataList = data.splice(0, 10);
        console.log(data);
    });

    $scope.addItem = function() {
        if ($scope.dataList[0].id) {
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
