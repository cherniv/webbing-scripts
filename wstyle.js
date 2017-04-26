var shell = require('shelljs');
var apps = require('/Users/WebbingLabs/projects/scripts/apps.js');

const ROOT = '/Users/WebbingLabs/projects/';

var args = process.argv;

//var pwd = shell.pwd().stdout;

var appStyleName = args[2];


if (!appStyleName) {
	console.warn('ERROR. Style name is not set')
	return;
}

var goApp = (app) => {
	var path = ROOT + app.folder + '/js/app-styles/' + appStyleName + '.js'
	//shell.cd(path);
	if (app.folder != 'webbing-library') {
		shell.echo("export default require('styles/" + appStyleName + "');").to(path);
	}
}

var specificApp = args[3];
if (specificApp) {
	var app = apps.find(app => app.folder == specificApp)
	app && goApp(app);
} else {
	apps.forEach(goApp);
}

//shell.cd(pwd);