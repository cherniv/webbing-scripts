var shell = require('shelljs');
var apps = require('/Users/WebbingLabs/projects/scripts/apps.js');

const ROOT = '/Users/WebbingLabs/projects/';

const SAVE = '--save';
const SAVE_DEV = '--save-dev';
const RNPM_LINK = '--link'

var args = process.argv;

var mainCommand = args[2];

if (mainCommand == 'install' || mainCommand == 'i' || mainCommand == 'uninstall') {} 
else {
	console.warn('ERROR. Command is not set, try install/uninstall')
	return;
}

var packageName;

for (var i = 3; i < args.length; i ++) {
	if (args[i].indexOf('--') != 0) {
		packageName = args[i];
	}
}

if (!packageName ) {
	console.warn('ERROR. Package name is not set')
	return;
}

var isSave = args.indexOf(SAVE) >= 0;
var isSaveDev = args.indexOf(SAVE_DEV) >= 0;
var saveType = (isSave && SAVE) || (isSaveDev && SAVE_DEV) || '';

var npmCommandToRun = 'npm ' + mainCommand + ' ' + packageName + ' ' + saveType;

var shouldLink = args.indexOf(RNPM_LINK) >= 0;
var rnpmCommandToRun = (shouldLink && (mainCommand == 'install' || mainCommand == 'i') && "rnpm link " + packageName) 
					|| (mainCommand == 'uninstall' && "rnpm unlink " + packageName)
					|| null;

var pwd = shell.pwd().stdout; // need to remember if linking with rnpm needed

apps.forEach(app => {
	var path = ROOT + app.folder;
	if (!rnpmCommandToRun) {
		try {
			shell.exec(npmCommandToRun + ' --prefix ' + path);
		} catch (e) {
			console.warn('ERROR. Npm failed to execute: ', e)
		}
	} else {
		// rnpm can not link/unlink in distant folder (with --prefix) so need to 'cd'
		shell.cd(path);
		try {
			shell.exec(npmCommandToRun);
		} catch (e) {
			console.warn('ERROR. Npm failed to execute: ', e)
		}
		rnpmCommandToRun && shell.exec(rnpmCommandToRun);
	}
})

rnpmCommandToRun && shell.cd(pwd);
