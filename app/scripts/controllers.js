'use strict';

/* Controllers */

angular.module('angularRestfulAuth')
    .controller('HomeCtrl', ['$rootScope', '$scope', '$location', 'Main', 'OAuth', 
        function($rootScope, $scope, $location, Main, OAuth) {
        $scope.OAuth = OAuth;

        $scope.login = function() {
            var formData = {
                username: $scope.username,
                password: $scope.password
            }

            Main.login(formData, function(res) {
                if (res.access_token === undefined) {
                    alert(res)    
                } else {
                    window.location = "/web";
                }
            }, function() {
                $rootScope.error = 'Failed to log in';
            })
        };

        $scope.signup = function() {
            var formData = {
                email: $scope.email,
                username: $scope.username,
                password: $scope.password
            }

            Main.signup(formData, function(res) {
                if (res.type == false) {
                    alert(res.data)
                } else {
                   
                    window.location = "/web/login"    
                }
            }, function() {
                $rootScope.error = 'Failed to signup';
            })
        };

        $scope.me = function() {
            Main.me(function(res) {
                $scope.myDetails = res;
            }, function() {
                $rootScope.error = 'Failed to fetch details';
            })
        };

        $scope.logout = function() {
            Main.logout(function() {
                window.location = "/web"
            }, function() {
                alert("Failed to logout!");
            });
        };
        
    }])
  .controller('MeCtrl', ['$rootScope', '$scope', '$location', 'Main', function($rootScope, $scope, $location, Main) {
        Main.me(function(res) {
            $scope.myDetails = res;
        }, function() {
            $rootScope.error = 'Failed to fetch details';
        })
  }])
  .controller('UploadCtrl', ['$rootScope', '$scope', '$location', 'Main', function($rootScope, $scope, $location, Main) {

  }])
;
