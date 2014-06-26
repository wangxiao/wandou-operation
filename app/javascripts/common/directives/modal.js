define([
    'text!templates/common/modal.html'
], function(
    template
) {
'use strict';
return ['wdModalSer', '$q',
function(wdModalSer, $q) {
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
            $scope.$watch(function() {
                return $attrs.show;
            }, function(value) {
                if (value === 'true') {
                    $element.modal('show');
                } else {
                    $element.modal('hide');
                }
            });
            $element.on('hidden.bs.modal', function (e) {
                wdModalSer.defer.resolve();
                wdModalSer.defer = $q.defer();
            });
        }
    };
}];
});