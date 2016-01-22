(function (defaults) {

	var EventEmitter = require('events');

	function Process (PID) {
		if (!(this instanceof Process)) {
			return new Process(PID);
		}
		this.PID = Process.id(PID);
		EventEmitter.call(this);
	}

	Process.id = function idProcess (that) {
		if (that instanceof Process) return that.PID;
		if (isNaN(that)) {
			throw new TypeError('expected PID:Number, not: ' + that);
		}
		if (parseInt(that) !== parseFloat(that)) {
			throw new TypeError('PID:Number not an integer: ' + that);
		}
		var PID = Number(that).toFixed(0);
		if (PID < defaults.PID.min || PID > defaults.PID.max) {
			throw new TypeError('PID:Number out of range: ' + that);
		}
		return PID;
	};

	require('util').inherits(Process, EventEmitter);
	module.exports = Process;

}).call(this, require('./defaults'));
