(function () {
    'use strict';

    angular
        .module('myCommunityApp')
        .config(config);

    config.$inject = ['$urlRouterProvider'];

    function config($urlRouterProvider) {
        $urlRouterProvider.otherwise('calendar');
    }

})();