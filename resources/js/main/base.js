//import modules
var oo       = require('../libs/oo.js');
var devGrid  = require('./modules/dev-grid.js');
var projects = require('./modules/projects.js');

(function ($, oo, win) {

	// Init grid module.
	if ($('.js-dev-grid').length) {
		devGrid.init();
	}

	// Init projects module.
    if ($('.js-projects').length) {
    	projects.init();
    }

})(jQuery, oo, window);
