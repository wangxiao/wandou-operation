define([
        'text!templates/common/account-header.html'
    ], function(
        template
    ) {
'use strict';
return [function() {
    return {
        restrict: 'EAC',
        template: template,
        scope: true,
        replace: true,
        controller: ['$scope', 'wdLdap', '$location', 'wdDataSetting',
        function($scope, wdLdap, $location, wdDataSetting) {
            $scope.userName = wdDataSetting.userName();
            $scope.signOut = function() {
                wdLdap.signOut().then(function() {
                    $location.path('/auth');
                });
            };
        }],
        link: function($scope, $element, $attrs, $controller) {
        }
    };
}];
});
