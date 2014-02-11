define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var Character = Backbone.Model.extend({
        idAttribute: '_id',
        urlRoot: 'http://edu.muetton.me/characters'
    });

    return Character;
});
