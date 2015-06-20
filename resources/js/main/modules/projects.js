// Require imagesloaded plugin.
var imagesLoaded = require('imagesloaded');

var projects = {

    ui: {},

    init: function init() {
        this.bindUI();
        this.buildGrid();
        this.bindEvents();
    },

    bindUI: function bindUI() {
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
        });
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
        pagerHTML += '<ul class="projects__pager js-projects-pager">';

        // For each projects item, create a pager-item.
        $.each(this.ui.$items, function() {
            // Add a pager-item.
            pagerHTML += '<li class="projects__pager__item js-projects-pager-item"></li>';
        });

        // Close the pager.
        pagerHTML += '</ul>';

        // Append the pager.
        this.ui.$projects.prepend(pagerHTML);

        // Bind new UI.
        this.ui.$pager = $('.js-projects-pager');
        this.ui.$pagerItems = this.ui.$pager.find('.js-projects-pager-item');

        // For each pager items, adjust its height based on the image ratio.
        $.each(this.ui.$items, function() {

            // Find the image inside the item.
            var $img = $(this).find('img');

            // Calculate the ratio of the image.
            var imgH  = $img.height(),
                imgW  = $img.width(),
                imgRatio = Math.round(imgH / imgW * 100)/100;

            // Get the items index and the corresponding pager item.
            var itemIndex  = $(this).index(),
                $pagerItem = $(self.ui.$pagerItems[itemIndex]);

            // Get pager item width.
            var pagerItemW = $pagerItem.width();

            // Set height on the pager item.
            $pagerItem.height(pagerItemW * imgRatio);
        });

        // Init new isotope function on the pager.
        this.ui.$pager.isotope({
            itemSelector: '.js-projects-pager-item'
        });
    }
};

//Export module
module.exports = projects;
