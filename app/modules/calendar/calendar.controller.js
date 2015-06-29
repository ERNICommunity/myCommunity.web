(function () {
    'use strict';

    angular
        .module('myCommunityApp.calendar')
        .controller('CalendarController', CalendarController);

    function CalendarController(events, $scope) {
        var vm = this;
        vm.events = events;
        $scope.events = events; // to share across childs
    }

})();