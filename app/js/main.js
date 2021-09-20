$(function() {
    $('img').add('iframe').addClass('loading-placeholder')
    $('img').add('iframe').on('load', function() {
        $(this).removeClass('loading-placeholder')
    })

    $('.loading__bg--accent').addClass('loading__bg--accent-close')
    $('.loading__bg--black').addClass('loading__bg--black-close')
})