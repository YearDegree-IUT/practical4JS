require.config({
    baseUrl: 'js/',
    paths: {
        'jquery': '../bower_components/jquery/jquery',
        'backbone': '../bower_components/backbone/backbone',
        'underscore': '../bower_components/lodash/dist/lodash.underscore',
        'backbone-nested-model': '../bower_components/backbone-nested-model/backbone-nested',
        'backbone-forms': '../bower_components/backbone-forms/distribution/backbone-forms',
        'tpl': '../bower_components/tpl/tpl'
    },
    shim: {
        'backbone': { exports: 'Backbone', deps: ['underscore', 'jquery'] },
        'underscore': { exports: '_' },
        'backbone-forms': { exports: 'backbone-forms', deps: ['backbone'] },
        'backbone-nested-model': { exports: 'backbone-nested-model', deps: ['backbone'] }
    }
});