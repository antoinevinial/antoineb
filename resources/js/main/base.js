//import modules
var oo       = require('../libs/oo.js');
var devGrid  = require('./modules/dev-grid.js');
var projects = require('./modules/projects.js');
var carousel = require('./modules/carousel.js');
var filters  = require('./modules/filters.js');
var pageTransition = require('./modules/page-transition.js');

(function ($, oo, win) {

	// Init grid module.
	if ($('.js-dev-grid').length) {
		devGrid.init();
	}

	// Init projects module.
    if ($('.js-projects').length) {
    	projects.init();
    }

    // Init carousel module.
    if ($('.js-carousel').length) {
    	carousel.init();
    }

    // Init page transition module.
    if ($('.js-page-transition').length) {
        pageTransition.init();
    }

    // Init filters module.
    if ($('.js-header-filters-btn').length) {
        filters.init();
    }

})(jQuery, oo, window);
