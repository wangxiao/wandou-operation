require.config({
    paths: {
        jquery: '../components/jquery/dist/jquery',
        angular: '../components/angular/angular',
        angularRoute: '../components/angular-route/angular-route',
        bootstrapModal: '../components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/modal',
        underscore: '../components/underscore/underscore',
        text: '../components/requirejs-text/text',
        domready: '../components/requirejs-domready/domReady',
        templates: '../templates'
    },
    shim: {
        bootstrapModal: {
            deps: [
                'jquery'
            ]
        },
        angular: {
            exports: 'angular',
            deps: [
                'jquery'
            ]
        },
        angularRoute: {
            deps: [
                'angular'
            ],
        },
        jquery: {
            exports: '$'
        },
        underscore: {
            exports: '_'
        }
    }
});

require(['app'], function() {});