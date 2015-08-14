(function () {
    'use strict';

    angular
        .module('myCommunityApp.calendar')
        .controller('CalendarListController', CalendarListController);

    function CalendarListController($scope, $stateParams, YammerLoginData) {

        switch ($stateParams.mode)
        {
            case "mine":
                $scope.pageTitle = "Events I signed up for";
                $scope.relevantEvents = FilterMyEvents(FilterFutureEvents($scope.events), YammerLoginData.userName);
                console.log("MODE: MY CALENDAR");
                console.dir($scope.relevantEvents);
                break;
            case "past":
                $scope.pageTitle = "Past Events";
                $scope.relevantEvents = FilterPastEvents($scope.events);
                console.log("MODE: PAST");
                console.dir($scope.relevantEvents);
                break;
            default:
                $scope.pageTitle = "Upcoming Events";
                $scope.relevantEvents = FilterFutureEvents($scope.events);
                console.log("MODE: PLANNED");
                console.dir($scope.relevantEvents);
        }

        function FilterMyEvents(events, userFullName) {
            return events.filter(function (ev) {
                return $.inArray(userFullName, ev.participants) !== -1;
            });
        }

        function FilterPastEvents(events) {
            return events.filter(function (ev) {
                var eventDate = new Date(ev.eventDate);
                var now = new Date();
                return eventDate < now;
            });
        }

        function FilterFutureEvents(events) {
            return events.filter(function (ev) {
                var eventDate = new Date(ev.eventDate);
                var now = new Date();
                return eventDate > now;
            });
        }
    }

})();