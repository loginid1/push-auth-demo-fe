# push-auth-demo-fe

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Setup Environment variables

`PORT`, `VUE_APP_PUSH_AUTH_ENDPOINT` and `VUE_APP_ADD_AUTH_ENDPOINT` could be whatever route you want, but you need to input whatever you set in this environment file into the [loginID dashboard](https://sandbox-usw1.api.loginid.io/) during the process to obtian your BASE URL and API KEY.

example
```
PORT=3000
VUE_APP_PUSH_AUTH_ENDPOINT=/push/authenticator
VUE_APP_ADD_AUTH_ENDPOINT=/add/authenticator
```

For a detailed guide on how to obtain your BASE URL and API KEY visit [docs](https://docs.loginid.io/websdks/dw#push-authentication)

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
