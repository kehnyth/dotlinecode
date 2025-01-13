$(document).ready(function() {
    if (window.location.href == 'https://dotlinecode.com/') {
        $.get("https://ipinfo.io", function(response) {
            if (response.country != 'PL') {
                window.location.href = 'https://dotlinecode.com/en';
            }
        }, "jsonp");
    }

    //hamburger menu
    $('.mainMenu__hamburger').click(function() {
        $(this).toggleClass('mainMenu__hamburger--active');
        $('.mainMenu__content').toggleClass('mainMenu__content--mobileShow');
        $('.pageBgVideo').toggleClass('pageBgVideo--up');
        $('body').toggleClass('menuMobileOpened');
    });
    $('.menuMobile__menu li a').click(function() {
        $('.mainMenu__hamburger').removeClass('mainMenu__hamburger--active');
        $('.mainMenu__content').removeClass('mainMenu__content--mobileShow');
        $('.pageBgVideo').removeClass('pageBgVideo--up');
        $('body').removeClass('menuMobileOpened');
    });
    if ($('.page-template-front-page').length) {
        var onScrollFrontPage = function onScrollFrontPage(event) {
            var scrollPos = $(window).scrollTop();
            var offset = 300;
            $("header .mainMenu__menu ul li, header .mainMenu__mobile ul li").each(function() {
                var href = $(this).find('a').attr('href');
                var parsedURL = new URL(href);
                var refElement = $(parsedURL.hash).closest('.scrollNavElSection');
                if (refElement.length) {
                    var refElementPos = refElement.offset().top - offset;
                    var refElementHeight = refElement.outerHeight();
                    if (refElementPos <= scrollPos && refElementPos + refElementHeight > scrollPos) {
                        $("header .mainMenu__menu ul li").removeClass("menuElActive");
                        $(this).addClass("menuElActive");
                    } else {
                        $(this).removeClass("menuElActive");
                    }
                }
            });
        };
        $(window).on("scroll", onScrollFrontPage);
    }
});

//menu scroll
var lastScrollTop = 0;
var header = $("header");

//if( $(window).width() > 991 ){
$(window).scroll(function() {
    var windowTop = $(window).scrollTop();
    if (windowTop > 80 && !$('body').hasClass('menuMobileOpened')) {
        header.addClass("sticky");
        if (header.hasClass('sticky')) {
            if (windowTop < lastScrollTop) {
                header.addClass('goingUp');
            } else {
                header.removeClass('goingUp');
            }
        }
    } else {
        header.removeClass("sticky");
    }
    lastScrollTop = windowTop;
});
//}

var prevWidth = window.innerWidth;
window.addEventListener('resize', function() {
    console.log(window.innerWidth);
    if (window.innerWidth !== prevWidth) {
        prevWidth = window.innerWidth;
        document.location.reload(true);
    }
});

//# sourceURL=webpack://webpack-starter/./resources/js/template-parts/header.js?