(function () {
    'use strict';

    angular
        .module('myCommunityApp.news')
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
        $stateProvider
            .state('news', {
                url: '/news',
                templateUrl: 'modules/news/news.tpl.html',
                controller: 'NewsController',
                controllerAs: 'news'
            });
    }

})();