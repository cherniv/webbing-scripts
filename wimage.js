// wimage ~/Downloads/image.jpg
// wimage ~/Downloads/image.jpg iomv

var shell = require('shelljs');
var apps = require('/Users/WebbingLabs/projects/scripts/apps.js');

const ROOT = '/Users/WebbingLabs/projects/';

var args = process.argv;

var imagePath = args[2];

if (!imagePath) {
	console.warn('ERROR. Image path is not set')
	return;
}

var goApp = (app) => {
	var path = ROOT + app.folder + '/images/';
	if (app.folder != 'webbing-library') {
		shell.cp(imagePath, path );
	}
}

var specificApp = args[3];
if (specificApp) {
	var app = apps.find(app => app.folder == specificApp)
	app && goApp(app);
} else {
	apps.forEach(goApp);
}