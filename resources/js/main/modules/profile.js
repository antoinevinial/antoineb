var profile = {

	ui: {},

	init: function init() {
		this.bindUI();
		this.bindEvents();
	},

	bindUI: function bindUI() {
		this.ui.$body    = $('body');
		this.ui.$profile = $('.js-profile');
		this.ui.$toggle  = $('.js-profile-toggle');
	},

	bindEvents: function bindEvents() {
		this.ui.$toggle.on('click', $.proxy(this.toggleProfile, this));
	},

	toggleProfile: function toggleProfile(e) {
		// Prevent default.
		e.preventDefault();

		// Show/hide profile layer.
		this.ui.$profile.toggleClass('is-hidden');

		// Disable scroll for body.
		this.ui.$body.toggleClass('no-scroll');
	}

};

//Export module
module.exports = profile;