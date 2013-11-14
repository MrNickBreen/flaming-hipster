/**
 * Created by quinn on 10/12/13.
 */
/* globals define, App, Ember */

define([], function () {
	"use strict";

	App.HipsterViewController = Ember.ObjectController.extend({

        /**
         * Returns this models emoList
         *
         * @method emoListOptions
         * @return DS.PromiseArray
         */
        emoListOptions: function () {
            console.log('getting emo list options for view');
            return this.get('model.emoItems');
        }.property(),

		isDisabled: true
	});
});