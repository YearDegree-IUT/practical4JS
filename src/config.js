require.config({
    baseUrl: 'js/',
    paths: {
        'jquery': '../bower_components/jquery/jquery',
        'backbone': '../bower_components/backbone/backbone',
        'underscore': '../bower_components/lodash/dist/lodash.underscore',
        'tpl': '../bower_components/tpl/tpl'
    },
    shim: {
        'backbone': { exports: 'Backbone', deps: ['underscore', 'jquery'] },
        'underscore': { exports: '_' }
    }
});
