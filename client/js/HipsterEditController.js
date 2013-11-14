/* globals define, App, Em */

/**
 * Created by quinn on 10/5/13.
 */
define([], function () {
	"use strict";

	App.HipsterEditController = Em.ObjectController.extend({

		actions: {
			buttonClick: function () {
				this.get('model').save()
					.then(function () {
						this.transitionToRoute('hipster.view');
					}.bind(this));
			}
		}
	});
});