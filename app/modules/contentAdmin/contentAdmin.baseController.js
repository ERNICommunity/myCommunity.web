(function () {
    'use strict';

    // Controller for the empty ui-view (declared in route.js):
    // Sets up the parent-scope with things that are used globally in the admin-content views
    angular.module('myCommunityApp.contentAdmin')
        .controller('ContentAdminBaseController', ContentAdminBaseController);

    var usersThatCanSeeAllEvents = [
        "Fabian Schneiter",
        "Jazz Kang",
        "Daniela Moser"];

    function ContentAdminBaseController($scope, $state, $filter, YammerLoginData, events, news) {

        $scope.loginData = YammerLoginData;

        console.dir(YammerLoginData);

        // add news and events available to all child scopes (edit forms etc.)
        if (userCanSeeAllItems(YammerLoginData)) {
            $scope.events = events;
            $scope.news = news;
        }
        else {
            $scope.events = $filter('filter')(events, {organiser: YammerLoginData.userName}, true);
            $scope.news = $filter('filter')(news, {author: YammerLoginData.userName}, true);
        }

        if (!YammerLoginData.isLoggedIn) {
            $state.go('calendar.list');
        }

        // make sure we move away from our pages on logout
        $scope.$on('YammerUserLogout', onUserLogout)
        function onUserLogout() {
            console.info('ContentAdminController: onUserLogout, navigate away from admin page.')
            if ($state.includes('contentAdmin')) {
                $state.go('calendar.list');
            }
        }
    };

    function userCanSeeAllItems(loginData) {
        return (usersThatCanSeeAllEvents.indexOf(loginData.userName) > -1);
    };

})();