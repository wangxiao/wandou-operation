require.config({
    paths: {
        bootstrap: '../components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap',
        angular: '../components/angular/angular',
        angularRoute: '../components/angular-route/angular-route',
        jquery: '../components/jquery/dist/jquery',
        underscore: '../components/underscore/underscore',
        text: '../components/requirejs-text/text',
        domready: '../components/requirejs-domready/domReady',
        templates: '../templates'
    },
    shim: {
        bootstrap: {
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