var filters = {

	ui: {},

	init: function init() {
		this.bindUI();
		this.bindEvents();
	},

	bindUI: function bindUI() {
		this.ui.$header = $('.js-header');	
		this.ui.$btn    = this.ui.$header.find('.js-header-filters-btn');
		this.ui.$close  = this.ui.$header.find('.js-header-close');
	},

	bindEvents: function bindEvents() {
		this.ui.$btn.on('click', $.proxy(this.toggleFilters, this));
		this.ui.$close.on('click', $.proxy(this.toggleFilters, this));
	},

	toggleFilters: function toggleFilters(e) {
		// Prevent default.
		e.preventDefault();

		// Toggle class on header.
		this.ui.$header.toggleClass('is-open');
	}

};

module.exports = filters;