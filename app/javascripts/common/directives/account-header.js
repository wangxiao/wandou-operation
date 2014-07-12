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
        controller: ['$scope', 'wdLdap', '$location', 'wdDataSetting', '$timeout',
        function($scope, wdLdap, $location, wdDataSetting, $timeout) {
            $scope.userName = wdDataSetting.userName();
            $scope.signOut = function() {
                wdLdap.signOut().then(function() {
                    $location.path('/auth');
                });
            };
        }],
        link: function($scope, $element, $attrs, $controller) {
            // 广告部分
            $element.find('.content').animate({
                right: 2000
            }, 50000);
        }
    };
}];
});
