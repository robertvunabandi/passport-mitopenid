/* global describe, it, expect */

const strategy = require('..');

describe('passport-mitopenid', function() {
    it('should export Strategy constructor', function() {
        expect(strategy.MITStrategy).to.be.a('function');
    });

    it('should export Strategy constructor as module', function() {
        expect(strategy).to.be.a('function');
        expect(strategy).to.equal(strategy.MITStrategy);
    });

});