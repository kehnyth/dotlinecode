$(document).ready(function() {
    $('select.dropdown').each(function() {
        var $this = $(this),
            numberOfOptions = $(this).children('option').length;
        $this.addClass('inputBox--select__select-hidden');
        $this.wrap('<div class="inputBox--select__select"></div>');
        $this.after('<div class="inputBox--select__select-styled"></div>');
        var $styledSelect = $this.next('.inputBox--select__select-styled');
        $styledSelect.text($this.children('option').eq(0).text());
        var $list = $('<ul />', {
            'class': 'inputBox--select__select-options'
        }).insertAfter($styledSelect);
        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
            //if ($this.children('option').eq(i).is(':selected')){
            //  $('li[rel="' + $this.children('option').eq(i).val() + '"]').addClass('is-selected')
            //}
        }

        var $listItems = $list.children('li');
        $styledSelect.click(function(e) {
            e.stopPropagation();
            $('inputBox--select__select-styled.active').not(this).each(function() {
                $(this).removeClass('active').next('ul.inputBox--select__select-options').hide();
            });
            $(this).toggleClass('active').next('ul.inputBox--select__select-options').toggle();
        });
        $listItems.click(function(e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));
            $list.hide();
            if (!$(this).parent().parent().hasClass('inputBox--select__select--selected')) {
                $(this).parent().parent().addClass('inputBox--select__select--selected');
            }
            //console.log($this.val());
        });

        $(document).click(function() {
            $styledSelect.removeClass('active');
            $list.hide();
        });
    });
});

function dontTriggerCheckbox(e) {
    var input = e.find('input');
    if (input.prop('checked') == true) {
        input.prop('checked', false);
    } else {
        input.prop('checked', true);
    }
};
$('.showHide__show').click(function() {
    var grandParent = $(this).parent().parent().parent();
    $('.showHide__bottom').hide();
    $('.showHide__hide').hide();
    $('.showHide__show').show();
    grandParent.find('.showHide__show').hide();
    grandParent.find('.showHide__hide').show();
    grandParent.find('.showHide__bottom').show();
    dontTriggerCheckbox($(this).parent().parent());
});
$('.showHide__hide').click(function() {
    var grandParent = $(this).parent().parent().parent();
    grandParent.find('.showHide__hide').hide();
    grandParent.find('.showHide__show').show();
    grandParent.find('.showHide__bottom').hide();
    dontTriggerCheckbox($(this).parent().parent());
});

//# sourceURL=webpack://webpack-starter/./resources/js/layout/inputs.js?