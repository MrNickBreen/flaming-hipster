/* globals define, App, Ember */

/**
 * Created by nbreen on 11/11/13.
 */
define(['EmoListModel'], function () {
    "use strict";

    /**
     * EmoList / Add Controller
     *
     * @class EmoListAddController
     * @extends Ember.ObjectController
     */
    App.EmoListAddController = Ember.ObjectController.extend({

        actions: {
            /**
             * Saves the new record when the user presses
             * the button
             *
             * @method buttonClick
             */
            buttonClick: function () {
                Ember.debug('Saving EmoList');
                console.log(this.get('model'));
                this.get('model').save()
                    .then(function (result) {
                        console.log(result);
                        this.transitionToRoute('emoList.view', result);
                    }.bind(this));
            }
        }
    });
});