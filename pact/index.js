(function (defaults, Process) {

	'use strict';

	var uniq = require('uniq');

	function compareProcesses (leftProcess, rightProcess) {
		return (rightProcess.PID - leftProcess.PID);
	}

	function filterProcesses (uniqueProcesses) {
		return uniqueProcesses.filter(function (thisProcess) {
			if (signalProcess.call(thisProcess)) return true;
		});
	}

	function signalProcess (signal) {
		try { return process.kill(Process.id(this), signal || 0); }
		catch (error) { return false; } // TODO (teh): log error?
	}

	function pactFunction () {
		if (arguments.length === 0) throw new Error('no PIDs provided');
		var allProcesses = Array.prototype.slice.call(arguments).map(Process);
		var pactProcesses = filterProcesses(uniq(allProcesses, compareProcesses));
		return pactProcesses.map(function (thisProcess) {
			thisProcess.once('end', signalProcess.bind(thisProcess, defaults.signal));
			// FIXME (teh): use waitpid instead of Interval:
			thisProcess.cancel = function () {
				if ('interval' in thisProcess) {
					clearInterval(thisProcess.interval);
					delete thisProcess.interval;
					delete thisProcess.cancel;
				}
			}
			thisProcess.interval = setInterval(function () {
				if (!signalProcess.call(thisProcess)) {
					pactProcesses.forEach(function (thatProcess) {
						thatProcess.cancel(); // clearInterval
						thatProcess.emit('end'); // process.kill
					});
				}
			}, defaults.poll.milliseconds);
			return thisProcess;
		});
	}

	pactFunction.defaults = defaults;
	pactFunction.Process = Process;
	module.exports = pactFunction;

}).call(this, require('./defaults'), require('./process'));
