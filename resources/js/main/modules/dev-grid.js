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
