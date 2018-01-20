'use strict';
/* global describe, it, before, expect */
/* jshint expr: true */

const MITStrategy = require('../lib/strategy');
const chai = require('chai');

describe('MITStrategy', function() {
    // test construction: name
    describe('constructed', function() {
        const strategy = new MITStrategy({
            clientID: 'ABC123',
            clientSecret: 'secret'
        }, function() {});

        it('should be named mitopenid', function() {
            expect(strategy.name).to.equal('mitopenid');
        });
    });
    // test construction: expected error
    describe('constructed with undefined options', function() {
        it('should throw', function() {
            expect(function() {
                new MITStrategy(undefined, function(){});
            }).to.throw(Error);
        });
    });
    // TODO: Add more tests
});

