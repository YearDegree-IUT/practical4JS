define([
    'underscore',
    'backbone',
    'models/character'
], function (_, Backbone, CharacterModel) {
    var Characters = Backbone.Collection.extend({
        model: CharacterModel,
        url: 'http://edu.muetton.me/characters'
    });

    return Characters;
});
