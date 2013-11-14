/**
 * Created by quinn on 10/12/13.
 */
/* globals App, Ember, define */

define([
	// Non - AMD
	'HipsterController',
	'HipsterModel',

	'HipsterViewRoute',
	'HipsterFindRoute',
	'HipsterEditRoute',
	'HipsterAddRoute',

    'EmoListModel',
    'EmoListAddRoute'
], function () {
	"use strict";

	App.HipsterRoute = Ember.Route.extend({});

    App.EmoListRoute = Ember.Route.extend({});
});