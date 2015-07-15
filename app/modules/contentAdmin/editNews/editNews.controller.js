(function () {
    'use strict';

    var module = angular.module('myCommunityApp.contentAdmin');
    module.controller('EditNewsController', function ($stateParams, $scope) {

        var newsItemToBeEdited = $scope.news.filter(function (elem) {
            return elem.id === $stateParams.id;
        })[0];

        console.dir(newsItemToBeEdited);

        // create a copy to allow undo.
        var newsItemCopy = jQuery.extend(true, {}, newsItemToBeEdited);
        $scope.newsItem = newsItemCopy;

        $scope.isLastPictureUrl = function(index) {
            return index == $scope.newsItem.pictureurls.length - 1;
        }
    });
})();