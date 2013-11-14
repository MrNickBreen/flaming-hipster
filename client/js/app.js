/*globals require, Ember, DS, App:true */

var DEBUG = true; // TODO: Set by env

/**
 * Main
 */
require.config({
	baseUrl: 'js/',

	paths: {
		lgtm: 'libs/lgtm'
	}
});

Ember.RSVP.configure('onerror', function (error) {
	"use strict";
	console.assert(false, error.message);
	console.error(error);
});

Ember.Handlebars.helper('lastFive', function (value) {
	"use strict";

	if (value.length > 10) {
		value = [
			value.substr(0, 5),
			'...',
			value.slice(value.length - 5)
		].join('');
	}

	return value;
});

App = Ember.Application.create({
//    LOG_TRANSITIONS: true,
//    LOG_TRANSITIONS_INTERNAL: true,
//    LOG_VIEW_LOOKUPS: true,
//    LOG_ACTIVE_GENERATION: true
});
App.deferReadiness();

App.ApplicationSerializer = DS.RESTSerializer.extend({
	primaryKey: '_id'
	/*//,
	serializeHasMany: function(record, json, relationship) {
        this._super();
        var key = relationship.key;

        var relationshipType = DS.RelationshipChange.determineRelationshipType(record.constructor, relationship);
        console.log('SERIALZE HAS MANY');
        console.log(key);
        console.log(relationshipType);
        console.log('serialize has many?!?!');
		//console.log(record, json, relationship);
        console.log(json);
	}*/
});

App.ApplicationAdapter = DS.RESTAdapter.extend({
	namespace: 'api/v1'
});

App.Router.map(function () {
	"use strict";

	this.resource('hipster', function () {
		this.route('add');
		this.route('find');
		this.route('view', { path: ':hipster_id' });
		this.route('edit', { path: ':hipster_id/edit'});
        this.resource('emoList', function() {
            this.route('add');
            this.route('view', {path: ':emo_list_id'});
        });
	});
});

//TODO: Make better
var mainDeps = ['HipsterRoute'];
if (DEBUG) {
	var templates = [
        'emoList/view',
        'emoList/add',
		'hipster/add',
		'hipster/edit',
		'hipster/find',
		'hipster/view',
		'application',
		'partialHipster'
	];

	Ember.TEMPLATES = Ember.TEMPLATES || [];

	templates.forEach(function (template) {
		$.ajax('hbs/' + template + '.hbs', 'GET')
			.then(function (result) {
				Ember.TEMPLATES[template] = Ember.Handlebars.compile(result);
			});
	});

} else {
	mainDeps.push('templates');
}

require(mainDeps, function () {
	"use strict";

	App.advanceReadiness();
});

