const chalk = require('chalk');
const ngrok = require('ngrok');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function runCommand(command) {
	const { stdout, stderr, error } = await exec(command);
	if(stderr){console.error('stderr:', stderr);}
	if(error){console.error('error:', error);}
	return stdout;
}


async function launchProxyBrowser() {
	// your code here building the command you wish to execute ...
	const command = 'browser-sync http://localhost:4200';
	const result = await runCommand(command);
	console.log("_result", result);
	// your code here processing the result ...
}

async function createTunnel(port, token) {
	// Start a Browsersync proxy
	launchProxyBrowser();
	console.log(chalk.green(`Started proxy from https://localhost:4200 to https://localhost:3000`));

	const hostfinal = await ngrok.connect({ authtoken: token, addr:`http://localhost:3000` })
	console.log(chalk.green(`Started tunnel from ${hostfinal} to https://localhost:3000`));

	return hostfinal;
}

module.exports = { createTunnel };
