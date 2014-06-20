define([
    'text!templates/common/modal-btn.html'
], function(
    template
) {
'use strict';
return [function() {
    return {
        restrict: 'A',
        template: template,
        scope: true,
        replace: false,
        link: function($scope, $element, $attrs, $controller) {
            $scope.title = $attrs.title || '';
        }
    };
}];
});