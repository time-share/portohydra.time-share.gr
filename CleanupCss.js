var walk = require('walk');
var uncss= require('uncss');
var fs = require('fs');


var files   = [];

// Get all html files and add them as http urls 
var walker  = walk.walk('./_site', { followLinks: false });
walker.on('file', function(root, stat, next) {
	if (stat.name.match('.html')) {
		// Add this file to the list of files
		files.push(root.replace('./_site','http://localhost:4000').replace(/\\/g,'/') + '/' + stat.name);
	}
    next();
});
// Process them with uncss to remove extra styles
walker.on('end', function() {
    uncss(files, { stylesheets: ['css/style.css'] }, function (error, output) {
		fs.writeFile("style.css",output);
	});
});