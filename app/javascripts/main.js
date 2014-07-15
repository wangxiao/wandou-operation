require.config({
    paths: {
        jquery: '../components/jquery/dist/jquery',
        angular: '../components/angular/angular',
        angularRoute: '../components/angular-route/angular-route',
        angularAnimate: '../components/angular-animate/angular-animate',
        bootstrapModal: '../components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/modal',
        underscore: '../components/underscore/underscore',
        snapSvg: '../components/Snap.svg/dist/snap.svg',
        svgLoader: './base/svgLoader',
        text: '../components/requirejs-text/text',
        domready: '../components/requirejs-domready/domReady',
        templates: '../templates',
        transformers: './base/trans'
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
        angularAnimate: {
            deps: [
                'angular'
            ],
        },
        snapSvg: {
            exports: 'Snap',
            deps: [
            ]
        },
        svgLoader: {
            exports: 'SVGLoader',
            deps: [
                'snapSvg',
                'jquery'
            ]
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
