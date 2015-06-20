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
