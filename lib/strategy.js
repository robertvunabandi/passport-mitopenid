'use strict';

/**
 * A lot of this code was inspired from Google's Passport Strategy implementation on:
 * https://github.com/jaredhanson/passport-google-oauth2/blob/master
 *
 * I also maintained the styling for all other passport implementations & documentations
 *
 * Below, OIDC stands for OpenID Connect
 */


// Load Modules
const OAuth2Strategy = require('passport-oauth2');
const util = require('util');
const MITProfile = require('./profile/mitprofile');
const InternalOAuthError = require('passport-oauth2').InternalOAuthError;
const MITApiError = require('./errors/mitapierror');
const UserInfoError = require('./errors/userinfoerror');

/**
 * `MITStrategy` constructor.
 *
 * The MIT authentication strategy authenticates requests by delegating to
 * MIT using the OAuth 2.0 protocol.
 *
 * Applications must supply a `verify` callback which accepts an `accessToken`,
 * `refreshToken` and service-specific `profile`, and then calls the `cb`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occurred, `err` should be set.
 *
 * Options:
 *   - `clientID`      your MIT OIDC application's App ID
 *   - `clientSecret`  your MIT OIDC application's App Secret
 *   - `callbackURL`   URL to which MIT OIDC will redirect the user after granting authorization
 *
 * Examples:
 *
 *     passport.use(new MITStrategy({
 *         clientID: '123-456-789',
 *         clientSecret: 'shhh-its-a-secret'
 *         callbackURL: 'https://www.example.net/auth/mitoidc/callback'
 *       },
 *       function(accessToken, refreshToken, profile, cb) {
 *         User.findOrCreate(..., function (err, user) {
 *           cb(err, user);
 *         });
 *       }
 *     ));
 *
 * @constructor
 * @param {Object} options
 * @param {Function} verify
 * @access public
 */
function MITStrategy (options, verify) {
    options = options || {};
    options.authorizationURL = options.authorizationURL || 'https://oidc.mit.edu/authorize';
    options.tokenURL = options.tokenURL || 'https://oidc.mit.edu/token';

    OAuth2Strategy.call(this, options, verify);
    this.name = 'mitopenid';
    this._userProfileURL = options.userProfileURL || 'https://oidc.mit.edu/userinfo';
}

// Inherit from `OAuth2Strategy`.
util.inherits(MITStrategy, OAuth2Strategy);

/**
 * Retrieve user profile from MIT OIDC
 *
 * This function constructs a normalized profile object. The properties vary
 * depending on the scopes chosen for your application on https://oidc.mit.edu/
 *
 * For example, the 'profile' scope gives the properties:
 *
 *   - `name`
 *   - `preferred_username`
 *   - `given_name`
 *   - `family_name`
 *   - `middle_name`
 *
 * The 'email' scope gives the properties `email` and `email_verified`
 * The 'openid' scope gives the property `id`
 *
 * As always, the `provider` property is always there and is always set to `mitopenid`
 *
 * @param {String} accessToken
 * @param {Function} done
 * @access protected
 */
MITStrategy.prototype.userProfile = function(accessToken, done) {
    const self = this;
    this._oauth2.get(this._userProfileURL, accessToken, function (err, body, res) {
        let json, profile;

        if (err) {
            if (err.data) {
                try {
                    json = JSON.parse(err.data);
                } catch (exception) {}
            }

            if (json && json.error && json.error.message) {
                return done(new MITApiError(json.error.message, json.error.code));
            } else if (json && json.error && json.error_description) {
                return done(new UserInfoError(json.error_description, json.error));
            }
            return done(new InternalOAuthError('Failed to fetch user profile', err));
        }

        try {
            json = JSON.parse(body);
        } catch (exception) {
            return done(new Error('Failed to parse user profile: ' + exception));
        }

        profile = MITProfile.parse(json);
        profile.provider  = 'mitopenid';
        profile._raw = body;
        profile._json = json;

        done(null, profile);
    });
};

/**
 * Return extra MIT-specific parameters to be included in the user
 * authorization request.
 *
 * @param {Object} options
 * @return {Object}
 * @access protected
 */


MITStrategy.prototype.userAuthorizationParams = function(options) {
    const params = {};

    for (let key in options) {
        if (options.hasOwnProperty(key)) {
            params[key] = options[key];
        }
    }
    return params;
};

/**
 * Expose `MITStrategy`
 */
module.exports = MITStrategy;