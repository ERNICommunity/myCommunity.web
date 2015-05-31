(function () {
    'use strict';

    angular
        .module('myCommunityApp.calendar.detail')
        .controller('CalendarDetailController', CalendarDetailController);

    function CalendarDetailController($stateParams, $scope) {
        var vm = this;
        vm.event = $scope.events.filter(function (elem) {
            return elem.id === $stateParams.id;
        })[0];
    }

})();