define([
    'underscore',
    'backbone',
    'views/character'
], function (_, Backbone, CharacterView) {

    var Router = Backbone.Router.extend({
        initialize: function (options) {
            if (!options || !options.characters) {
                throw new Error('You MUST povide characters collection to router.');
            }
            this.characters = options.characters;
            if (!options || !options.selector) {
                throw new Error('You MUST provide a selector to router.');
            }
            this.selector = options.selector;
        },
        routes: {
            '': 'index'
        },
        index: function () {
            var view = new CharacterView({
                collection: this.characters
            });
            attachAndRenderView(this.selector, view);
        }
    });

    function attachAndRenderView(selector, view) {
        if (this.view) {
            this.view.remove();
        }
        this.view = view;
        $(selector).html('').append(view.render().$el);
    }

    return Router;
});
