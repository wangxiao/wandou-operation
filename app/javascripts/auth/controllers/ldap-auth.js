define([
    'jquery',
    'underscore'
], function(
    $,
    _
) {
'use strict';
return ['$scope', 'wdLdap', '$location', 'wdConfig',
function ldapCtrl($scope, wdLdap, $location, wdConfig) {
    var signInUrl = wdConfig.apiUrl + '/j_spring_security_check';
    console.log($scope.signInUrl);
    $scope.name = '';
    $scope.password = '';
    $scope.$watchCollection(function() {
        return [$scope.name, $scope.password];
    }, _.debounce(function(value) {
        $scope.$apply(function() {
            if ($scope.name.trim() && $scope.password.trim()) {
                // wdLdap.signIn($scope.name, $scope.password).then(function(data) {
                //     console.log(data);
                //     $location.path('/index');
                // });
                // 由于后端无法支持 RESTful API 形式，所以暂时用传统表单提交。
                $('#sign-in-form').attr('action', signInUrl).submit();
            }
        });
    }, 1000));
    // 结束
}];
});
