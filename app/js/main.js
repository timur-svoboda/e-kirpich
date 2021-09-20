$(function() {
    // Set/remove loading-placeholder for images and iframes
    $('img').add('iframe').addClass('loading-placeholder')
    $('img').add('iframe').on('load', function() {
        $(this).removeClass('loading-placeholder')
    })

    // Remove page loading when pase is loaded
    $('.loading__bg--accent').addClass('loading__bg--accent-close')
    $('.loading__bg--black').addClass('loading__bg--black-close')

    // Scroll animations
    AOS.init({once: true});
})