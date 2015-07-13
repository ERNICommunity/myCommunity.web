(function () {
    'use strict';

    angular
        .module('myCommunityApp.calendar.detail')
        .controller('CalendarDetailController',
        ['$stateParams', '$scope', 'YammerLoginData', 'DataSourceService', CalendarDetailController]);

    function CalendarDetailController($stateParams, $scope, yammerLoginData, dataSourceService) {
        var vm = this;
        vm.event = $scope.events.filter(function (elem) {
            return elem.id === $stateParams.id;
        })[0];

        $scope.loginData = yammerLoginData;
        $scope.checkIfUserIsGoing = function () {
            return yammerLoginData.isLoggedIn && $.inArray(yammerLoginData.userName, vm.event.participants) != -1;
        }

        // callback on signup button click
        $scope.submitSignUpRequest = function () {

            if (yammerLoginData.isLoggedIn) {
                console.log('CalendarDetail: User \'' + yammerLoginData.userName + '\' logged in, signing up.');
                dataSourceService.registerForEvent(vm.event.id, yammerLoginData, onCompleted);
            }
            else {
                // this should be prevented by the UI: if no user is signed on, the button shouldn't be enabled.
                alert('You need to sign in first!');
            }

            function onCompleted(success) {
                if (success) {
                    vm.event.participants.push(yammerLoginData.userName);
                }
            }
        };
    }

})();