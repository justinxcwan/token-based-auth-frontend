'use strict';

angular.module('angularRestfulAuth', [
    'ngRoute',
    'flow',
    'angular-oauth2'
])
.config(['$routeProvider', '$httpProvider', 'flowFactoryProvider', 'OAuthProvider',
    function ($routeProvider, $httpProvider, flowFactoryProvider, OAuthProvider) {
    
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

    OAuthProvider.configure({
      baseUrl: 'http://localhost/uaa/',
      clientId: 'clientapp',
      clientSecret: '123456', // optional
      options: {
        secure: false
      }
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

    // $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
    //         return {
    //             'request': function (config) {
    //                 config.headers = config.headers || {};
    //                 if ($localStorage.token && $localStorage.access_token) {
    //                     config.headers.Authorization = 'Bearer ' + $localStorage.token.access_token;
    //                 }
    //                 return config;
    //             },
    //             'responseError': function(response) {
    //                 if(response.status === 401 || response.status === 403) {
    //                     $location.path('/login');
    //                 }
    //                 return $q.reject(response);
    //             }
    //         };
    //     }]);

    }
])
.run(['$rootScope', '$window', '$location', 'OAuth', function($rootScope, $window, $location, OAuth) {
    $rootScope.$on('oauth:error', function(event, rejection) {
      // Ignore `invalid_grant` error - should be catched on `LoginController`.
      if ('invalid_grant' === rejection.data.error) {
        return;
      }

      // Refresh token when a `invalid_token` error occurs.
      if ('invalid_token' === rejection.data.error) {
        return OAuth.getRefreshToken();
      }

      $location.path('/login');
      // Redirect to `/login` with the `error_reason`.
      // return $window.location.href = '/login?error_reason=' + rejection.data.error;
    });
  }]);