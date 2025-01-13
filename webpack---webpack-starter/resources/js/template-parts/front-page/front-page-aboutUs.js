$(document).ready(function() {
    if ($('.aboutUs').length) {
        if ($(window).width() >= 1200) {
            var text1 = $('.aboutUs__text--1');
            var text3 = $('.aboutUs__text--3');
            window.onscroll = function() {
                var position = window.scrollY - 1200;
                text1.css('left', position * 0.7 + 'px');
                text3.css('right', position * 0.7 + 'px');
            };
        } else if ($(window).width() >= 992 && $(window).width() <= 1199) {
            var _text = $('.aboutUs__text--1');
            var _text2 = $('.aboutUs__text--3');
            window.onscroll = function() {
                var position = window.scrollY - 800;
                _text.css('left', position * 0.7 + 'px');
                _text2.css('right', position * 0.7 + 'px');
            };
        } else {
            var _text3 = $('.aboutUs__text--1');
            var text2 = $('.aboutUs__text--2');
            var _text4 = $('.aboutUs__text--3');
            var text4 = $('.aboutUs__text--4');
            window.onscroll = function() {
                var position = window.scrollY - 900;
                _text3.css('left', (position + 50) * 0.7 + 'px');
                text2.css('left', (position + 220) * 0.525 + 'px');
                _text4.css('right', (position + 100) * 0.525 + 'px');
                text4.css('right', position * 0.7 + 'px');
            };
        }
    }
});

//# sourceURL=webpack://webpack-starter/./resources/js/template-parts/front-page/front-page-aboutUs.js?