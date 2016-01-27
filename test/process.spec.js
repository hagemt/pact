/* eslint-env mocha */
var Process = require('../process');

describe('Process', function () {

	before(function () {
		Process.should.be.a.Function().of.length(1);
	});

	var EventEmitter = require('events').EventEmitter;

	it('instantiates an EventEmitter', function () {
		new Process(1).should.be.instanceof(EventEmitter);
	});

	it('wraps a PID:Number', function () {
		new Process(1).should.have.property('PID', 1);
	});

	describe('id:Function (static)', function () {

		before(function () {
			Process.id.should.be.a.Function().of.length(1);
		});

		it('validates a PID:Number', function () {
			Process.id(1).should.equal(1);
			Process.id('1').should.equal(1);
		});

		it('extracts PID:Number from a Process', function () {
			Process.id(new Process(1)).should.equal(1);
		});

		it('throws if provided any NaNumber-able', function () {
			Process.id.bind(null).should.throw(Error);
		});

	});

});
