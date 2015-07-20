var filters = {

	ui: {},

	init: function init() {
		this.bindUI();
		this.bindEvents();
	},

	bindUI: function bindUI() {
		this.ui.$header = $('.js-header');
		this.ui.$btn    = this.ui.$header.find('.js-header-filters-btn');
	},

	bindEvents: function bindEvents() {
		this.ui.$btn.on('click', $.proxy(this.toggleFilters, this));
	},

	toggleFilters: function toggleFilters() {
		this.ui.$header.toggleClass('is-open');
	}

};

module.exports = filters;