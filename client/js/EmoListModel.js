/**
 * Created by nbreen on 11/11/13.
 */
/* globals define, App, DS */

define([], function () {
    "use strict";

    /**
     *
     * The EmoList Model
     *
     * @class EmoList
     * @extends DS.Model
     */
    App.EmoList = DS.Model.extend({
        /**
         * The Emo's favorite hangout
         *
         * @property hangout
         * @type {String}
         */
        hangout: DS.attr('string')
    });

/*
    App.EmoList.FIXTURES = [
        /*{id: 1, hangout: 'hangout1'},
        {id: 2, hangout: 'hangout2'},
        {id: 3, hangout: 'hangout3'},
        {id: 4, hangout: 'hangout4'}
    ];
    */
});