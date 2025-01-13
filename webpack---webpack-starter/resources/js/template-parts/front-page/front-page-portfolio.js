jQuery(document).ready(function($) {
    if ($('.portfolio__content').length) {
        // Funkcja wykonująca się po załadowaniu elementów
        var additionalCode = function additionalCode() {
            if ($('.portfolio__content__el').length) {
                $('.portfolio__content__el').each(function() {
                    var currentElement = $(this);
                    var video = currentElement.find('video');
                    var img = currentElement.find('.portfolio__content__el__img');
                    var playPromise;
                    if (video.length) {
                        currentElement.on('mouseenter', function() {
                            if (playPromise === undefined || playPromise !== undefined && playPromise['[[PromiseStatus]]'] !== 'pending') {
                                playPromise = video.get(0).play();
                                if (playPromise !== undefined) {
                                    playPromise.then(function() {
                                        video.addClass('portfolio__content__el__video--show');
                                    }).catch(function(error) {
                                        console.error('Błąd odtwarzania:', error);
                                    });
                                }
                            }
                        });
                        currentElement.on('mouseleave', function() {
                            if (playPromise !== undefined) {
                                playPromise.then(function() {
                                    video.get(0).pause();
                                    video.removeClass('portfolio__content__el__video--show');
                                    video.get(0).currentTime = 0;
                                });
                            }
                        });
                    }
                });
            }
            var customCursor = $('#customCursor');
            if (customCursor.length) {
                if (window.innerWidth >= 992) {
                    var customCursorOnHover = $('.portfolio__content__el');
                    var body = $('body');
                    customCursorOnHover.mouseenter(function() {
                        body.addClass('hideCursor'); // Ukryj domyślny kursor
                        $('.customCursor').addClass('customCursor--active');
                    });
                    customCursorOnHover.mouseleave(function() {
                        body.removeClass('hideCursor'); // Przywróć domyślny kursor
                        $('.customCursor').removeClass('customCursor--active');
                    });
                    body.mousemove(function(event) {
                        customCursor.css({
                            left: event.clientX - customCursor.width() / 2,
                            top: event.clientY - customCursor.height() / 2
                        });
                    });
                }
            }
        };
        var postsIds = $('.portfolio__content').data('postsid').split(',');

        // Zainicjuj licznik do śledzenia, ile żądań AJAX zostało zakończonych
        var ajaxCounter = 0;
        $.each(postsIds, function(index, postId) {
            $.ajax({
                url: window.location.origin + '/wp-json/wp/v2/portfolio/' + postId + '?acf_format=standard',
                type: 'GET',
                success: function success(data) {
                    var postHtml = "\n                        <a href=\"".concat(data.link, "\" class=\"portfolio__content__el portfolio__content__el--").concat(index + 1, " customCursorOnHover\">\n                            <img class=\"portfolio__content__el__img\" src=\"").concat(data.acf.pf_home_thumb, "\" alt=\"").concat(data.acf.pf_home_thumb, "\" />");
                    if (data.acf.pf_home_vid) {
                        postHtml += "\n                                <video class=\"portfolio__content__el__video\"><source src=\"".concat(data.acf.pf_home_vid, "\" type=\"video/mp4\"></video>\n                        </a>");
                    } else {
                        postHtml += '</a>';
                    }
                    $('.portfolio__content').append(postHtml);
                    ajaxCounter++;
                    if (ajaxCounter === postsIds.length) {
                        // Reszta kodu wykonuje się po załadowaniu elementów
                        additionalCode();
                    }
                }
            });
        });
    }
});

//# sourceURL=webpack://webpack-starter/./resources/js/template-parts/front-page/front-page-portfolio.js?