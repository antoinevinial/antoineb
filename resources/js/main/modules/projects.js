// Require imagesloaded plugin.
var imagesloaded = require('imagesloaded');

var projects = {

    ui: {},

    init: function init() {
        this.bindUI();
        this.buildGrid();
        this.bindEvents();
    },

    bindUI: function bindUI() {
        this.ui.$projects = $('.js-projects');
        this.ui.$items    = this.ui.$projects.find('.js-projects-item');
    },

    bindEvents: function bindEvents() {
        var self = this;

        // When an image is loaded, adjust isotope layout.
        this.ui.$projects.imagesLoaded().progress( function() {
            self.ui.$projects.isotope('layout');
        });

        // When all images are loaded, build the pager.
        this.ui.$projects.imagesLoaded(function() {
            self.buildPager();
        });
    },

    buildGrid: function buildGrid() {
        // Create the projects grid with isotope plugin.
        this.ui.$projects.isotope({
            itemSelector: '.js-projects-item'
        });
    },

    buildPager: function buildPager() {
        console.log(this.ui.$items);
    }
};

//Export module
module.exports = projects;
