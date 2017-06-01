/**
 * Created by YoYo on 5/31/17.
 */
(function () {
    'use strict';

    angular
        .module('app',['ui.router','ngRoute'])
        .config(config)
        .run(run);
//     .config(['$routeProvider', function($routeProvider) {
//               $routeProvider.when('/message', {
//                   templateUrl: 'message/index.html',
//                controller: 'Message.IndexController'
//              });
// //
//         $routeProvider.when('/newview', {
//             templateUrl: 'message/newview.html',
//             controller: 'DetailsCtrl'
//         });
//     }]);
    function config($stateProvider, $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/index.html',
                controller: 'Home.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'home' }
            })
            .state('account', {
                url: '/account',
                templateUrl: 'account/index.html',
                controller: 'Account.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'account' }
            })
            .state('campaigns', {
                url: '/campaigns',
                templateUrl: 'campaigns/index.html',
                controller: 'Campaigns.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'campaigns' }
            })
            .state('newview',{
                url:'/newview',
                templateUrl:'campaigns/newview.html',
                controller:'DetailsCtrl',
                controllerAs: 'vm',
                data:{activeTab:'newview'
                }

            })
            .state('addcampaign',{
                url:'/addcampaign',
                templateUrl:'campaigns/addcampaign.html',
                controller:'SendCtrl',
                controllerAs: 'vm',
                data:{activeTab:'addcampaign'
                }

            });



    }

    function run($http, $rootScope, $window) {
        // add JWT token as default auth header
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;

        // update active tab on state change
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.activeTab = toState.data.activeTab;
        });
    }

    // manually bootstrap angular after the JWT token is retrieved from the server
    $(function () {
        // get JWT token from server
        $.get('/app/token', function (token) {
            window.jwtToken = token;

            angular.bootstrap(document, ['app']);
        });
    });
})();