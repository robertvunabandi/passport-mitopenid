'use strict';
/**
 * `UserInfoError` error.
 *
 * from:
 * - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
 * - https://github.com/jaredhanson/passport-google-oauth2/blob/master/lib/errors/userinfoerror.js
 *
 * TODO: fix specs
 * @constructor
 * @param {string} [message]
 * @param {string} [code]
 * @access public
 */

class UserInfoError extends Error {
    constructor(message, code) {
        super(message, code);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, UserInfoError);
        }

        this.name = 'UserInfoError';
        this.message = message;
        this.code = code;
        this.date = new Date();
    }
}

module.exports = UserInfoError;