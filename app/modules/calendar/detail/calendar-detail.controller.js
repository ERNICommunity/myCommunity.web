(function () {
    'use strict';

    angular
        .module('myCommunityApp.calendar.detail')
        .controller('CalendarDetailController', CalendarDetailController);

    function CalendarDetailController($stateParams, $scope, $http) {
        var vm = this;
        vm.event = $scope.events.filter(function (elem) {
            return elem.id === $stateParams.id;
        })[0];

        $scope.submitSignUpForm = function(name) {
            if (name)
            {
                var url = encodeURI('http://mycommunity.nova.swisscloud.io/register/' + vm.event.id + '/' + name);
                console.info('opening ' + url);
                $http.get(url)
                    .success(function(data, status, headers, config) {
                        console.log('posted to ' + url + '\nResponse: ' + JSON.stringify(data));
                        $('#signUpModal').modal('hide');
                        vm.event.participants.push(name);
                    })
                    .error(function(data, status, headers, config) {
                        alert('Registration failed - the backend server did not respond as expected. (data:' + data + ')');
                    });
            }
        };
    }

})();