token-based-auth-frontend
=========================

Token Based Authentication Frontend Project Written in AngularJS

## Configuration

nginx.conf

        location /uaa/ {
            proxy_pass  http://127.0.0.1:8081;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }

        location /web/ {
            rewrite ^/web/?(.*)$ /$1 break;  
            proxy_pass  http://127.0.0.1:8083;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }

```sh
token-based-auth-frontend$ cd app
token-based-auth-frontend/app$ python -m SimpleHTTPServer 8083
```

then start the standard spring OAuth2 server, listening on localhost:8081/uaa/auth/token and /uaa/auth/me

```java
        @RequestMapping("/me")
        public Principal me(Principal user) {
                return user;
        }
```

urls are configured in scripts/services.js, default client_id/secret is clientapp/123456 and user/password is roy/spring
