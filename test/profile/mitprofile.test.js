/* global describe, it, expect */

"use strict";
const MITProfile = require('../../lib/profile/mitprofile');
const fs = require('fs');

describe('MITProfile.parse', function() {
    describe('profile with openid scope only', function() {
        let profile;

        before(function(done) {
            fs.readFile('test/fixtures/userinfo-bare.json', 'utf8', function(err, data) {
                if (err) { return done(err); }
                profile = MITProfile.parse(data);
                done();
            });
        });

        it('should parse profile', function() {
            expect(profile.id).to.equal('111111111111111111111');
            expect(profile.name).to.be.undefined;
            expect(profile.preferred_username).to.be.undefined;
            expect(profile.given_name).to.be.undefined;
            expect(profile.family_name).to.be.undefined;
            expect(profile.middle_name).to.be.undefined;
            expect(profile.email).to.be.undefined;
            expect(profile.email_verified).to.be.undefined;
        });
    });

    describe('profile with profile and openid scope only', function() {
        let profile;

        before(function(done) {
            fs.readFile('test/fixtures/userinfo-profile.json', 'utf8', function(err, data) {
                if (err) { return done(err); }
                profile = MITProfile.parse(data);
                done();
            });
        });

        it('should parse profile', function() {
            expect(profile.id).to.equal('111111111111111111111');
            expect(profile.name).to.equal('Example E Exemplary');
            expect(profile.preferred_username).to.equal('Example');
            expect(profile.given_name).to.equal('Example');
            expect(profile.family_name).to.equal('Exemplary');
            expect(profile.middle_name).to.equal('E');
            expect(profile.email).to.be.undefined;
            expect(profile.email_verified).to.be.undefined;
        });
    });

    describe('profile with email and openid scope only', function() {
        let profile;

        before(function(done) {
            fs.readFile('test/fixtures/userinfo-email.json', 'utf8', function(err, data) {
                if (err) { return done(err); }
                profile = MITProfile.parse(data);
                done();
            });
        });

        it('should parse profile', function() {
            expect(profile.id).to.equal('111111111111111111111');
            expect(profile.name).to.be.undefined;
            expect(profile.preferred_username).to.be.undefined;
            expect(profile.given_name).to.be.undefined;
            expect(profile.family_name).to.be.undefined;
            expect(profile.middle_name).to.be.undefined;
            expect(profile.email).to.equal('example@mit.edu');
            expect(profile.email_verified).to.equal(true);
        });
    });

    describe('profile with profile, email, and openid scope only', function() {
        let profile;

        before(function(done) {
            fs.readFile('test/fixtures/userinfo-profile-email.json', 'utf8', function(err, data) {
                if (err) { return done(err); }
                profile = MITProfile.parse(data);
                done();
            });
        });

        it('should parse profile', function() {
            expect(profile.id).to.equal('111111111111111111111');
            expect(profile.name).to.equal('Example E Exemplary');
            expect(profile.preferred_username).to.equal('Example');
            expect(profile.given_name).to.equal('Example');
            expect(profile.family_name).to.equal('Exemplary');
            expect(profile.middle_name).to.equal('E');
            expect(profile.email).to.equal('example@mit.edu');
            expect(profile.email_verified).to.equal(true);
        });
    });
});