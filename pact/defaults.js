(function () {

	'use strict';

	var defaults = { signal: 'SIGTERM' }; // process.kill
	defaults.poll = { milliseconds: 10 }; // setInterval
	defaults.PID = { min: (1 << 0), max: (1 << 15) };

	defaults.package = require('./package');
	module.exports = (function frozen (object) {
		if (!object || typeof object !== 'object') {
			return object; // primatives already "frozen"
		}
		Object.keys(object).forEach(function (key) {
			object[key] = frozen(object[key]);
		});
		return Object.freeze(object);
	})(defaults);

}).call(this);
