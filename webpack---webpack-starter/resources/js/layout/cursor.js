$(document).ready(function() {
    if ($(window).width() > 991) {
        var moveCursor = function moveCursor(e) {
            var scrolledFromTop = document.documentElement.scrollTop;
            $cursor.css({
                "top": e.pageY - 15 - scrolledFromTop,
                "left": e.pageX - 15
            });
        };
        var $cursor = $('#cursor');
        $('a, input, textarea, button, submit, .inputBox--select__select, .showHide__show, .showHide__hide').mouseover(function() {
            $cursor.addClass('is-hover');
        });
        $('a, input, textarea, button, submit, .inputBox--select__select, .showHide__show, .showHide__hide').mouseleave(function() {
            $cursor.removeClass('is-hover');
        });
        $(window).on('mousemove', moveCursor);
    }
});

//# sourceURL=webpack://webpack-starter/./resources/js/layout/cursor.js?