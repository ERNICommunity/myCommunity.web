(function () {
    'use strict';

    angular
        .module('myCommunityApp.calendar')
        .controller('CalendarBaseController', CalendarBaseController);

    function CalendarBaseController(events, $scope) {
        var vm = this;
        vm.events = events;
        $scope.events = events; // to share across childs
    }

})();