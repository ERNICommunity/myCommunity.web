(function () {
    'use strict';

    angular
        .module('myCommunityApp.calendar.detail')
        .controller('CalendarDetailController', ['$stateParams', '$scope', '$http', 'YammerLoginData', CalendarDetailController]);

    function CalendarDetailController($stateParams, $scope, $http, yammerLoginData) {
        var vm = this;
        vm.event = $scope.events.filter(function (elem) {
            return elem.id === $stateParams.id;
        })[0];

        $scope.loginData = yammerLoginData;
        $scope.checkIfUserIsGoing = function() {
            return yammerLoginData.isLoggedIn && $.inArray(yammerLoginData.userName, vm.event.participants) != -1;
        }

        // callback on signup button click
        $scope.submitSignUpRequest = function() {
            if (yammerLoginData.isLoggedIn) {
                var userName = yammerLoginData.userName;

                console.log('CalendarDetail: User \'' + userName + '\' logged in, signing up.');
                var url = encodeURI('http://mycommunity.nova.scapp.io/register/' + vm.event.id + '/' + userName);
                console.log('CalendarDetail: Opening ' + url);
                $http.get(url)
                    .success(function(data, status, headers, config) {
                        console.log('CalendarDetail: Posted to ' + url + '\nResponse: ' + JSON.stringify(data));
                        $('#signUpModal').modal('hide');
                        vm.event.participants.push(userName);
                    })
                    .error(function(data, status, headers, config) {
                        alert('Registration failed - the backend server did not respond as expected. (data:' + data + ')');
                    });
            }
            else
            {
                // this should be prevented by the UI: if no user is signed on, the button shouldn't be enabled.
                alert('You need to sign in first!');
            }
        };
    }

})();