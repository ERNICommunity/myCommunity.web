(function () {
    'use strict';

    /* Add here all application modules dependencies*/

    angular
        .module('myCommunityApp', [
            'ui.bootstrap',
            'myCommunityApp.calendar',
            'myCommunityApp.DataSource',
            'myCommunityApp.news',
            'myCommunityApp.yammerLogin',
            'myCommunityApp.contentAdmin'
        ]);
})();