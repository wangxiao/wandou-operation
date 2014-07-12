define([
        'jquery',
        'underscore',
        'text!templates/common/sidebar.html'
    ], function(
        $,
        _,
        template
    ) {
'use strict';
return [function() {
    return {
        restrict: 'EAC',
        template: template,
        scope: true,
        replace: true,
        controller: ['$scope', 'wdSidebarSer', '$location',
        function($scope, wdSidebarSer, $location) {
            $scope.monitorList = {};
            $scope.preUrl = $location.absUrl().replace(/#.*/g, '#');
            wdSidebarSer.getCounterListNum().then(function(data) {
                _.each(data, function(v){
                    $scope.monitorList[v.name] = v.value;
                });
            });
        }],
        link: function($scope, $element, $attrs, $controller) {
        }
    };
}];
});
