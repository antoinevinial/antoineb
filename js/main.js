(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//import modules
var oo       = require('../libs/oo.js');
var devGrid  = require('./modules/dev-grid.js');
var projects = require('./modules/projects.js');
var carousel = require('./modules/carousel.js');
var filters  = require('./modules/filters.js');
var pageTransition = require('./modules/page-transition.js');
var header   = require('./modules/header.js');

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
    if ($('.js-main').length) {
        pageTransition.init();
    }

    // Init filters module.
    if ($('.js-header-filters-btn').length) {
        filters.init();
    }

    // Init header module.
    if($('.js-header-home').length) {
        header.init();
    }

})(jQuery, oo, window);

},{"../libs/oo.js":2,"./modules/carousel.js":3,"./modules/dev-grid.js":4,"./modules/filters.js":5,"./modules/header.js":6,"./modules/page-transition.js":7,"./modules/projects.js":8}],2:[function(require,module,exports){
/*
* Declaration of the global namespace oo
*  with 3 defaults namespace : utils, modules, plugins, libs
*/
var oo = {
    utils : {},
    modules : {},
    //plugins : {},
    libs : {}
};

/*--------------------------------------------------------------
* Namespace utils
--------------------------------------------------------------*/
var oo = (function($, oo){

    "use strict";

    var utils = oo.utils || (oo['utils'] = {}),
        $body = $('body');

    /*
    * oo.utils.hasJs
    * on load page, remove html Class "no-js" and add class "has-js"
    */
    utils.hasJs = function hasJs(){
        $('html').removeClass('no-js').addClass('has-js');
    };

    /*
    * oo.utils.goToTop
    * Scroll to top on class="gototop" links
    */
    utils.goToTop = function goToTop(speed){
        var s = speed || 240;
        $('.backtotop').on('click',function(e) {
            e.preventDefault();
            $('html,body').stop().animate({scrollTop : 0}, s);
        });
    };

    /*
    * oo.utils.goTo
    * Scroll to offset passed in params
    */
    utils.goTo = function goTo(offsetY, speed){
        $('html,body').stop().animate({ scrollTop:offsetY || 0 }, speed || 240);
    };

    /*
    * oo.utils.formHeader
    * Expand a search input
    */
    utils.formHeader = function formHeader(){
        var $formHeader = $('#search'),
            input = $formHeader.find('input[type="text"]');

        $formHeader.delegate(':submit', 'click', function(e){
            if(!$formHeader.hasClass('expand')){
                $formHeader.addClass('expand');
                input.focus();
                e.preventDefault();
            } else {
                if('' === input.val()){
                    $formHeader.removeClass('expand');
                    e.preventDefault();
                }
            }
        });
    };

    /*
    * oo.utils.placeholder
    * Polyfill placeholder for browsers that do not support native placeholder
    */
    utils.placeholder = function placeholder(){
        var i = document.createElement("input");
        // Only bind if placeholder isn't natively supported by the browser
        if (!("placeholder" in i)) {
            $("input[placeholder], textarea[placeholder]").each(function () {
                var self = $(this);
                self.addClass('placeholder');
                self.val(self.attr("placeholder")).bind({
                    focus: function () {
                        if (self.val() === self.attr("placeholder")) {
                            self.val("");
                            self.removeClass('placeholder');
                        }
                    },
                    blur: function () {
                        var label = self.attr("placeholder");
                        if (label && self.val() === "") {
                            self.val(label);
                            self.addClass('placeholder');
                        }
                    }
                });
            });
        }
    };

    /*
    * oo.utils.externalLinks
    */
    utils.externalLinks = function externalLinks(target){
        $body.on('click', 'a[rel="external"]', function(e){
            e.preventDefault();
            window.open($(this).attr('href'), target || '_blank');
        });
    };

    /**
    * oo.utils.bindUI
    * Create the jQuery objects
    * params : An object of UI selectors
    * e.g : ui = oo.utils.bindUI({ 'content':'#content' });
    * So the dom object will be available in ui.content
    */
    utils.bindUI = function bindUI(inBodyContextUI, outBodyContextUI) {
        var ui = {}, i;
        inBodyContextUI = inBodyContextUI || {};
        outBodyContextUI = outBodyContextUI || {};

        for (i in inBodyContextUI) {
            ui[i] = $body.find(inBodyContextUI[i]);
        }

        for (i in outBodyContextUI) {
            if (typeof ui[i] != 'undefined') {
                throw new Error('Element is already binded in context @oo.utils.bindUI');
            }

            ui[i] = $(outBodyContextUI[i]);
        }

        ui.$body = $body;

        return ui;
    };

    /*
    * oo.utils.replaceSVG
    * replace all the svg images by png ones
    * require Modernizr
    */
    utils.replaceSVG = function replaceSVG() {
        if (Modernizr && !Modernizr.inlinesvg) {
            $.each($body.find('img[src$=".svg"]'), function(key, el) {
                var src = el.getAttribute('src');
                el.setAttribute('src', src.replace('.svg', '.png'));
            });
        }
    };


    /*
    *  CUSTOM EVENTS
    */
    utils.customEvents = {};
    /*
    * oo.utils.customClick (fast click for mobile)
    */
    utils.customEvents.click = (!!('ontouchstart' in window)) ? 'touchend' : 'click';

    /*
    * oo.utils.customResize (orientationChange first)
    */
    utils.customEvents.resize = (undefined !== window.orientation) ? 'orientationchange' : 'resize';

    /*
    * oo.utils.cls
    * generic classes names
    */
    utils.cls = {
        hide: 'hidden',
        ishidden: 'is-hidden',
        active: 'is-active',
        fixed: 'is-fixed',
        visible: 'is-visible',
        invisible: 'is-invisible'
    };

    /*
    * oo.utils.printBtn
    * button to print current page
    */
    utils.printBtn = function printBtn(){
        $body.on('click','.js-print',function(e) {
            e.preventDefault();
            window.print();
        });
    };

    /*
    * oo.utils.getLocationHash
    * @return {string} location.hash
    */
    utils.getLocationHash = function getLocationHash() {
        return window.location.hash.substring(1)
    }

    /*
    * oo.utils.autosubmitForm
    * autosumit a form when a select triggers the event "change"
    */
    utils.autosubmitForm = function autosubmitForm(){

        var fn = function fn(){
            $(this).closest('form').submit();
        };

        $('form.js-autosubmit').on('change', 'select', fn);
    };

    /*
    * oo.utils.detectPlatform
    * @param fn {function} : callback with the platform
    */
    utils.detectPlatform = function detectPlatform(fn){
        var cb = fn || function(){},
            platform;

        if(navigator.userAgent.match(/Android/i)){
            platform = "android";
        }

        if(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i)){
            platform = "ios";
        }

        if(navigator.userAgent.match(/webOS/i)){
            platform = "webos";
        }

        if(navigator.userAgent.match(/windows phone/i)){
            platform = "windowsphone";
        }

        if(navigator.userAgent.match(/BlackBerry/i)){
            platform = "blackberry";
        }

        fn(platform);
    }

    /*
    * oo.utils.isMobileTablet
    * @return {boolean}
    */
    utils.isMobileTablet = (
        navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/windows phone/i) ||
        navigator.userAgent.match(/BlackBerry/i)
    ) ? true : false;

    return oo;

})(jQuery, (oo || {}) );


