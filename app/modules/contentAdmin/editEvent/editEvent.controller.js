(function () {
    'use strict';

    var module = angular.module('myCommunityApp.contentAdmin');
    module.controller('EditEventController', function ($stateParams, $scope) {

        var eventId = $stateParams.id;
        $scope.isNewEvent = eventId == '';

        if (!$scope.isNewEvent) {
            var eventToBeEdited = $scope.events.filter(function (elem) {
                return elem.id === eventId;
            })[0];

            // create a copy to allow undo.
            var eventCopy = jQuery.extend(true, {}, eventToBeEdited);
            eventCopy.sexyDate = new Date(eventCopy.eventDate);
            $scope.event = eventCopy;
        }

        $scope.eventTypeOptions = ['Meetup', 'Hack Session', 'EDD'];
    });
})();