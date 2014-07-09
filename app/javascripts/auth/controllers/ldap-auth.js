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
return ['$scope', 'wdLdap', '$location', 'wdConfig', 'wdDataSetting', '$timeout', '$window',
function ldapCtrl($scope, wdLdap, $location, wdConfig, wdDataSetting, $timeout, $window) {
    var signInUrl = wdConfig.apiUrl + '/j_spring_security_check';
    $scope.name = '';
    $scope.password = '';
    $scope.showLoginFrom = true;
    $scope.$watchCollection(function() {
        return [$scope.name, $scope.password];
    }, _.debounce(function(value) {
        $scope.$apply(function() {
            if ($scope.name.trim() && $scope.password.trim()) {
                wdLdap.signIn($scope.name, $scope.password).then(function(data) {
                    if (data.status !== 401) {
                        wdDataSetting.userName($scope.name);
                        $scope.showLoginFrom = false;
                        success();
                        $timeout(function() {
                            $location.path('/index');
                        }, 9100);
                    }
                });
            }
        });
    }, 100));
    // 结束

    function success() {
        $window.startTrans();
    }
}];
});
