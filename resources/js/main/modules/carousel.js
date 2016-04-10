var carousel = {

	ui: {},

	left: 0,
	itemActive: 0,
	isAnimate: false,

	touch: {
	    start: 0,
	    move: 0,
	    delta: 0
	},

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
		this.ui.$close    = $('.js-page-transition');

		this.ui.$carousel = $('.js-carousel');
		this.ui.$slider   = this.ui.$carousel.find('.js-carousel-slider');
		this.ui.$items    = this.ui.$carousel.find('.js-carousel-item');
		this.ui.$next     = $('.js-carousel-next');
		this.ui.$prev     = $('.js-carousel-prev');

		this.ui.$progressCont = $('.js-progress-container');
		this.ui.$progress     = $('.js-progress');
	},

	bindEvents: function bindEvents() {
		this.ui.$win.on('load', $.proxy(this.setCarouselHeight, this));
		this.ui.$next.on('click', $.proxy(this.goNext, this));
		this.ui.$prev.on('click', $.proxy(this.goPrev, this));
		this.ui.$items.on('click', $.proxy(this.goClick, this));
		this.ui.$win.on('keydown', $.proxy(this.pressKeyboard, this));
		this.ui.$win.on('resize', $.proxy(this.checkMobileDesktop, this));

		// Touch events.
		this.ui.$win.on('touchstart', $.proxy(this.touchStart, this));
		this.ui.$win.on('touchmove', $.proxy(this.touchMove, this));
		this.ui.$win.on('touchend', $.proxy(this.touchEnd, this));
	},

	checkMobileDesktop: function checkMobileDesktop() {
		// Reset carousel.
		// this.itemActive = 0;
		this.left = 0;

		for (i=0; i < this.itemActive; i++) {
			this.left -= $(this.ui.$items[i]).outerWidth();
		}

		this.slideCarousel();
	},

	touchStart: function touchStart(e) {
		// Do nothing if carousel is animated.
		if (this.isAnimate) { return; }

	    // Update touch start and move position.
	    this.touch.start = e.originalEvent.touches[0].pageX;
	    this.touch.move = e.originalEvent.touches[0].pageX;
	},

	touchMove: function touchMove(e) {
	    // Update touch move position.
	    this.touch.move = e.originalEvent.touches[0].pageX;
	},

	touchEnd: function touchEnd() {	    
		var self = this;

	    // Return if user doesn't touch scroll really.
	    if (Math.abs(this.touch.move - this.touch.start) < 100) { return; }

	    // Click on prev or next btn.
	    if (this.touch.move < this.touch.start && this.touch.move != 0) {
	        this.ui.$next.click();
	    } else if (this.touch.move > this.touch.start && this.touch.move != 0) {
	        this.ui.$prev.click();
	    }	    
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

	    // If user press esc, close project.
	    if (e.keyCode == 27) {
	    	this.ui.$close.click();
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

		// Return if carousel if animated.
		if (this.isAnimate) { return; }

		// Get the target item.
		var $target = $(this.ui.$items[index]);

        // If target is already active, go next.
        if ($target.hasClass('is-active') && (index != this.ui.$items.length - 1)) {
            index = $(e.currentTarget).index() + 1;
            $target = $(this.ui.$items[index + 1]);
        }

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

        // Add is-active class on curren item.
        this.ui.$items.removeClass('is-active');
        $(this.ui.$items[this.itemActive]).addClass('is-active');

        // Set height on the slider.
        this.setCarouselHeight();

        // Update progress.
        this.updateProgress();

        // Check prev next.
        this.checkPrevNext();
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
    },

    updateProgress: function updateProgress() {
    	var self = this,
    		sliderW  = 0,
    		currentW = 0;

    	// Get total width for carousel.
    	$.each(this.ui.$items, function() {
    		sliderW += $(this).outerWidth();
    	});

    	// Get current width.
    	$.each(this.ui.$items, function() {
    		currentW += $(this).outerWidth();

    		// Return if we reach the item active.
    		if ($(this).index() == self.itemActive) { return false; }
    	});

    	// Calculate percentage for progress bar.
    	var perc = Math.round(currentW / sliderW * 100) + '%';

    	// Update progress bar width.
    	this.ui.$progress.css('width', perc);
    },

    checkPrevNext: function checkPrevNext() {
    	if (this.itemActive == 0) {
    		this.ui.$prev.addClass('is-fade');
    		this.ui.$next.removeClass('is-fade');
    	} else if (this.itemActive == this.ui.$items.length - 1) {
    		this.ui.$prev.removeClass('is-fade');
    		this.ui.$next.addClass('is-fade');
    	} else {
    		this.ui.$prev.removeClass('is-fade');
    		this.ui.$next.removeClass('is-fade');
    	}
    }
};

//Export module
module.exports = carousel;
