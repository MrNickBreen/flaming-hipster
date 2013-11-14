/* globals define, App, DS */

/**
 * Created by quinn on 9/29/13.
 */
define([], function () {
	"use strict";

	App.Accessory = DS.Model.extend({
		name: DS.attr('string')
	});

    /*
    App.Accessory.FIXTURES = [
        {id: '1', name: 'accessory'}
    ];*/
});