define([
    'text!templates/common/modal.html'
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
        link: function($scope, $element, $attrs, $controller) {
            var title = $attrs.title || '';
            var content = $attrs.content || '';
            $element.find('.modal-body').html(content);
            $element.find('.modal-title').html(title);
            // $element.on('hidden.bs.modal', function (e) {
            //     $element.find('.modal-body').html('');
            //     $element.find('.modal-title').html('');
            // });
        }
    };
}];
});