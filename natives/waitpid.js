(function () {

	'use strict';

	var natives = require('./build/Release/pact_natives');

	module.exports = function waitpid (pid) {
		return natives.waitpid.call(natives, pid);
	};

}).call(this);
