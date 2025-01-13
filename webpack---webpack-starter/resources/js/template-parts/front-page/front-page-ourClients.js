$(document).ready(function() {
    // $('.ourClients h3').html(function(){	
    // 	// separate the text by spaces
    // 	var text= $(this).text().split(' ');
    // 	// drop the last word and store it in a variable
    // 	var last = text.pop();
    // 	// join the text back and if it has more than 1 word add the span tag
    // 	// to the last word
    // 	return text.join(" ") + (text.length > 0 ? ' <span class="lastWord">'+last+'</span>' : last);   
    // });

    var sentence = $('.ourClients h3').text();
    var words = sentence.split(" ");
    $('.ourClients h3').text('');
    $.each(words, function(i, w) {
        $('.ourClients h3').append($("<span>").text(w));
    });
});

//# sourceURL=webpack://webpack-starter/./resources/js/template-parts/front-page/front-page-ourClients.js?