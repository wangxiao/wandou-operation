define([
        'text!templates/common/loading.html',
        'jquery',
        'svgLoader'
    ], function(
        template,
        $,
        SvgLoader
    ) {
'use strict';
return [function() {
    return {
        restrict: 'A',
        template: template,
        scope: true,
        replace: true,
        controller: ['$scope',
        function($scope) {
        }],
        link: function($scope, $element, $attrs, $controller) {
            var mina = mina || {};
            $element.show();
            var loader = new SvgLoader($element[0], {
                speedIn: 500,
                easingIn: mina.easeinout 
            });

            $scope.$watch(function() {
                return $attrs.show;
            }, function(value) {
                if (value === 'true') {
                    loader.show();
                } else {
                    loader.hide();
                }
            });

        }
    };
}];
});
