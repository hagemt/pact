module.exports = (function (pact) {

	'use strict';

	pact.defaults = require('./defaults');
	pact.Process = require('./process');

	return (this.pact = pact);

}).call(global, require('./pact'));
