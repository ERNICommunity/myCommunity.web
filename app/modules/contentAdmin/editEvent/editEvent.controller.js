(function () {
    'use strict';

    var module = angular.module('myCommunityApp.contentAdmin');
    module.controller('EditEventController',function ($stateParams, $state, $scope, $filter, DataSourceService) {

        var eventId = $stateParams.id;
        $scope.isNewEvent = eventId === '';

        if ($scope.isNewEvent) {
            $scope.event = { organiser: $scope.loginData.userName };
        } else {
            var eventToBeEdited = $scope.events.filter(function (elem) {
                return elem.id === eventId;
            })[0];

            // create a copy to allow undo.
            var eventCopy = jQuery.extend(true, {}, eventToBeEdited);
            eventCopy.sexyDate = new Date(eventCopy.eventDate);
            eventCopy.sexyBookableHours = parseInt(eventCopy.bookablehours);
            $scope.event = eventCopy;
        }

        $scope.eventTypeOptions = ['Meetup', 'Hack Session', 'EDD'];

        $scope.submit = function() {
            $scope.event.eventDate = $filter('date')($scope.event.sexyDate, 'yyyy-MM-dd HH:mm');
            $scope.event.bookablehours = '' + $scope.event.sexyBookableHours;
            console.log($scope.event.eventDate);
            console.info($scope.event.sexyDate);
            DataSourceService.updateEvent($scope.event, $scope.loginData, onSubmitted);
        };

        function onSubmitted(success) {
            if (success) $state.go('contentAdmin.overview', {}, { reload: true });
        }
    });
})();