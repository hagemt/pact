/* eslint-env mocha */
describe('waitpid', function () {

	'use strict';

	var waitpid; before(function () {
		//waitpid = require('../natives/waitpid');
	});

	it.skip('wraps native ::waitpid', function () {
		waitpid.bind(null).should.throw(Error);
	});

});
