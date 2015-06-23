var pageTransition = {

	ui: {},

	init: function init() {
		this.bindUI();
		this.pageLoad();
		this.bindEvents();
	}, 

	bindUI: function bindUI() {
		this.ui.$header = $('.js-header');
		this.ui.$main   = $('.js-main');
		this.ui.$link   = $('.js-page-transition');
	},

	bindEvents: function bindEvents() {
		this.ui.$link.on('click', $.proxy(this.fadePage, this));
	},


	pageLoad: function pageLoad() {
		this.ui.$header.removeClass('is-fade');
		this.ui.$main.removeClass('is-fade');
	},

	fadePage: function fadePage(e) {
		// Prevent default;
		e.preventDefault();

		// Save URL.
		var url = $(e.currentTarget).attr('href');

		// Fade out main.
		this.ui.$main.addClass('is-fade');

		// Fade out header.
		this.ui.$header.addClass('is-fade');

		// Go to the URL.
		setTimeout(function() {
			window.location = url;
		}, 250);
	}
};

module.exports = pageTransition;