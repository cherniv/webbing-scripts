var shell = require('shelljs');
var apps = require('/Users/WebbingLabs/projects/scripts/apps.js');

const ROOT = '/Users/WebbingLabs/projects/';

var args = process.argv;

var pwd = shell.pwd().stdout;

var goApp = (app) => {
	var path = ROOT + app.folder;
	shell.cd(path);
	if (app.folder != 'webbing-library') {
		shell.exec('webpack --production');
	}
}

var specificApp = args[2];
if (specificApp) {
	var app = apps.find(app => app.folder == specificApp)
	app && goApp(app);
} else {
	apps.forEach(goApp);
}

shell.cd(pwd);