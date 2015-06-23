var carousel = {

	ui: {},
	left: 0,
	isAnimate: false,
	itemActive: 0,

	init: function init() {
		this.bindUI();
		this.bindEvents();
	},

	bindUI: function bindUI() {
		this.ui.$win      = $(window);
		this.ui.$carousel = $('.js-carousel');
		this.ui.$slider   = this.ui.$carousel.find('.js-carousel-slider');
		this.ui.$items    = this.ui.$carousel.find('.js-carousel-item');
		this.ui.$next     = this.ui.$carousel.find('.js-carousel-next');
		this.ui.$prev     = this.ui.$carousel.find('.js-carousel-prev');
	},

	bindEvents: function bindEvents() {
		this.ui.$next.on('click', $.proxy(this.goNext, this));
		this.ui.$prev.on('click', $.proxy(this.goPrev, this));
		this.ui.$win.on('keydown', $.proxy(this.pressKeyboard, this));
	},

	pressKeyboard: function pressKeyboard(e) {
	    // If user press the right arrow., click on next btn.
	    if (e.keyCode == 39) {
	        this.ui.$next.trigger('click');
	    }

	    // If user press the left arrow, click on prev btn.
	    if (e.keyCode == 37) {
	        this.ui.$prev.trigger('click');
	    }
	},

	goNext: function goNext() {
		// Check if we're not on the last item.
		if (this.itemActive < this.ui.$items.length - 1 && !this.isAnimate) {
			// Update itemActive variable.
			this.itemActive++;

			// Find the next item.
			var $target = $(this.ui.$items[this.itemActive]);

			// Get the width of the next item.
			var targetW = $target.outerWidth();

			// Update left variable.
			this.left -= targetW;

			// Translate carousel.
			this.slideCarousel();

			// Launch the is animated function.
            this.trackCSSAnimationEnd();
		}
	},

	goPrev: function goPrev() {
		// Check if we're not on the last item.
		if (this.itemActive > 0 && !this.isAnimate) {
			// Update itemActive variable.
			this.itemActive--;

			// Find the next item.
			var $target = $(this.ui.$items[this.itemActive]);

			// Get the width of the next item.
			var targetW = $target.outerWidth();

			// Update left variable.
			this.left += targetW;

			// Translate carousel.
			this.slideCarousel();

			// Launch the is animated function.
            this.trackCSSAnimationEnd();
		}
	},

	slideCarousel: function slideCarousel() {
		this.ui.$slider.css({
            "-webkit-transform":"translate(" + this.left + "px,0)",
            "-moz-transform":"translate(" + this.left + "px,0)",
            "-ms-transform":"translate(" + this.left + "px,0)",
            "-o-transform":"translate(" + this.left + "px,0)",
            "transform":"translate(" + this.left + "px,0)"
        });
	},

	trackCSSAnimationEnd: function trackCSSAnimationEnd() {
        var self = this;

        // Make the carousel animate.
        this.isAnimate = true;

        // Track when CSS3 animation ends.
        this.ui.$carousel.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {

            // Set the isAnimate variable to false.
            self.isAnimate = false;
        });
    }
};

//Export module
module.exports = carousel;