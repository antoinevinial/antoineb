var carousel = {

	ui: {},

	left: 0,
	itemActive: 0,
	isAnimate: false,

	init: function init() {
		this.bindUI();
		this.bindEvents();
		this.checkMobileDesktop();
		this.setCarouselHeight();
		this.slideCarousel();
	},

	bindUI: function bindUI() {
		this.ui.$win      = $(window);
		this.ui.$body     = $('body');
		this.ui.$header   = $('.js-header');
		this.ui.$main     = $('.js-main');
		this.ui.$carousel = $('.js-carousel');
		this.ui.$slider   = this.ui.$carousel.find('.js-carousel-slider');
		this.ui.$items    = this.ui.$carousel.find('.js-carousel-item');
		this.ui.$next     = $('.js-carousel-next');
		this.ui.$prev     = $('.js-carousel-prev');
	},

	bindEvents: function bindEvents() {
		this.ui.$win.on('load', $.proxy(this.setCarouselHeight, this));
		this.ui.$next.on('click', $.proxy(this.goNext, this));
		this.ui.$prev.on('click', $.proxy(this.goPrev, this));
		this.ui.$items.on('click', $.proxy(this.goClick, this));
		this.ui.$win.on('keydown', $.proxy(this.pressKeyboard, this));
		this.ui.$win.on('resize', $.proxy(this.checkMobileDesktop, this));
	},

	checkMobileDesktop: function checkMobileDesktop() {
		// Check if we're on mobile.
		if (this.ui.$win.outerWidth() <= 480) {
			this.ui.$items.outerWidth(this.ui.$win.outerWidth());
		} else {
			this.ui.$items.outerWidth('auto');
		}

		// Reset carousel.
		this.itemActive = 0;
		this.left = 0;
		this.slideCarousel();
	},

	setCarouselHeight: function setCarouselHeight() {
		// Set a min-height on the slider.
		this.ui.$main.css('height', $(this.ui.$items[this.itemActive]).outerHeight());		
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
		if (this.itemActive < this.ui.$items.length - 1) {
			// Find the next item.
			var $target = $(this.ui.$items[this.itemActive]);

			// Get the width of the next item.
			var targetW = $target.outerWidth();

			// Update left variable.
			this.left -= targetW;

			// Launch the is animated function.
            this.trackCSSAnimationEnd();

        	// Update itemActive variable.
			this.itemActive++;

			// Translate carousel.
			this.slideCarousel();
		}
	},

	goPrev: function goPrev() {
		// Check if we're not on the last item.
		if (this.itemActive > 0) {
			// Find the next item.
			var $target = $(this.ui.$items[this.itemActive - 1]);

			// Get the width of the next item.
			var targetW = $target.outerWidth();

			// Update left variable.
			this.left += targetW;

			// Launch the is animated function.
            this.trackCSSAnimationEnd();

            // Update itemActive variable.
			this.itemActive--;

			// Translate carousel.
			this.slideCarousel();
		}
	},

	goClick: function goClick(e) {
		var index = $(e.currentTarget).index();

		// Get the target item.
		var $target = $(this.ui.$items[index]);

		// Reset left position.
		this.left = 0;

		// Loop through each list item to get the left position.
		for (i=0; i < index; i++) {
			this.left -= $(this.ui.$items[i]).outerWidth();
		}

		// Launch the is animated function.
        this.trackCSSAnimationEnd();

        // Update itemActive variable.
		this.itemActive = index;

		// Translate carousel.
		this.slideCarousel();
	},

	slideCarousel: function slideCarousel() {
		// Slide the carousel.
		this.ui.$slider.css({
            "-webkit-transform":"translate(" + this.left + "px,0)",
            "-moz-transform":"translate(" + this.left + "px,0)",
            "-ms-transform":"translate(" + this.left + "px,0)",
            "-o-transform":"translate(" + this.left + "px,0)",
            "transform":"translate(" + this.left + "px,0)"
        });

        // Set height on the slider.
        this.setCarouselHeight();
	},

	trackCSSAnimationEnd: function trackCSSAnimationEnd() {
        var self = this;

        // Make the carousel animate.
        this.isAnimate = true;

        // Track when CSS3 animation ends.
        this.ui.$carousel.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
            // Set the isAnimate variable to false.
            self.isAnimate = false;
        });
    }
};

//Export module
module.exports = carousel;
