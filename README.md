# passport-mitopenid

[Passport](http://www.passportjs.org/) Strategy for the [Massachusetts Institute of Technology (MIT) OpenID Connect](https://oidc.mit.edu/) with the AuthorizationCode grant type of the [OAuth 2.0 protocol](https://oauth.net/2/).

This module lets you authenticate using MIT OpenID Connect (**MOIDC**) in your Node.js applications. By plugging into Passport, [MOIDC](https://oidc.mit.edu) authentication can be easily and unobtrusively integrated into any application or framework that supports Connect-style middleware, including Express.

# Install
```
$ npm install passport-mitopenid
```
# Usage

### Create an Application

Before using `passport-mitopenid`, you must register an application with [MOIDC](https://oidc.mit.edu). If you have not already done so, a new project can be created via [MOIDC](https://oidc.mit.edu/about). Your application will be issued a client ID and client secret, which need to be provided to the strategy. You will also need to configure a redirect URI which matches the route in your application.

**NOTE:** If you are not [MIT](http://web.mit.edu/) affiliated, you will not be able to use this module because you will not be able to log in on [MOIDC](https://oidc.mit.edu). This module is solely intended for applications developed within and for the MIT community.

### Configure Strategy

The MOIDC Strategy authenticates using a Client application from [MOIDC](https://oidc.mit.edu) and OAuth 2.0 tokens. The generated `clientID` and `clientSecret` are to be supplied in the options of the strategy. Additionally, the strategy requires a `verify` callback which receives the parameters `accessToken`, optional `refreshToken`, `profile`, and function `done`from passport. The `verify` callback **must** call `done` with either an error (i.e. `done(err)`) or with providing the user to complete authentication (i.e. `done(null, user)`). Ideally, this `user` comes from client's database (which ideally is found with the `id` supplied under `profile.id`). For more details, see the [passport documentation](http://www.passportjs.org/docs/configure/).

Here's an example:

```javascript
const MITStrategy = require('passport-mitopenid').MITStrategy;

passport.use(new MITStrategy({
    clientID: MIT_CLIENT_ID,
    clientSecret: MIT_CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/mitopenidc/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ mitid: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));
```  

### Authenticate Requests

Use `passport.authenticate()`, specifying the `'mitopenid'` strategy, to authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/) application:
```javascript
app.get('/auth/mitopenid',
  passport.authenticate('mitopenidc'));

app.get('/auth/mitopenid/callback', 
  passport.authenticate('mitopenid', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
```

# Examples

Developers using the [Express](http://expressjs.com/) can refer to [this example guide](https://github.com/robertvunabandi/guide-on-mitopenid) to build their web applications.

# Contributing

### Tests

`this section is under development`

### Coverage

`this section is under development`

# Credits

This work was very much inspired from the [Google's passport strategy](https://github.com/jaredhanson/passport-google-oauth2) implementation thanks to the work of [jaredhanson](https://github.com/jaredhanson) on [Passport](http://www.passportjs.org/).

# License

[The MIT License](https://opensource.org/licenses/MIT)

Copyright (c) 2018 Robert M. Vunabandi <[https://github.com/robertvunabandi](https://github.com/robertvunabandi)>