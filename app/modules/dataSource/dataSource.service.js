(function () {
    'use strict';

    angular
        .module('myCommunityApp.DataSource')
        .factory('DataSourceService', DataSourceService);

    DataSourceService.$inject = ['$resource', '$http'];
    function DataSourceService($resource, $http) {

        //var backendUrl = 'http://mycommunity.nova.scapp.io';
        var backendUrl = 'http://localhost:3000';

        ////////////

        function getEvents() {
            return $resource(backendUrl + '/events', {}).query().$promise.then(function (data) {
                return data;
            });
        }

        function getEvent(id) {
            return $resource(backendUrl + '/events', {id: '@id'}).get({id: id}).$promise.then(function (data) {
                return data;
            });
        }

        function registerForEvent(eventId, loginData, callback) {

            var postData = {
                eventId: eventId,
                username: loginData.userName,
                token: loginData.token
            };

            var endpoint = backendUrl + '/register';
            $http.post(endpoint, postData)
                .success(function (data, status, headers, config) {
                    console.log('DataSourceService: Posted to ' + endpoint + '\nResponse: ' + JSON.stringify(data));
                    callback(true);
                })
                .error(function (data, status, headers, config) {
                    alert('Registration failed - the backend server did not respond as expected. (data:' + JSON.stringify(data) + ')');
                    callback(false);
                });
        }

        function unregisterFromEvent(eventId, loginData, callback) {

            var postData = {
                eventId: eventId,
                username: loginData.userName,
                token: loginData.token
            };

            var endpoint = backendUrl + '/unregister';
            $http.post(endpoint, postData)
                .success(function (data, status, headers, config) {
                    console.log('DataSourceService: Posted to ' + endpoint + '\nResponse: ' + JSON.stringify(data));
                    callback(true);
                })
                .error(function (data, status, headers, config) {
                    alert('Registration failed - the backend server did not respond as expected. (data:' + JSON.stringify(data) + ')');
                    callback(false);
                });
        }

        function getNewsItems() {
            return $resource(backendUrl + '/news', {}).query().$promise.then(function (data) {
                return data;
            });
        }

        var service = {
            getEvents: getEvents,
            getEvent: getEvent,
            registerForEvent: registerForEvent,
            unregisterFromEvent: unregisterFromEvent,
            getNewsItems: getNewsItems,
        };
        return service;
    }
})();

