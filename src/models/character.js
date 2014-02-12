define([
    'underscore',
    'backbone',
    'backbone-forms',
    'backbone-nested-model'
], function (_, Backbone) {
    var Character = Backbone.Model.extend({
    	schema: {
	        name: 		"Text",
		    quote: 		"Text",
		    attributes: 'Text',
		    birthday: 	"Date",
	        type:   	{ type: 'Select', options: ['Elf', 'Orc', 'Wizard', 'Troll', 'Dwarf', 'Gobelin', 'Human'] },
	        address:    'Text',
	        job:      	'Text',
	        addiction: 	'Text'
    	},
        idAttribute: '_id',
        urlRoot: 'http://edu.muetton.me/characters'
    });

    return Character;
});