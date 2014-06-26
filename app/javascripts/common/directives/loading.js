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
            // 效果路径
            var effects = [
                {
                    opening: 'm -5,-5 0,70 90,0 0,-70 z m 5,35 c 0,0 15,20 40,0 25,-20 40,0 40,0 l 0,0 C 80,30 65,10 40,30 15,50 0,30 0,30 z',
                    closing: '',
                    path: 'm -5,-5 0,70 90,0 0,-70 z m 5,5 c 0,0 7.9843788,0 40,0 35,0 40,0 40,0 l 0,60 c 0,0 -3.944487,0 -40,0 -30,0 -40,0 -40,0 z'
                },
                {
                    opening: 'M20,15 50,30 50,30 30,30 Z;M0,0 80,0 50,30 20,45 Z;M0,0 80,0 60,45 0,60 Z;M0,0 80,0 80,60 0,60 Z',
                    closing: 'M0,0 80,0 60,45 0,60 Z;M0,0 80,0 50,30 20,45 Z;M20,15 50,30 50,30 30,30 Z;M30,30 50,30 50,30 30,30 Z',
                    path: 'M30,30 50,30 50,30 30,30 Z'
                },
                {
                    opening: 'M 40 -21.875 C 11.356078 -21.875 -11.875 1.3560784 -11.875 30 C -11.875 58.643922 11.356078 81.875 40 81.875 C 68.643922 81.875 91.875 58.643922 91.875 30 C 91.875 1.3560784 68.643922 -21.875 40 -21.875 Z',
                    closing: '',
                    path: 'M40,30 c 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 Z'
                },
                {
                    opening: 'M 0,0 c 0,0 63.5,-16.5 80,0 16.5,16.5 0,60 0,60 L 0,60 Z',
                    closing: '',
                    path: 'M 0,0 c 0,0 -16.5,43.5 0,60 16.5,16.5 80,0 80,0 L 0,60 Z'
                },
                {
                    opening: 'M 0,0 0,60 80,60 80,0 Z M 40,30 40,30 40,30 40,30 Z',
                    closing: '',
                    path: 'M 0,0 0,60 80,60 80,0 Z M 80,0 80,60 0,60 0,0 Z'
                },
                {
                    opening: 'M 40,100 150,0 -65,0 z',
                    closing: '',
                    path: 'M 40,100 150,0 l 0,0 z'
                },
                {
                    opening: 'M 0,60 80,60 80,50 0,40 0,60;M 0,60 80,60 80,25 0,40 0,60;M 0,60 80,60 80,25 0,10 0,60;M 0,60 80,60 80,0 0,0 0,60',
                    closing: 'M 0,60 80,60 80,20 0,0 0,60;M 0,60 80,60 80,20 0,40 0,60;m 0,60 80,0 0,0 -80,0',
                    path: 'm 0,60 80,0 0,0 -80,0'
                },
                {
                    opening: 'M 0,0 0,60 80,60 80,0 z M 80,0 40,30 0,60 40,30 z',
                    closing: '',
                    path: 'M 0,0 0,60 80,60 80,0 Z M 80,0 80,60 0,60 0,0 Z'
                }
            ];

            var i = Math.floor(Math.random() * effects.length);
            $element.attr('data-opening', effects[i].opening)
                    .attr('data-closing', effects[i].closing)
                    .find('path')
                    .attr('d', effects[i].path);

            var mina = mina || {};
            $element.show();
            var loader = new SvgLoader($element[0], {
                speedIn: 400,
                easingIn: mina.easeinout 
            });

            $scope.$watch(function() {
                return $attrs.show;
            }, function(value) {
                if (value === 'true') {
                    loader.show();
                } else {
                    setTimeout(function() {
                        loader.hide();
                    }, 1000);
                    // 部分动画没结束会有遗留元素
                    setTimeout(function() {
                        $element.hide();
                    }, 2000);
                }
            });

        }
    };
}];
});
