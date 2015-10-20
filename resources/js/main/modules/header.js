var header = {

	ui: {},
	topPos: 0,

	init: function init() {
		this.bindUI();
		this.bindEvents();
	},

	bindUI: function bindUI() {
		this.ui.$win    = $(window);
		this.ui.$body   = $('body');
		this.ui.$header = $('.js-header-home');
		this.ui.$main   = $('.js-main');

		this.topPos = this.ui.$header.offset().top;
	},

	bindEvents: function bindEvents() {
		this.ui.$win.on('scroll', $.proxy(this.sticky, this));
	},

	sticky: function sticky() {
		var scrollTop = this.ui.$win.scrollTop();

		if (scrollTop >= this.topPos) {
			this.ui.$body.addClass('is-header-sticky');
		} else {
			this.ui.$body.removeClass('is-header-sticky');
		}
	}

};

// Export module.
module.exports = header;