//Export oo
module.exports = oo;

},{}],3:[function(require,module,exports){
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

        // Update progress.
        this.updateProgress();
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
    }
};

//Export module
module.exports = carousel;

},{}],4:[function(require,module,exports){
var devGrid = {

    ui: {},

    init: function init() {
        this.bindUI();
        this.bindEvents();
    },

    bindUI: function bindUI() {
        this.ui.$devGrid = $('.js-dev-grid');
        this.ui.$btn     = $('.js-dev-grid-btn');
    },

    bindEvents: function bindEvents() {
        this.ui.$btn.on('click', $.proxy(this.toggleGrid, this));
    },

    toggleGrid: function toggleGrid() {
        this.ui.$devGrid.toggleClass('is-visible');
    }
};

//Export module
module.exports = devGrid;

},{}],5:[function(require,module,exports){
var filters = {

	ui: {},

	init: function init() {
		this.bindUI();
		this.bindEvents();
	},

	bindUI: function bindUI() {
		this.ui.$header = $('.js-header');	
		this.ui.$btn    = this.ui.$header.find('.js-header-filters-btn');
		this.ui.$links  = this.ui.$header.find('.js-header-link');
	},

	bindEvents: function bindEvents() {
		this.ui.$btn.on('click', $.proxy(this.toggleFilters, this));
		this.ui.$links.on('click', $.proxy(this.toggleFilters, this));
	},

	toggleFilters: function toggleFilters() {
		this.ui.$header.toggleClass('is-open');
	}

};

module.exports = filters;
},{}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
// Require imagesloaded plugin.
var imagesLoaded = require('imagesloaded');

var projects = {

    ui: {},
    timer: 250,
    itemActive: 0,
    isotopeClasses: ['interactive', 'motion', 'photography', 'illustration'],

    isAnimate: false,
    hasAlreadySlide: false,

    init: function init() {
        this.bindUI();
        this.buildGrid();
        this.bindEvents();
    },

    bindUI: function bindUI() {
        this.ui.$win      = $(window);
        this.ui.$projects = $('.js-projects');
        this.ui.$links    = $('.js-header-link');
        this.ui.$list     = this.ui.$projects.find('.js-projects-list');
        this.ui.$items    = this.ui.$projects.find('.js-projects-item');
    },

    bindEvents: function bindEvents() {
        var self = this;

        // Filter projects.
        this.ui.$links.on('click', $.proxy(this.filterItems, this));

        // When an image is loaded, adjust isotope layout.
        this.ui.$list.imagesLoaded().progress( function() {
            self.ui.$list.isotope('layout');
        });

        // When all images are loaded, build the pager.
        this.ui.$list.imagesLoaded(function() {
            self.buildPager();
            self.stickyPager();
        });

        // Replace pager when resize window.
        this.ui.$win.on('resize', $.proxy(this.stickyPager, this));
    },

    buildGrid: function buildGrid() {
        // Create the projects grid with isotope plugin.
        this.ui.$list.isotope({
            itemSelector: '.js-projects-item'
        });
    },

    buildPager: function buildPager() {
        var self = this,
            pagerHTML = '';

        // Starting pager html markup.
        pagerHTML += '<div class="projects__pager js-projects-pager">';
        pagerHTML += '<button class="projects__btn projects__btn--prev js-projects-pager-prev"><svg class="icon icon-arrow-up"><path fill="#ffffff" d="M3.5,0 L7,5 L4,5 L3.99743652,16 L3,16 L3,5 L0,5 L3.5,0 Z"></path></svg></button>';
        pagerHTML += '<ul class="projects__pager__list js-projects-pager-list">';

        // For each projects item, create a pager-item.
        $.each(this.ui.$items, function() {
            var itemClasses = $(this).attr('class').split(/\s+/),
                targetClass = '';

            // Loop through classes
            for (var i = 0; i < itemClasses.length; i++) {
                // Loop through global classes.
                for (var j = 0; j < self.isotopeClasses.length; j++) {
                    // If we find the same class, add it to the pager item.
                    if (itemClasses[i] == self.isotopeClasses[j]) {
                        targetClass = itemClasses[i];
                    }
                }
            }

            pagerHTML += '<li class="projects__pager__item js-projects-pager-item ' + targetClass + '"></li>';
        });

        // Close the pager.
        pagerHTML += '</ul>';
        pagerHTML += '<button class="projects__btn projects__btn--next js-projects-pager-next"><svg class="icon icon-arrow-down"><path fill="#ffffff" d="M2.99694824,0 L3,11.001709 L0,11.001709 L3.5,16.001709 L7,11.001709 L4,11.001709 L4,0.00170898438 L2.99694824,0 Z"></path></svg></button>';
        pagerHTML += '</div>';

        // Append the pager.
        this.ui.$projects.prepend(pagerHTML);

        // Bind new UI.
        this.ui.$pager = $('.js-projects-pager');
        this.ui.$pagerList  = this.ui.$pager.find('.js-projects-pager-list');
        this.ui.$pagerItems = this.ui.$pager.find('.js-projects-pager-item');
        this.ui.$pagerPrev  = this.ui.$pager.find('.js-projects-pager-prev');
        this.ui.$pagerNext  = this.ui.$pager.find('.js-projects-pager-next');

        // Bind events.
        this.ui.$pagerPrev.on('click', $.proxy(this.goPrev, this));
        this.ui.$pagerNext.on('click', $.proxy(this.goNext, this));
        this.ui.$win.on('keydown', $.proxy(this.pressKeyboard, this));
        this.ui.$win.on('mousewheel', $.proxy(this.toggleList, this));

        // Update pager.
        this.updatePager();
    },

    updatePager: function updatePager() {
        var self = this;

        // For each pager items, adjust its height based on the image ratio.
        $.each(this.ui.$items, function() {

            // Find the image inside the item.
            var $img = $(this).find('img');

            // Calculate the ratio of the image.
            var imgRatio = Math.round($img.height() / $img.width() * 100)/100;

            // Get the items index and the corresponding pager item.
            var $pagerItem = $(self.ui.$pagerItems[$(this).index()]);

            // Set height on the pager item.
            $pagerItem.height(Math.ceil($pagerItem.width() * imgRatio));
        });

        // Init new isotope function on the pager.
        this.ui.$pagerList.isotope({
            itemSelector: '.js-projects-pager-item'
        });

        // Bind click on pager items and bind window load.
        this.ui.$pagerItems.on('click', $.proxy(this.goClick, this));
        this.stickyPager();

        // Bind scroll to turn pager into sticky one.
        this.ui.$win.on('scroll', $.proxy(this.stickyPager, this));

        // Check first last function.
        this.checkFirstLast();
    },

    pressKeyboard: function pressKeyboard(e) {
        // If user press arrow up, go prev.
        if (e.keyCode == 38) { e.preventDefault(); this.ui.$pagerPrev.trigger('click'); }

        // If user press arrow down, go next.
        if (e.keyCode == 40) { e.preventDefault(); this.ui.$pagerNext.trigger('click'); }
    },

    goClick: function goClick(e) {
        var self = this,
            $el = $(e.currentTarget);

        // If the window is already scrolling, do nothing.
        if (this.isAnimate) { return; }

        // Get the index of the clicked pager item and update itemActive variable.
        var index = $el.index();
        this.itemActive = index;

        // Get the corresponding projects item.
        var $target = $(this.ui.$items[index]);

        // Scroll to the target position.
        this.scrollTo($target);

        // Update itemActive variable.
        this.itemActive = index;
    },

    goNext: function goNext() {
        // Return if we reach the bottom of the list.
        if ((this.itemActive + 1) == this.ui.$items.length) { return; }

        // Update item active variable.
        if (!this.hasAlreadySlide) {
            this.hasAlreadySlide = true;
        } else {
            this.itemActive++;
        }

        // Scroll to target item.
        this.scrollTo($(this.ui.$items[this.itemActive]));
    },

    goPrev: function goPrev() {
        // If we're on the first item, return.
        if (this.itemActive == 0) { return; }

        // Update item variable.
        this.itemActive--;

        this.scrollTo($(this.ui.$items[this.itemActive]));
    },

    scrollTo: function scrollTo($el) {
        var self = this;

        // Set isAnimate variable to true.
        this.isAnimate = true;

        // Scroll to the element.
        $("html, body").stop().animate({ scrollTop: $el.offset().top }, this.timer, function() {
            // Add small setTimeout to prevent un-focus project list.
            setTimeout(function() { self.isAnimate = false; }, 100);
        });

        // Add class is-scrolled on the projects.
        this.ui.$projects.addClass('is-scrolled');

        // Remove is-active class to all items and add it to the target.
        this.ui.$items.removeClass('is-active');
        $el.addClass('is-active');

        // Update pager.
        this.ui.$pagerItems.removeClass('is-active');
        $(this.ui.$pagerItems[$el.index()]).addClass('is-active');

        // Check first last function.
        this.checkFirstLast();
    },

    stickyPager: function stickyPager(e) {
        var self = this,
            scrollTop = this.ui.$win.scrollTop();

        // Make pager sticky or not based on the scroll position.
        if (scrollTop >= this.ui.$list.offset().top) {
            // Calculate offset.
            var offset = this.ui.$list.offset().left + this.ui.$list.outerWidth();

            this.ui.$pager.addClass('is-sticky');
            this.ui.$pager.css({ 'left' : offset });
        } else {
            this.ui.$pager.removeClass('is-sticky');
            this.ui.$pager.css({ 'left' : '100%' });
        }
    },

    filterItems: function filterItems(e) {
        // Prevent default.
        e.preventDefault();

        // Get href on click element.
        var href = $(e.currentTarget).attr('href');

        // Get target class name.
        var target = '.' + href;

        // Filter list items.
        this.ui.$list.isotope({ filter: target });

        // Filter pager items.
        this.ui.$pagerList.isotope({ filter: target });

        // Hide pager.
        this.ui.$pager.addClass('is-fade');

        // Reset item active variable and isAlreadyPress variable.
        this.itemActive = 0;
    },

    toggleList: function toggleList(e) {
        // If user didn't click on prev/next/item, un-focus list.

        if (!this.isAnimate) {
            this.ui.$projects.removeClass('is-scrolled');
            this.ui.$pagerItems.removeClass('is-active');
        }
    },

    checkFirstLast: function checkFirstLast() {
        if (this.itemActive == 0) {
            this.ui.$pagerPrev.addClass('is-fade');
            this.ui.$pagerNext.removeClass('is-fade');
        } else if (this.itemActive == (this.ui.$items.length - 1) ) {
            this.ui.$pagerPrev.removeClass('is-fade');
            this.ui.$pagerNext.addClass('is-fade');
        } else {
            this.ui.$pagerPrev.removeClass('is-fade');
            this.ui.$pagerNext.removeClass('is-fade');
        }
    }
};

//Export module
module.exports = projects;

},{"imagesloaded":9}],9:[function(require,module,exports){
/*!
 * imagesLoaded v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

( function( window, factory ) { 'use strict';
  // universal module definition

  /*global define: false, module: false, require: false */

  if ( typeof define === 'function' && define.amd ) {
    // AMD
    define( [
      'eventEmitter/EventEmitter',
      'eventie/eventie'
    ], function( EventEmitter, eventie ) {
      return factory( window, EventEmitter, eventie );
    });
  } else if ( typeof exports === 'object' ) {
    // CommonJS
    module.exports = factory(
      window,
      require('wolfy87-eventemitter'),
      require('eventie')
    );
  } else {
    // browser global
    window.imagesLoaded = factory(
      window,
      window.EventEmitter,
      window.eventie
    );
  }

})( window,

// --------------------------  factory -------------------------- //

function factory( window, EventEmitter, eventie ) {

'use strict';

var $ = window.jQuery;
var console = window.console;
var hasConsole = typeof console !== 'undefined';

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

var objToString = Object.prototype.toString;
function isArray( obj ) {
  return objToString.call( obj ) === '[object Array]';
}

// turn element or nodeList into an array
function makeArray( obj ) {
  var ary = [];
  if ( isArray( obj ) ) {
    // use object if already an array
    ary = obj;
  } else if ( typeof obj.length === 'number' ) {
    // convert nodeList to array
    for ( var i=0, len = obj.length; i < len; i++ ) {
      ary.push( obj[i] );
    }
  } else {
    // array of single index
    ary.push( obj );
  }
  return ary;
}

  // -------------------------- imagesLoaded -------------------------- //

  /**
   * @param {Array, Element, NodeList, String} elem
   * @param {Object or Function} options - if function, use as callback
   * @param {Function} onAlways - callback function
   */
  function ImagesLoaded( elem, options, onAlways ) {
    // coerce ImagesLoaded() without new, to be new ImagesLoaded()
    if ( !( this instanceof ImagesLoaded ) ) {
      return new ImagesLoaded( elem, options );
    }
    // use elem as selector string
    if ( typeof elem === 'string' ) {
      elem = document.querySelectorAll( elem );
    }

    this.elements = makeArray( elem );
    this.options = extend( {}, this.options );

    if ( typeof options === 'function' ) {
      onAlways = options;
    } else {
      extend( this.options, options );
    }

    if ( onAlways ) {
      this.on( 'always', onAlways );
    }

    this.getImages();

    if ( $ ) {
      // add jQuery Deferred object
      this.jqDeferred = new $.Deferred();
    }

    // HACK check async to allow time to bind listeners
    var _this = this;
    setTimeout( function() {
      _this.check();
    });
  }

  ImagesLoaded.prototype = new EventEmitter();

  ImagesLoaded.prototype.options = {};

  ImagesLoaded.prototype.getImages = function() {
    this.images = [];

    // filter & find items if we have an item selector
    for ( var i=0, len = this.elements.length; i < len; i++ ) {
      var elem = this.elements[i];
      // filter siblings
      if ( elem.nodeName === 'IMG' ) {
        this.addImage( elem );
      }
      // find children
      // no non-element nodes, #143
      var nodeType = elem.nodeType;
      if ( !nodeType || !( nodeType === 1 || nodeType === 9 || nodeType === 11 ) ) {
        continue;
      }
      var childElems = elem.querySelectorAll('img');
      // concat childElems to filterFound array
      for ( var j=0, jLen = childElems.length; j < jLen; j++ ) {
        var img = childElems[j];
        this.addImage( img );
      }
    }
  };

  /**
   * @param {Image} img
   */
  ImagesLoaded.prototype.addImage = function( img ) {
    var loadingImage = new LoadingImage( img );
    this.images.push( loadingImage );
  };

  ImagesLoaded.prototype.check = function() {
    var _this = this;
    var checkedCount = 0;
    var length = this.images.length;
    this.hasAnyBroken = false;
    // complete if no images
    if ( !length ) {
      this.complete();
      return;
    }

    function onConfirm( image, message ) {
      if ( _this.options.debug && hasConsole ) {
        console.log( 'confirm', image, message );
      }

      _this.progress( image );
      checkedCount++;
      if ( checkedCount === length ) {
        _this.complete();
      }
      return true; // bind once
    }

    for ( var i=0; i < length; i++ ) {
      var loadingImage = this.images[i];
      loadingImage.on( 'confirm', onConfirm );
      loadingImage.check();
    }
  };

  ImagesLoaded.prototype.progress = function( image ) {
    this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
    // HACK - Chrome triggers event before object properties have changed. #83
    var _this = this;
    setTimeout( function() {
      _this.emit( 'progress', _this, image );
      if ( _this.jqDeferred && _this.jqDeferred.notify ) {
        _this.jqDeferred.notify( _this, image );
      }
    });
  };

  ImagesLoaded.prototype.complete = function() {
    var eventName = this.hasAnyBroken ? 'fail' : 'done';
    this.isComplete = true;
    var _this = this;
    // HACK - another setTimeout so that confirm happens after progress
    setTimeout( function() {
      _this.emit( eventName, _this );
      _this.emit( 'always', _this );
      if ( _this.jqDeferred ) {
        var jqMethod = _this.hasAnyBroken ? 'reject' : 'resolve';
        _this.jqDeferred[ jqMethod ]( _this );
      }
    });
  };

  // -------------------------- jquery -------------------------- //

  if ( $ ) {
    $.fn.imagesLoaded = function( options, callback ) {
      var instance = new ImagesLoaded( this, options, callback );
      return instance.jqDeferred.promise( $(this) );
    };
  }


  // --------------------------  -------------------------- //

  function LoadingImage( img ) {
    this.img = img;
  }

  LoadingImage.prototype = new EventEmitter();

  LoadingImage.prototype.check = function() {
    // first check cached any previous images that have same src
    var resource = cache[ this.img.src ] || new Resource( this.img.src );
    if ( resource.isConfirmed ) {
      this.confirm( resource.isLoaded, 'cached was confirmed' );
      return;
    }

    // If complete is true and browser supports natural sizes,
    // try to check for image status manually.
    if ( this.img.complete && this.img.naturalWidth !== undefined ) {
      // report based on naturalWidth
      this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
      return;
    }

    // If none of the checks above matched, simulate loading on detached element.
    var _this = this;
    resource.on( 'confirm', function( resrc, message ) {
      _this.confirm( resrc.isLoaded, message );
      return true;
    });

    resource.check();
  };

  LoadingImage.prototype.confirm = function( isLoaded, message ) {
    this.isLoaded = isLoaded;
    this.emit( 'confirm', this, message );
  };

  // -------------------------- Resource -------------------------- //

  // Resource checks each src, only once
  // separate class from LoadingImage to prevent memory leaks. See #115

  var cache = {};

  function Resource( src ) {
    this.src = src;
    // add to cache
    cache[ src ] = this;
  }

  Resource.prototype = new EventEmitter();

  Resource.prototype.check = function() {
    // only trigger checking once
    if ( this.isChecked ) {
      return;
    }
    // simulate loading on detached element
    var proxyImage = new Image();
    eventie.bind( proxyImage, 'load', this );
    eventie.bind( proxyImage, 'error', this );
    proxyImage.src = this.src;
    // set flag
    this.isChecked = true;
  };

  // ----- events ----- //

  // trigger specified handler for event type
  Resource.prototype.handleEvent = function( event ) {
    var method = 'on' + event.type;
    if ( this[ method ] ) {
      this[ method ]( event );
    }
  };

  Resource.prototype.onload = function( event ) {
    this.confirm( true, 'onload' );
    this.unbindProxyEvents( event );
  };

  Resource.prototype.onerror = function( event ) {
    this.confirm( false, 'onerror' );
    this.unbindProxyEvents( event );
  };

  // ----- confirm ----- //

  Resource.prototype.confirm = function( isLoaded, message ) {
    this.isConfirmed = true;
    this.isLoaded = isLoaded;
    this.emit( 'confirm', this, message );
  };

  Resource.prototype.unbindProxyEvents = function( event ) {
    eventie.unbind( event.target, 'load', this );
    eventie.unbind( event.target, 'error', this );
  };

  // -----  ----- //

  return ImagesLoaded;

});

},{"eventie":10,"wolfy87-eventemitter":11}],10:[function(require,module,exports){
/*!
 * eventie v1.0.6
 * event binding helper
 *   eventie.bind( elem, 'click', myFn )
 *   eventie.unbind( elem, 'click', myFn )
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true */
/*global define: false, module: false */

( function( window ) {

'use strict';

var docElem = document.documentElement;

var bind = function() {};

function getIEEvent( obj ) {
  var event = window.event;
  // add event.target
  event.target = event.target || event.srcElement || obj;
  return event;
}

if ( docElem.addEventListener ) {
  bind = function( obj, type, fn ) {
    obj.addEventListener( type, fn, false );
  };
} else if ( docElem.attachEvent ) {
  bind = function( obj, type, fn ) {
    obj[ type + fn ] = fn.handleEvent ?
      function() {
        var event = getIEEvent( obj );
        fn.handleEvent.call( fn, event );
      } :
      function() {
        var event = getIEEvent( obj );
        fn.call( obj, event );
      };
    obj.attachEvent( "on" + type, obj[ type + fn ] );
  };
}

var unbind = function() {};

if ( docElem.removeEventListener ) {
  unbind = function( obj, type, fn ) {
    obj.removeEventListener( type, fn, false );
  };
} else if ( docElem.detachEvent ) {
  unbind = function( obj, type, fn ) {
    obj.detachEvent( "on" + type, obj[ type + fn ] );
    try {
      delete obj[ type + fn ];
    } catch ( err ) {
      // can't delete window object properties
      obj[ type + fn ] = undefined;
    }
  };
}

var eventie = {
  bind: bind,
  unbind: unbind
};

// ----- module definition ----- //

if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( eventie );
} else if ( typeof exports === 'object' ) {
  // CommonJS
  module.exports = eventie;
} else {
  // browser global
  window.eventie = eventie;
}

})( window );

},{}],11:[function(require,module,exports){
/*!
 * EventEmitter v4.2.11 - git.io/ee
 * Unlicense - http://unlicense.org/
 * Oliver Caldwell - http://oli.me.uk/
 * @preserve
 */

;(function () {
    'use strict';

    /**
     * Class for managing events.
     * Can be extended to provide event functionality in other classes.
     *
     * @class EventEmitter Manages event registering and emitting.
     */
    function EventEmitter() {}

    // Shortcuts to improve speed and size
    var proto = EventEmitter.prototype;
    var exports = this;
    var originalGlobalValue = exports.EventEmitter;

    /**
     * Finds the index of the listener for the event in its storage array.
     *
     * @param {Function[]} listeners Array of listeners to search through.
     * @param {Function} listener Method to look for.
     * @return {Number} Index of the specified listener, -1 if not found
     * @api private
     */
    function indexOfListener(listeners, listener) {
        var i = listeners.length;
        while (i--) {
            if (listeners[i].listener === listener) {
                return i;
            }
        }

        return -1;
    }

    /**
     * Alias a method while keeping the context correct, to allow for overwriting of target method.
     *
     * @param {String} name The name of the target method.
     * @return {Function} The aliased method
     * @api private
     */
    function alias(name) {
        return function aliasClosure() {
            return this[name].apply(this, arguments);
        };
    }

    /**
     * Returns the listener array for the specified event.
     * Will initialise the event object and listener arrays if required.
     * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
     * Each property in the object response is an array of listener functions.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Function[]|Object} All listener functions for the event.
     */
    proto.getListeners = function getListeners(evt) {
        var events = this._getEvents();
        var response;
        var key;

        // Return a concatenated array of all matching events if
        // the selector is a regular expression.
        if (evt instanceof RegExp) {
            response = {};
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    response[key] = events[key];
                }
            }
        }
        else {
            response = events[evt] || (events[evt] = []);
        }

        return response;
    };

    /**
     * Takes a list of listener objects and flattens it into a list of listener functions.
     *
     * @param {Object[]} listeners Raw listener objects.
     * @return {Function[]} Just the listener functions.
     */
    proto.flattenListeners = function flattenListeners(listeners) {
        var flatListeners = [];
        var i;

        for (i = 0; i < listeners.length; i += 1) {
            flatListeners.push(listeners[i].listener);
        }

        return flatListeners;
    };

    /**
     * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Object} All listener functions for an event in an object.
     */
    proto.getListenersAsObject = function getListenersAsObject(evt) {
        var listeners = this.getListeners(evt);
        var response;

        if (listeners instanceof Array) {
            response = {};
            response[evt] = listeners;
        }

        return response || listeners;
    };

    /**
     * Adds a listener function to the specified event.
     * The listener will not be added if it is a duplicate.
     * If the listener returns true then it will be removed after it is called.
     * If you pass a regular expression as the event name then the listener will be added to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addListener = function addListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var listenerIsWrapped = typeof listener === 'object';
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
                listeners[key].push(listenerIsWrapped ? listener : {
                    listener: listener,
                    once: false
                });
            }
        }

        return this;
    };

    /**
     * Alias of addListener
     */
    proto.on = alias('addListener');

    /**
     * Semi-alias of addListener. It will add a listener that will be
     * automatically removed after its first execution.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addOnceListener = function addOnceListener(evt, listener) {
        return this.addListener(evt, {
            listener: listener,
            once: true
        });
    };

    /**
     * Alias of addOnceListener.
     */
    proto.once = alias('addOnceListener');

    /**
     * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
     * You need to tell it what event names should be matched by a regex.
     *
     * @param {String} evt Name of the event to create.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.defineEvent = function defineEvent(evt) {
        this.getListeners(evt);
        return this;
    };

    /**
     * Uses defineEvent to define multiple events.
     *
     * @param {String[]} evts An array of event names to define.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.defineEvents = function defineEvents(evts) {
        for (var i = 0; i < evts.length; i += 1) {
            this.defineEvent(evts[i]);
        }
        return this;
    };

    /**
     * Removes a listener function from the specified event.
     * When passed a regular expression as the event name, it will remove the listener from all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to remove the listener from.
     * @param {Function} listener Method to remove from the event.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeListener = function removeListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var index;
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                index = indexOfListener(listeners[key], listener);

                if (index !== -1) {
                    listeners[key].splice(index, 1);
                }
            }
        }

        return this;
    };

    /**
     * Alias of removeListener
     */
    proto.off = alias('removeListener');

    /**
     * Adds listeners in bulk using the manipulateListeners method.
     * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
     * You can also pass it a regular expression to add the array of listeners to all events that match it.
     * Yeah, this function does quite a bit. That's probably a bad thing.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addListeners = function addListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(false, evt, listeners);
    };

    /**
     * Removes listeners in bulk using the manipulateListeners method.
     * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be removed.
     * You can also pass it a regular expression to remove the listeners from all events that match it.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeListeners = function removeListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(true, evt, listeners);
    };

    /**
     * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
     * The first argument will determine if the listeners are removed (true) or added (false).
     * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be added/removed.
     * You can also pass it a regular expression to manipulate the listeners of all events that match it.
     *
     * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
        var i;
        var value;
        var single = remove ? this.removeListener : this.addListener;
        var multiple = remove ? this.removeListeners : this.addListeners;

        // If evt is an object then pass each of its properties to this method
        if (typeof evt === 'object' && !(evt instanceof RegExp)) {
            for (i in evt) {
                if (evt.hasOwnProperty(i) && (value = evt[i])) {
                    // Pass the single listener straight through to the singular method
                    if (typeof value === 'function') {
                        single.call(this, i, value);
                    }
                    else {
                        // Otherwise pass back to the multiple function
                        multiple.call(this, i, value);
                    }
                }
            }
        }
        else {
            // So evt must be a string
            // And listeners must be an array of listeners
            // Loop over it and pass each one to the multiple method
            i = listeners.length;
            while (i--) {
                single.call(this, evt, listeners[i]);
            }
        }

        return this;
    };

    /**
     * Removes all listeners from a specified event.
     * If you do not specify an event then all listeners will be removed.
     * That means every event will be emptied.
     * You can also pass a regex to remove all events that match it.
     *
     * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeEvent = function removeEvent(evt) {
        var type = typeof evt;
        var events = this._getEvents();
        var key;

        // Remove different things depending on the state of evt
        if (type === 'string') {
            // Remove all listeners for the specified event
            delete events[evt];
        }
        else if (evt instanceof RegExp) {
            // Remove all events matching the regex.
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    delete events[key];
                }
            }
        }
        else {
            // Remove all listeners in all events
            delete this._events;
        }

        return this;
    };

    /**
     * Alias of removeEvent.
     *
     * Added to mirror the node API.
     */
    proto.removeAllListeners = alias('removeEvent');

    /**
     * Emits an event of your choice.
     * When emitted, every listener attached to that event will be executed.
     * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
     * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
     * So they will not arrive within the array on the other side, they will be separate.
     * You can also pass a regular expression to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {Array} [args] Optional array of arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.emitEvent = function emitEvent(evt, args) {
        var listenersMap = this.getListenersAsObject(evt);
        var listeners;
        var listener;
        var i;
        var key;
        var response;

        for (key in listenersMap) {
            if (listenersMap.hasOwnProperty(key)) {
                listeners = listenersMap[key].slice(0);
                i = listeners.length;

                while (i--) {
                    // If the listener returns true then it shall be removed from the event
                    // The function is executed either with a basic call or an apply if there is an args array
                    listener = listeners[i];

                    if (listener.once === true) {
                        this.removeListener(evt, listener.listener);
                    }

                    response = listener.listener.apply(this, args || []);

                    if (response === this._getOnceReturnValue()) {
                        this.removeListener(evt, listener.listener);
                    }
                }
            }
        }

        return this;
    };

    /**
     * Alias of emitEvent
     */
    proto.trigger = alias('emitEvent');

    /**
     * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
     * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {...*} Optional additional arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.emit = function emit(evt) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(evt, args);
    };

    /**
     * Sets the current value to check against when executing listeners. If a
     * listeners return value matches the one set here then it will be removed
     * after execution. This value defaults to true.
     *
     * @param {*} value The new value to check for when executing listeners.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.setOnceReturnValue = function setOnceReturnValue(value) {
        this._onceReturnValue = value;
        return this;
    };

    /**
     * Fetches the current value to check against when executing listeners. If
     * the listeners return value matches this one then it should be removed
     * automatically. It will return true by default.
     *
     * @return {*|Boolean} The current value to check for or the default, true.
     * @api private
     */
    proto._getOnceReturnValue = function _getOnceReturnValue() {
        if (this.hasOwnProperty('_onceReturnValue')) {
            return this._onceReturnValue;
        }
        else {
            return true;
        }
    };

    /**
     * Fetches the events object and creates one if required.
     *
     * @return {Object} The events storage object.
     * @api private
     */
    proto._getEvents = function _getEvents() {
        return this._events || (this._events = {});
    };

    /**
     * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
     *
     * @return {Function} Non conflicting EventEmitter class.
     */
    EventEmitter.noConflict = function noConflict() {
        exports.EventEmitter = originalGlobalValue;
        return EventEmitter;
    };

    // Expose the class either via AMD, CommonJS or the global object
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return EventEmitter;
        });
    }
    else if (typeof module === 'object' && module.exports){
        module.exports = EventEmitter;
    }
    else {
        exports.EventEmitter = EventEmitter;
    }
}.call(this));

},{}]},{},[1]);
