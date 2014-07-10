define([
    'underscore'
], function(
    _
) {
'use strict';
return ['$scope', 'wdDataSetting', 'wdSearchSer', '$location', 'wdStorage',
function($scope, wdDataSetting, wdSearchSer, $location, wdStorage) {
    $scope.dataList = [];
    $scope.firstFlag = true;
    $scope.udid = wdStorage.value('applist-udid') || '';

    $scope.search = function() {
        if ($scope.udid.trim()) {
            wdSearchSer.applistSearch($scope.udid).then(function(data) {
                wdStorage.value('applist-udid', $scope.udid);
                console.log(data);
                $scope.dataList = data;
                $scope.firstFlag = false;
            });
        }
    };
    
}];
});
