(function () {
    'use strict';

    var module = angular.module('myCommunityApp.contentAdmin');
    module.controller('EditEventController', function ($stateParams, $scope) {

        var eventToBeEdited = $scope.events.filter(function (elem) {
            return elem.id === $stateParams.id;
        })[0];

        console.dir(eventToBeEdited);

        // create a copy to allow undo.
        var eventCopy = jQuery.extend(true, {}, eventToBeEdited);
        eventCopy.sexyDate = new Date(eventCopy.eventDate);
        $scope.event = eventCopy;

        $scope.eventTypeOptions = [ 'Meetup', 'Hack Session', 'EDD'];
    });
})();