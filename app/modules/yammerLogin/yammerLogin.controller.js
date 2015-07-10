(function () {
    'use strict';

    var module = angular.module('myCommunityApp.yammerLogin');
    module.controller('YammerLoginController', ['$scope', '$compile', 'YammerLoginData', YammerLoginController]);
    module.factory('YammerLoginData', function()
        {
            // 'YammerLoginData' is the data model, which can also be injected in other places.
            return {
                isLoggedIn : false,
                hasProblem : false,
                userName : null,
                mugShot : null,
                token : null,
            };
        });

    function YammerLoginController($scope, $compile, YammerLoginData) {

        // define view model
        $scope.loginData = YammerLoginData;
        $scope.login = tryLogIn;
        $scope.logout = tryLogOut;

        checkLoginStatus();

        // called when login button is clicked. prompt user to login and authorize your app, as necessary
        function tryLogIn() {
            console.log('YammerLogin: Login clicked, checking current session status.');
            yam.platform.getLoginStatus(function (statusResponse) {
                if (statusResponse) {
                    console.log('YammerLogin: Ok, no one logged in. Prompting user to do so..');
                    yam.platform.login(function (loginResponse) {
                        if (loginResponse.authResponse) {
                            console.log('YammerLogin: Login successful. Fetching user data.');
                            $scope.loginData.token = loginResponse.access_token.token;
                            fetchUserData(); // for some fucked up reason, we don't get the user json in THIS flow`s response.
                        }
                        else {
                            console.warn('YammerLogin: Login failed.');
                        }
                    });
                }
            });
        };

        // load user data through REST API, because the login response does not contain the user information.
        function fetchUserData()
        {
            yam.platform.request({
                url: 'users/current.json',
                method: 'GET',
                data: {},
                success: function (user) {
                    console.dir(user);
                    setCurrentUserInformation(user); // write to model
                },
                error: function (user) {
                    console.warn('YammerLogin: Failed to get user data.');
                    tryLogOut();
                }
            });
        }

        // called when logout button is clicked.
        function tryLogOut() {

            BootstrapDialog.show({
                title: 'Confirm Logout',
                message: 'You are about to log out. Are you sure?',
                type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
                size: BootstrapDialog.SIZE_SMALL,
                closable: true, // <-- Default value is false
                draggable: true, // <-- Default value is false
                buttonLabel: 'Roar! Why!', // <-- Default value is 'OK',
                buttons: [{
                    label: 'Cancel',
                    action: function(dialog){ dialog.close(); }
                },{
                    icon: 'glyphicon glyphicon-off',
                    label: 'Log out',
                    cssClass: 'btn-warning',
                    autospin: true,
                    action: function(dialog) { continueLogOut(); dialog.close(); }
                }]
            });

            function continueLogOut() {
                console.log('YammerLogin: Logout clicked, checking current session status.');
                yam.platform.getLoginStatus(function (response) {
                        if (response.authResponse) {
                            console.log('Yammer check login response received, ready to sign out : ' + response.authResponse + ' now calling logout on the API.');
                            yam.platform.logout(function (successful) {
                                console.log('Yammer logout response received. Success: ' + successful);
                                clearLoginData();
                            })
                        }
                        else {
                            console.warn('Yammer logout failed!')
                        }
                    }
                );
            }
        };

        // queries Yammer and asks whether the user is logged in.
        // NOTE: The 'platform.getLoginStatus' callback only gives us an object with a 'user' field
        // IF this is the FIRST API call of the session. After 'platform.login' is called, we won't get
        // that information anymore, and this method will crash trying to access it.
        function checkLoginStatus() {
            console.info('YammerLogin: Refreshing login status.');
            yam.platform.getLoginStatus(function (response) {
                console.log('YammerLogin: Login status received.');
                console.dir(response);
                if (response.authResponse) {
                    if (response.user) {
                        $scope.loginData.token = response.access_token.token;
                        setCurrentUserInformation(response.user);
                    }
                    else {
                        console.warn('YammerLogin: Logged in, but no user information.');
                    }
                }
                else clearLoginData();
            });
        }

        function setCurrentUserInformation(userJson) {
            console.log('YammerLogin: Logged in as ' + userJson.full_name);
            $scope.$apply(function () {
                $scope.loginData.isLoggedIn = true;
                $scope.loginData.userName = userJson.full_name;
                $scope.loginData.mugShot = userJson.mugshot_url;
            });
        }

        function clearLoginData() {
            console.log('YammerLogin: Not logged in.');
            $('#loggedInView').popover('hide'); // make sure logout button is hidden
            $scope.$apply(function () {
                $scope.loginData.isLoggedIn = false;
                $scope.loginData.userName = 'undefined';
                $scope.loginData.token = null;
            });
        }

        // set div 'logoutPopoverContent' as popover content of the 'loggedInView' span.
        $('#loggedInView').popover({
            html: true,
            content: function () {
                return $('#logoutPopoverContent').html();
            }
        })
            .click(function (ev) {
                //this is workaround needed in order to make ng-click work inside of popover
                $compile($('.popover.in').contents())($scope);
            }
        );
    }
})();