define([
    'jquery',
    'underscore'
], function(
    $,
    _
) {
'use strict';
return ['$scope', 'wdLdap', '$location', 'wdConfig', 'wdDataSetting',
function ldapCtrl($scope, wdLdap, $location, wdConfig, wdDataSetting) {
    var signInUrl = wdConfig.apiUrl + '/j_spring_security_check';
    console.log($scope.signInUrl);
    $scope.name = '';
    $scope.password = '';
    $scope.$watchCollection(function() {
        return [$scope.name, $scope.password];
    }, _.debounce(function(value) {
        $scope.$apply(function() {
            if ($scope.name.trim() && $scope.password.trim()) {
                wdLdap.signIn($scope.name, $scope.password).then(function(data) {
                    console.log(data);
                    wdDataSetting.userName($scope.name);
                    $location.path('/index');
                });
            }
        });
    }, 1000));
    // 结束
}];
});
