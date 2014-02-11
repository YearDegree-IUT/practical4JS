require([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'collections/characters',
    'views/form'
], function ($, _, Backbone, Router, CharacterCollection, FormView) {

    // When dom is ready
    $(function () {
        // Initialize data
        var characters = new CharacterCollection();
        characters
            .fetch()
            .done(function (xhr) {
                Backbone.history.start();
            });

        // instanciate routers
        var router  = new Router({
            characters: characters,
            selector: '.characters-list'
        });

        // show Loading
        $('.characters-list').html('Loading');

        // append form.
        var form = new FormView({
            collection: characters,
            el: '.characters-form'
        });
        form.render();
    });
});
