/**
 * A lot of this code was inspired from Google's Passport Strategy implementation on:
 * https://github.com/jaredhanson/passport-google-oauth2/blob/master
 *
 * I also maintained the styling for all other passport implementations & documentations
 */

/**
 * expose the strategy as `MITStrategy`
 */

// Load modules.
const MITStrategy = require('./strategy');

// Expose Strategy.
exports = module.exports = MITStrategy;

// Exports.
exports.MITStrategy = MITStrategy;