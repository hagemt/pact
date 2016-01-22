/* eslint-disable no-console */
(function (Process) {

	var uniq = require('uniq');

	function compareProcesses (leftProcess, rightProcess) {
		return (rightProcess.PID - leftProcess.PID);
	}

	function killProcess (signal) {
		//console.log(signal, 'signal to Process:', this);
		return process.kill(Process.id(this), signal);
	}

	function pingProcess (target) {
		//console.log('pinging Process:', target || this);
		try { return killProcess.call(target || this, 0); }
		catch (error) { return false; }
	}

	function waitProcess () {
		if (!pingProcess.call(this)) this.emit('end');
	}

	module.exports = function pactFunction () {
		if (arguments.length === 0) throw new Error('no PIDs provided');
		var pactProcesses = Array.prototype.slice.call(arguments).map(Process)
				.filter(function running (p) { return pingProcess.call(p); });
		return uniq(pactProcesses, compareProcesses).map(function (thisProcess) {
			thisProcess.on('signal', killProcess.bind(this)); // will forward arguments:
			thisProcess.once('end', thisProcess.emit.bind(thisProcess, 'signal', 'SIGTERM'));
			thisProcess.interval = setInterval(waitProcess.bind(thisProcess, 1000));
			thisProcess.cancel = clearInterval.bind(null, thisProcess.interval);
			return thisProcess;
		});
	};

}).call(this, require('./process'));
