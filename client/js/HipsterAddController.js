/* globals define, App, Ember */

/**
 * Created by quinn on 10/4/13.
 */
define(['HipsterModel', 'AccessoryModel', 'EmoListModel'], function () {
	"use strict";

	/**
	 * Hipster / Add Controller
	 *
	 * @class HipsterAddController
	 * @extends Ember.ObjectController
	 */
	App.HipsterAddController = Ember.ObjectController.extend({
     //   emoItems:null,

		foo: function (key, value) {
			console.log(key, value);
			this.set('model.accessories', value);
		}.property(),

		/**
		 * Returns all Accessory Model records
		 *
		 * @method accessoryOptions
		 * @return DS.PromiseArray
		 */
		accessoryOptions: function () {
			return this.get('store').find('accessory');
		}.property(),

        /**
         * Returns all Emolist records
         *
         * @method emoListOptions
         * @return DS.PromiseArray
         */
        emoListOptions: function () {
            return this.get('store').find('emoList');
        }.property(),

		actions: {
			/**
			 * Saves the new record when the user presses
			 * the button
			 *
			 * @method buttonClick
			 */
			buttonClick: function () {

				this.get('model').save()
					.then(function (result) {
                        console.log('saved hipster!!');
                        console.log(result);
						this.transitionToRoute('hipster.view', result);
					}.bind(this));


			}
		}
	});
});