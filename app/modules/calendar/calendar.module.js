(function () {
    'use strict';

    angular
        .module('myCommunityApp.calendar', [
            'ui.router',
            'myCommunityApp.event',
            'myCommunityApp.calendar.detail'
        ]);

})();