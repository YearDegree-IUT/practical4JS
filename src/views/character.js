define([
    'tpl!templates/character.tpl',
    'underscore',
    'backbone'
], function (tpl, _, Backbone) {

    var Character = Backbone.View.extend({
        events: {
            'click .delete': 'deleteCharacter'
        },
        initialize: function () {
            // when models are added or removed, rerender the view.
            this.listenTo(this.collection, 'add', this.onCollectionChange, this);
            this.listenTo(this.collection, 'remove', this.onCollectionChange, this);
        },
        onCollectionChange: function () {
            this.render();
        },
        remove: function () {
            // remove event listeners on collection
            // remember, cleanup !
            this.stopListening(collection);
            // call parent function
            Backbone.View.prototype.remove.call(this);
        },
        render: function () {
            var data = {
                characters: this.collection.toJSON()
            };
            var html = tpl(data);
            this.$el.html(html);
            return this;
        },
        deleteCharacter: function (e) {
            var button = e.target;
            var id = button.getAttribute('data-id');
            var view = this;
            var model = this.collection.get(id);
            var $li = view.$(button.parentNode);

            if (!model) { showError($li); }

            // make sure element is removed from collection
            // only if destroy was successful.
            // More on [backbonejs.org](http://backbonejs.org/#Model-destroy)
            model.destroy({wait: true})
                .fail(function () {
                    Backbone.trigger('error', _.template('Unable to delete character <%- name %>', model.toJSON()));
                    showError($li);
                });
        }
    });

    function showError ($li) {
        $li.addClass('error');
        setTimeout(function() {
            // remove class after 1 second.
            $li.removeClass('error');
        }, 1000);
    }


    return Character;
});
