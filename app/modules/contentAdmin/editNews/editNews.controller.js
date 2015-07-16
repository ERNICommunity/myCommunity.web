(function () {
    'use strict';

    var module = angular.module('myCommunityApp.contentAdmin');
    module.controller('EditNewsController', function ($stateParams, $scope, $state, DataSourceService) {

        var newsItemId = $stateParams.id;
        $scope.isNewItem = newsItemId == '';

        if ($scope.isNewItem) {
            // create picture urls to populate dynamic field list in form
            $scope.newsItem = {
                author: $scope.loginData.userName,
                pictureurls: ['']
            };
        } else {
            var selectedNewsItem = $scope.news.filter(function (elem) {
                return elem.id === newsItemId;
            })[0];
            var newsItemCopy = jQuery.extend(true, {}, selectedNewsItem); // create a copy to allow undo.
            $scope.newsItem = newsItemCopy;
        }

        $scope.submit = function() {
            console.dir($scope.newsItem);
            DataSourceService.updateNewsItem($scope.newsItem, $scope.loginData, onSubmitted);
        }

        function onSubmitted(success) {
            if (success) $state.go('contentAdmin.overview', {}, { reload: true });
        }
    });
})();