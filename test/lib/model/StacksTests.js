/*jslint node: true*/
/*global describe: true, it: true*/
"use strict";

var chai = require("chai"),
    expect = require("chai").expect;

var nconf = require('nconf');
nconf.argv().env().file({ file: 'config.json' });

var cf_api_url = nconf.get('CF_API_URL'),
    username = nconf.get('username'),
    password = nconf.get('password');

var CloudFoundry = require("../../../lib/model/CloudFoundry");
var CloudFoundryStacks = require("../../../lib/model/Stacks");
CloudFoundry = new CloudFoundry(cf_api_url);
CloudFoundryStacks = new CloudFoundryStacks(cf_api_url);

describe("Cloud foundry Stacks", function () {

    var token_endpoint = null;
    var token_type = null;
    var access_token = null;

    before(function () {
        this.timeout(5000);

        return CloudFoundry.getInfo().then(function (result) {
            token_endpoint = result.token_endpoint;
            return CloudFoundry.login(token_endpoint, username, password);
        }).then(function (result) {
            token_type = result.token_type;
            access_token = result.access_token;
        });

    });

    it("The platform returns Stacks installed", function () {
        this.timeout(3000);

        return CloudFoundryStacks.getStacks(token_type, access_token).then(function (result) {
            expect(result.total_results).is.a("number");
        });
    });

});