'use strict';

angular.module('angularRestfulAuth')
    .factory('Main', ['$http', 'OAuth', function($http, OAuth){
         var getUrl = window.location;
         var baseUrl = getUrl.protocol + "//" + getUrl.host;
        function changeUser(user) {
            angular.extend(currentUser, user);
        }

        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output);
        }

        function getUserFromToken() {
            
            var user = {};
            // if (typeof token !== 'undefined') {
            //     var encoded = token.split('.')[1];
            //     user = JSON.parse(urlBase64Decode(encoded));
            // }
            return user;
        }

        function base64Encode(input) {
            return btoa(unescape(encodeURIComponent(input)));
        }
            
        var currentUser = getUserFromToken();

        return {
            signup: function(data, success, error) {
                $http.post(baseUrl + '/signup', data).success(success).error(error)
            },
            login: function(data, success, error) {
                // data.client_id = 'clientapp';
                // data.client_secret = '123456'; 
                // data.grant_type = 'password';
                // data.scope = 'read write';

                // var encoded = base64Encode(data.client_id + ':' + data.client_secret);

                // var options = angular.extend({
                //                 headers: {
                //                     "Authorization": 'Basic ' + encoded,
                //                     "Content-Type": "application/x-www-form-urlencoded"
                //                 }
                //             }, {});

                // $http({
                //     method: 'POST',
                //     url: baseUrl + '/uaa/oauth/token',
                //     headers: options.headers,
                //     transformRequest: function(obj) {
                //         var str = [];
                //         for(var p in obj)
                //             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                //         return str.join("&");
                //     },
                //     data: data
                // }).success(success).error(error);
                OAuth.getAccessToken(data, {}, success, error);
                // .success(success).error(error);
            },
            me: function(success, error) {
                $http.get(baseUrl + '/uaa/me').success(success).error(error)
            },
            logout: function(success, error) {
                changeUser({});
                
                OAuth.revokeToken();
                // .success(success).error(error);
            }
        };
    }
]);
