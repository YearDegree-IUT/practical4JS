define([
    'tpl!templates/form.tpl',
    'underscore',
    'backbone',
    'models/character'
], function (tpl, _, Backbone, Character) {

    var Form = Backbone.View.extend({
        events: {
            'submit form': 'addCharacter'
        },
        render: function () {
            this.$el.html(tpl());
            this.$('input[name=name]').focus();
            return this;
        },
        addCharacter: function (e) {
            e.preventDefault();
            var $name = this.$('input[name=name]');
            var character = new Character({
                name: $name.val()
            });
            var collection = this.collection;
            character.save()
                .done(function () {
                    collection.add(character);
                    $name.val('');
                })
                .fail(function () {
                    Backbone.trigger('error', _.template('Unable to delete character <%- name %>', model.toJSON()));
                });

        }
    });

    return Form;
});
