$(document).ready(function() {
    if (window.innerWidth < 768) {
        $('.singlePortfolio__fixedContent__inner').appendTo('.appendContentHereMobile');
    }
    if ($('.singlePortfolio__fixedContent__inner__content__menu').length) {
        var generateIdFromText = function generateIdFromText(text) {
            var id = text.replace(/[^\wа-яёА-ЯЁ]/g, function(match) {
                var transliterationMap = {
                    'ą': 'a',
                    'ć': 'c',
                    'ę': 'e',
                    'ł': 'l',
                    'ń': 'n',
                    'ó': 'o',
                    'ś': 's',
                    'ź': 'z',
                    'ż': 'z',
                    'Ą': 'A',
                    'Ć': 'C',
                    'Ę': 'E',
                    'Ł': 'L',
                    'Ń': 'N',
                    'Ó': 'O',
                    'Ś': 'S',
                    'Ź': 'Z',
                    'Ż': 'Z',
                    ' ': '_',
                    '#': '_',
                    '&': '_',
                    '?': '_',
                    '/': '_',
                    '+': '_',
                    '=': '_',
                    ',': '_',
                    '.': '_'
                };
                var lowercaseMatch = match.toLowerCase();
                return transliterationMap[lowercaseMatch] || match;
            });

            // Usuń początkowe podkreślenie, jeśli istnieje
            id = id.replace(/^_+/, '');
            return id || '_'; // Zwróć podkreślenie, jeśli identyfikator jest pusty
        };
        var createSidebar = function createSidebar(elToNav) {
            elToNav.each(function() {
                var text = $(this).text();
                var id = generateIdFromText(text);
                $(this).attr('id', id);
                var newEl = "\n                <div class=\"singlePortfolio__fixedContent__inner__content__menu__el\" data-scrollto=\"".concat(id, "\">\n                    <div class=\"singlePortfolio__fixedContent__inner__content__menu__el__dot\"></div>\n                    ").concat(text, "\n                </div>\n                ");
                navBar.append(newEl);
            });
            $('.singlePortfolio__fixedContent__inner__content__menu__el').click(function() {
                var dataScroll = $(this).data("scrollto");
                var targetSection = elToNav.filter("#" + dataScroll).closest('.scrollNavElSection');
                if (targetSection.length > 0) {
                    var scrollTo = targetSection.offset().top - 290;
                    window.scrollTo({
                        top: scrollTo,
                        behavior: 'smooth' // Ustawienie 'instant' powoduje natychmiastowe przewinięcie
                    });
                    // Dodawanie fragmentu do URL
                    if (history.pushState) {
                        history.pushState(null, null, "#" + dataScroll);
                    } else {
                        window.location.hash = "#" + dataScroll;
                    }
                }
            });

            // ACTIVE SCROLL
            $(window).on("scroll", onScroll);

            function onScroll(event) {
                var scrollPos = $(window).scrollTop();
                var offset = 300;
                $(".singlePortfolio__fixedContent__inner__content__menu__el").each(function() {
                    var currLink = $(this);
                    var refElement = $('#' + currLink.data('scrollto')).closest('.scrollNavElSection');
                    if (refElement.length) {
                        var refElementPos = refElement.offset().top - offset;
                        var refElementHeight = refElement.outerHeight();
                        if (refElementPos <= scrollPos && refElementPos + refElementHeight > scrollPos) {
                            $(".singlePortfolio__fixedContent__inner__content__menu__el").removeClass("singlePortfolio__fixedContent__inner__content__menu__el--active");
                            currLink.addClass("singlePortfolio__fixedContent__inner__content__menu__el--active");
                        } else {
                            currLink.removeClass("singlePortfolio__fixedContent__inner__content__menu__el--active");
                        }
                    }
                });
            }
        };
        var navBar = $(".singlePortfolio__fixedContent__inner__content__menu");
        var elToNav = $(".scrollNavEl");
        if (elToNav.length) {
            createSidebar(elToNav);
        }
    }
});

//# sourceURL=webpack://webpack-starter/./resources/js/template-pages/single-portfolio.js?