(function () {
    'use strict';

    angular
        .module('myCommunityApp.calendar', [
            'ui.router',
            'myCommunityApp.DataSource',
            'myCommunityApp.calendar.detail'
        ]);

})();