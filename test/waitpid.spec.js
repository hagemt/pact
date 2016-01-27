/* eslint-env mocha */
/* globals should */
var waitpid = require('../waitpid');

describe('waitpid', function () {

	'use strict';

	it('wraps native ::waitpid', function () {
		waitpid.bind(null).should.throw(Error);
	});

});
