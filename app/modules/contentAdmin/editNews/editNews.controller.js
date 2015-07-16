(function () {
    'use strict';

    var module = angular.module('myCommunityApp.contentAdmin');
    module.controller('EditNewsController', function ($stateParams, $scope) {

        var newsItemId = $stateParams.id;
        $scope.isNewItem = newsItemId == 'new';

        if ($scope.isNewItem) {
            // create picture urls to populate dynamic field list in form
            $scope.newsItem = { pictureurls: [ '' ] }
        } else {
            var selectedNewsItem = $scope.news.filter(function (elem) { return elem.id === newsItemId; })[0];
            var newsItemCopy = jQuery.extend(true, {}, selectedNewsItem); // create a copy to allow undo.
            $scope.newsItem = newsItemCopy;
    }

        $scope.isLastPictureUrl = function (index) {
            return index == $scope.newsItem.pictureurls.length - 1;
        }
    });
})();