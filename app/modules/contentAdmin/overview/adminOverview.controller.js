(function () {
    'use strict';

    angular
        .module('myCommunityApp.contentAdmin')
        .controller('AdminOverviewController', function ($scope, $state, DataSourceService) {

            $scope.deleteEvent = function (id) {
                var eventName = $scope.events.filter(function (elem) { return elem.id === id; })[0].title;
                BootstrapDialog.show({
                    title: 'Delete Event',
                    message: 'Are you sure you want to to delete the event "' + eventName + '"?',
                    type: BootstrapDialog.TYPE_DANGER,
                    size: BootstrapDialog.SIZE_NORMAL,
                    closable: true, // <-- Default value is false
                    draggable: true, // <-- Default value is false
                    buttons: [{
                        label: 'Cancel',
                        action: function (dialog) {
                            dialog.close();
                        }
                    }, {
                        icon: 'glyphicon glyphicon-trash',
                        label: 'Delete',
                        cssClass: 'btn-danger',
                        autospin: true,
                        action: function (dialog) {
                            DataSourceService.deleteEvent(id, $scope.loginData, function(success) {
                                if (success) $state.go('contentAdmin.overview', {}, { reload: true });
                                dialog.close();
                            });
                        }
                    }]
                });
            };

            $scope.deleteNewsItem = function (id) {
                var newsItemName = $scope.news.filter(function (elem) { return elem.id === id; })[0].title;
                BootstrapDialog.show({
                    title: 'Delete News Item',
                    message: 'Are you sure you want to delete the news item "' + newsItemName + '"?',
                    type: BootstrapDialog.TYPE_DANGER,
                    size: BootstrapDialog.SIZE_NORMAL,
                    closable: true, // <-- Default value is false
                    draggable: true, // <-- Default value is false
                    buttons: [{
                        label: 'Cancel',
                        action: function (dialog) {
                            dialog.close();
                        }
                    }, {
                        icon: 'glyphicon glyphicon-trash',
                        label: 'Delete',
                        cssClass: 'btn-danger',
                        autospin: true,
                        action: function (dialog) {
                            DataSourceService.deleteNewsItem(id, $scope.loginData, function(success) {
                                if (success) $state.go('contentAdmin.overview', {}, { reload: true });
                                dialog.close();
                            });
                        }
                    }]
                });

            };
        });
})();