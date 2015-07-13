(function () {
    'use strict';

    var module = angular.module('myCommunityApp.contentAdmin.navButton');
    module.controller('AdminNavButtonController', ['$scope', 'YammerLoginData', AdminNavButtonController ]);

    function AdminNavButtonController($scope, YammerLoginData) {
        $scope.loginData = YammerLoginData; // copy reference to access object, don't assign value
   }
})();