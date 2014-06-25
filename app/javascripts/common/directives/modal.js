define([
    'text!templates/common/modal.html'
], function(
    template
) {
'use strict';
return [function() {
    return {
        restrict: 'A',
        template: template,
        scope: true,
        replace: true,
        link: function($scope, $element, $attrs, $controller) {
            $scope.$watch(function() {
                return $attrs.title;
            }, function(value) {
                $element.find('.modal-title').html(value);
            });
            $scope.$watch(function() {
                return $attrs.content;
            }, function(value) {
                $element.find('.modal-body').html(value);
            });

            // $element.on('hidden.bs.modal', function (e) {
            //     $element.find('.modal-body').html('');
            //     $element.find('.modal-title').html('');
            // });
        }
    };
}];
});