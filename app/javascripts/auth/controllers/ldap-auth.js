define([
    'jquery',
    'underscore',
    'transformers'
], function(
    $,
    _,
    transformers
) {
'use strict';
return ['$scope', 'wdLdap', '$location', 'wdConfig', 'wdDataSetting', '$timeout', '$window', 'wdSidebarSer',
function ldapCtrl($scope, wdLdap, $location, wdConfig, wdDataSetting, $timeout, $window, wdSidebarSer) {
    var signInUrl = wdConfig.apiUrl + '/j_spring_security_check';
    $scope.name = '';
    $scope.password = '';
    $scope.showLoginFrom = true;

    wdSidebarSer.getCounterListNum().then(function(data) {
        if (!data.status) {
            $location.path('/index');
        }
    });

    $scope.$watchCollection(function() {
        return [$scope.name, $scope.password];
    }, _.debounce(function(value) {
        $scope.$apply(function() {
            if ($scope.name.trim() && $scope.password.trim()) {
                wdLdap.signIn($scope.name, $scope.password).then(function(data) {
                    if (data.status !== 401 && data.status !== 404) {
                        success();
                    }
                });
            }
        });
    }, 100));
    // 结束

    function success() {
        if ($scope.name !== wdDataSetting.userName() || Math.floor(Math.random() * 11) > 7) {
            $window.startTrans();
            $timeout(function() {
                $location.path('/index');
            }, 8500);
        } else {
            $location.path('/index');
        }
        wdDataSetting.userName($scope.name);
        $scope.showLoginFrom = false;
    }
}];
});
