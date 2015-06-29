(function () {
    'use strict';

    angular
        .module('myCommunityApp.news')
        .controller('NewsController', NewsController);

    function NewsController(newsItems) {
        this.newsItems = newsItems;
    }

})();