/**
 * Created by quinn on 10/4/13.
 */
/* globals define, App, DS */

define([], function () {
	"use strict";

	/**
	 *
	 * The Hipster Model
	 *
	 * @class Hipster
	 * @extends DS.Model
	 */
	App.Hipster = DS.Model.extend({
		/**
		 * The Hipster's first name
		 *
		 * @property firstName
		 * @type {String}
		 */
		firstName: DS.attr('string'),

		/**
		 * The Hipster's last name
		 *
		 * @property lastName
		 * @type {String}
		 */
		lastName: DS.attr('string'),

        /**
         * The Hispter's Emo friends
         *
         * @property emoItems
         * @type hasMany{Emo}
         */
        //emoItems: DS.hasMany('emoList', {async: true} )
        emoItems: DS.hasMany('emoList')

		/**
		 * The Hipster's accessories
		 */
//        accessories: DS.belongsTo('accessory')
	});
/*
    App.Hipster.FIXTURES = [
        {id: 1, firstName: 'firstName', lastName: 'lastName', emoItems: []},
        {id: 2, firstName: 'firstName1', lastName: 'lastName2', emoItems: [3,4]}
    ];
*/

});