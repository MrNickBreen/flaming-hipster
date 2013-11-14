/* globals define, App, Ember */
/**
 * Created by quinn on 10/5/13.
 */
define([], function () {
	"use strict";

	App.HipsterFindController = Ember.ArrayController.extend({

		sortProperties: ['firstName', 'lastName'],

		actions: {
			findHipsters: function () {
				var query = {},
					firstName = this.get('firstName'),
					lastName = this.get('lastName');

				if (firstName || lastName) {
					query = {
						firstName: firstName,
						lastName: lastName
					};
				}
                console.log('about to call store');

				this.get('store').find('hipster', query)
					.then(function (results) {
                        console.log('in find hipseters, heres were we are');
                        console.log(results);
						this.set('model', results);
					}.bind(this));
			}
		}
	});
});