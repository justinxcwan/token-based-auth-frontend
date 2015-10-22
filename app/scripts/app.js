'use strict';

angular.module('angularRestfulAuth', [
    'ngStorage',
    'ngRoute',
    'flow'
])
.config(['$routeProvider', '$httpProvider', 'flowFactoryProvider', 
    function ($routeProvider, $httpProvider, flowFactoryProvider) {
    
    flowFactoryProvider.defaults = {
        target: '/upload',
        permanentErrors: [404, 500, 501],
        maxChunkRetries: 1,
        chunkRetryInterval: 5000,
        simultaneousUploads: 1,
        chunkSize: 64 * 1024,
    };

    flowFactoryProvider.on('catchAll', function (event) {
        console.log('catchAll', arguments);
    });

    $routeProvider.
        when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        }).
        when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'HomeCtrl'
        }).
        when('/signup', {
            templateUrl: 'partials/signup.html',
            controller: 'HomeCtrl'
        }).
        when('/me', {
            templateUrl: 'partials/me.html',
            controller: 'MeCtrl'
        }).
        when('/upload', {
            templateUrl: 'partials/upload.html',
            controller: 'UploadCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });

    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token && $localStorage.access_token) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.token.access_token;
                    }
                    return config;
                },
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                        $location.path('/login');
                    }
                    return $q.reject(response);
                }
            };
        }]);

    }
]);