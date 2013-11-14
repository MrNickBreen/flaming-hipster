/**
 * Created by nbreen on 11/11/13.
 */
/* globals define, Ember, App */

define(['EmoListAddController', 'EmoListModel'], function () {
    "use strict";

    App.EmoListAddRoute = Ember.Route.extend({
        model: function () {
            Ember.debug('EmoListAddRoute.model');
            return this.get('store').createRecord('emoList');
        },

        setupController: function(controller, model) {
            this.controller.set('model', model);
            console.log('in setup controller');
        }

    });
});