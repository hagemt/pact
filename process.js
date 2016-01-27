(function (defaults) {

	'use strict';

	var EventEmitter = require('events');

	function idProcess (that) {
		if (that instanceof Process) return that.PID;
		if (isNaN(that)) {
			throw new TypeError('expected PID:Number, not: ' + that);
		}
		var number = parseInt(that, 10);
		if (number !== parseFloat(that, 10)) {
			throw new TypeError('PID:Number not an integer: ' + that);
		}
		if (number < defaults.PID.min || number > defaults.PID.max) {
			throw new TypeError('PID:Number out of range: ' + that);
		}
		return number;
	}

	/*
	function inspectProcess () {
		var state = { visible: true };
		try { process.kill(this.PID, 0); }
		catch (error) { state = { error: error.code }; }
		var view = {}; view[this.PID] = state; //return view;
		return ['Process', JSON.stringify(view)].join(' ');
	}
	*/

	function Process (PID) {
		if (!(this instanceof Process)) {
			return new Process(PID);
		}
		this.PID = idProcess(PID);
		EventEmitter.call(this);
	}

	require('util').inherits(Process, EventEmitter);

	Process.id = idProcess;
	module.exports = Process;

}).call(this, require('./defaults'));
