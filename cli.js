var cli = (function (pact) {

	this._name = pact.defaults.package.name;
	this.version(pact.defaults.package.version);

	this.action(function () {
		pact.apply(this, process.argv.slice(2));
	});

	return this;

}).call(require('commander'), require('.'));

if (require.main === module) {
	if (process.argv.length < 3) {
		cli.outputHelp();
	} else {
		cli.parse(process.argv);
	}
} else {
	module.exports = cli;
}
