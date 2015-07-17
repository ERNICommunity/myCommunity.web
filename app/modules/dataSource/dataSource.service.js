(function () {
    'use strict';

    angular
        .module('myCommunityApp.DataSource')
        .factory('DataSourceService', DataSourceService);

    DataSourceService.$inject = ['$resource', '$http'];
    function DataSourceService($resource, $http) {

        var backendUrl = 'http://mycommunity.nova.scapp.io';
        //var backendUrl = 'http://localhost:3000';

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
            sendPostRequest(endpoint, postData, callback);
        }

        function unregisterFromEvent(eventId, loginData, callback) {
            var postData = {
                eventId: eventId,
                username: loginData.userName,
                token: loginData.token
            };
            var endpoint = backendUrl + '/unregister';
            sendPostRequest(endpoint, postData, callback);
        }

        function updateEvent(event, loginData, callback) {
            var postData = {
                eventJson: event,
                username: loginData.userName,
                token: loginData.token
            };
            var endpoint = backendUrl + '/updateEvent';
            sendPostRequest(endpoint, postData, callback);
        }

        function deleteEvent(id, loginData, callback) {
            var postData = {
                id: id,
                username: loginData.userName,
                token: loginData.token
            };
            console.dir(postData);
            var endpoint = backendUrl + '/deleteEvent';
            sendPostRequest(endpoint, postData, callback);
        }

        function getNewsItems() {
            return $resource(backendUrl + '/news', {}).query().$promise.then(function (data) {
                return data;
            });
        }

        function updateNewsItem(newsItem, loginData, callback) {
            var postData = {
                newsItemJson: newsItem,
                username: loginData.userName,
                token: loginData.token
            };
            var endpoint = backendUrl + '/updateNewsItem';
            sendPostRequest(endpoint, postData, callback);
        }

        function deleteNewsItem(id, loginData, callback) {
            var postData = {
                id: id,
                username: loginData.userName,
                token: loginData.token
            };
            console.dir(postData);
            var endpoint = backendUrl + '/deleteNewsItem';
            sendPostRequest(endpoint, postData, callback);
        }

        function sendPostRequest(endpoint, postData, callback) {
            $http.post(endpoint, postData)
                .success(function (data) {
                    console.log('DataSourceService: Posted to ' + endpoint + '\nResponse: ' + JSON.stringify(data));
                    callback(true);
                })
                .error(function (data) {
                    var message = 'Registration failed - the backend server did not respond as expected. (data:' + JSON.stringify(data) + ')';
                    console.warn(message);
                    callback(false);
                });
        }

        var service = {
            getEvents: getEvents,
            getEvent: getEvent,
            registerForEvent: registerForEvent,
            unregisterFromEvent: unregisterFromEvent,
            updateEvent: updateEvent,
            deleteEvent: deleteEvent,
            getNewsItems: getNewsItems,
            updateNewsItem: updateNewsItem,
            deleteNewsItem: deleteNewsItem,
        };
        return service;
    }
})();

