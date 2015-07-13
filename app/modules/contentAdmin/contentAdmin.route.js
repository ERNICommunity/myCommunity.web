(function () {
    'use strict';

    angular
        .module('myCommunityApp.contentAdmin')
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
        $stateProvider
            .state('contentAdmin', {
                url: '/contentAdmin',
                templateUrl: 'modules/contentAdmin/contentAdmin.tpl.html'
            });
    }

})();