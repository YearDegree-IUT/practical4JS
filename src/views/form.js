define([
    'tpl!templates/form.tpl',
    'underscore',
    'backbone',
    'models/character',
    'backbone-forms',
    'backbone-nested-model'
], function (tpl, _, Backbone, Character) {

    var ch = new Character();

    var form = new Backbone.Form({
        model: ch
    }).render();

    $('body').append(form.el);


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