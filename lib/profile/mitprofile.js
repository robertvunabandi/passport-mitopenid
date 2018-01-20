'use strict';

/**
 * Parse the MIT profile.
 *
 * Parses user profiles as fetched from MIT OpenID Connect user
 * info endpoint.
 *
 * The amount of detail in the profile varies based on the scopes granted by the
 * user.  The following scope values add additional data:
 *
 *     `profile` - basic profile information
 *     `email` - email address
 *
 * References:
 *   - https://developers.google.com/identity/protocols/OpenIDConnect
 *
 * @param {Object|String} json
 * @return {Object}
 * @access public
 */
exports.parse = function parseMITProfileJson(json){
    const profile = {};
    if (typeof json === 'string') {
        json = JSON.parse(json);
    }
    // migrate all the nonempty keys into the profile object and
    // change 'sub' to 'id' for profile
    for (let key in json) {
        if (json.hasOwnProperty(key) && (key !== 'sub') && json[key]) {
            profile[key] = json[key];
        } else if (json.hasOwnProperty(key) && (key === 'sub')) {
            profile['id'] = json[key];
        }
    }
    return profile;
};