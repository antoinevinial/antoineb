// Require imagesloaded plugin.
var imagesLoaded = require('imagesloaded');

var projects = {

    ui: {},
    timer: 300,
    itemActive: 0,

    isAnimate: false,
    isAlreadyPress: false,

    stickyPosition: {},

    init: function init() {
        this.bindUI();
        this.buildGrid();
        this.bindEvents();
    },

    bindUI: function bindUI() {
        this.ui.$win      = $(window);
        this.ui.$projects = $('.js-projects');
        this.ui.$list     = this.ui.$projects.find('.js-projects-list');
        this.ui.$items    = this.ui.$projects.find('.js-projects-item');
    },

    bindEvents: function bindEvents() {
        var self = this;

        // When an image is loaded, adjust isotope layout.
        this.ui.$list.imagesLoaded().progress( function() {
            self.ui.$list.isotope('layout');
        });

        // When all images are loaded, build the pager.
        this.ui.$list.imagesLoaded(function() {
            self.buildPager();
            self.stickyPager();
        });
    },

    buildGrid: function buildGrid() {
        // Create the projects grid with isotope plugin.
        this.ui.$list.isotope({
            itemSelector: '.js-projects-item'
        });
    },

    buildPager: function buildPager() {
        var pagerHTML = '';

        // Starting pager html markup.
        pagerHTML += '<div class="projects__pager js-projects-pager">';
        pagerHTML += '<button class="projects__btn projects__btn--prev js-projects-pager-prev"><svg class="icon icon-arrow-up"><path fill="#ffffff" d="M3.5,0 L7,5 L4,5 L3.99743652,16 L3,16 L3,5 L0,5 L3.5,0 Z"></path></svg></button>';
        pagerHTML += '<ul class="projects__pager__list js-projects-pager-list">';

        // For each projects item, create a pager-item.
        $.each(this.ui.$items, function() {
            pagerHTML += '<li class="projects__pager__item js-projects-pager-item"></li>';
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
            $pagerItem.height($pagerItem.width() * imgRatio);
        });

        // Init new isotope function on the pager.
        this.ui.$pagerList.isotope({
            itemSelector: '.js-projects-pager-item'
        });

        // Bind click on pager items and bind window load.
        this.ui.$pagerItems.on('click', $.proxy(this.goClick, this));
        this.stickyPager();

        // Save sticky top and left position.
        this.stickyPosition.top  = this.ui.$pager.offset().top;
        this.stickyPosition.left = this.ui.$pager.offset().left;

        // Bind scroll to turn pager into sticky one.
        this.ui.$win.on('scroll', $.proxy(this.stickyPager, this));
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
        // If the window is already scrolling, do nothing.
        if (this.isAnimate) { return; }

        // If we're on the last item, stop the function.
        if (this.itemActive > this.ui.$items.length - 2) { return; }

        // Update itemActive variable.
        if (!this.isAlreadyPress) {
            this.isAlreadyPress = true;
        } else {
            this.itemActive++;
        }

        // Get the target item.
        var $target = $(this.ui.$items[this.itemActive]);

        // Scroll to the target position.
        this.scrollTo($target);
    },

    goPrev: function goPrev() {
        // If the window is already scrolling, do nothing.
        if (this.isAnimate) { return; }

        // If we're on the last item, stop the function.
        if (this.itemActive == 0) { return; }

        // Update itemActive variable.
        this.itemActive--;

        // Get the target item.
        var $target = $(this.ui.$items[this.itemActive]);

        // Scroll to the target position.
        this.scrollTo($target);
    },

    scrollTo: function scrollTo($el) {
        var self = this;

        // Set isAnimate variable to true.
        this.isAnimate = true;

        // Scroll to the element.
        $("html, body").animate({ scrollTop: $el.offset().top }, this.timer, function() {
            // Add small setTimeout to prevent un-focus project list.
            setTimeout(function() { self.isAnimate = false; }, 20);
        });

        // Add class is-scrolled on the projects.
        this.ui.$projects.addClass('is-scrolled');

        // Remove is-active class to all items and add it to the target.
        this.ui.$items.removeClass('is-active');
        $el.addClass('is-active');

        // Update pager.
        this.ui.$pagerItems.removeClass('is-active');
        $(this.ui.$pagerItems[$el.index()]).addClass('is-active');
    },

    stickyPager: function stickyPager(e) {
        var scrollTop = this.ui.$win.scrollTop();

        // If user didn't click on prev/next/item, un-focus list.
        if (!this.isAnimate) {
            this.ui.$projects.removeClass('is-scrolled');
            this.ui.$pagerItems.removeClass('is-active');
        }
        
        // Make pager sticky or not based on the scroll position.
        if (scrollTop >= this.stickyPosition.top) {
            this.ui.$pager.addClass('is-sticky');
            this.ui.$pager.css({ 'left' : this.stickyPosition.left });
        } else {
            this.ui.$pager.removeClass('is-sticky');
            this.ui.$pager.css({ 'left' : '100%' });
        }
    }
};

//Export module
module.exports = projects;
