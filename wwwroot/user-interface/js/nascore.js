/**
 * Nascore - Custom Application Scripts (Nascore.js)
 * Clean, modular and error-free client side behaviors.
 */

(function ($) {
    'use strict';

    // 1. AOS (Animate On Scroll) Initialization
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
            duration: 800
        });
    }

    // 2. Animated Progress Bars (with appear & countTo)
    $(window).on('load', function () {
        var $progressBars = $('.progress-bar');
        if ($progressBars.length && $.fn.appear && $.fn.countTo) {
            $progressBars.each(function () {
                var $bar = $(this);
                var targetWidth = $bar.data('percent');
                $bar.css({ 'transition': 'width 2.5s ease-in-out' });
                $bar.appear(function () {
                    $bar.css('width', targetWidth + '%');
                    $bar.find('.count').countTo({
                        from: 0,
                        to: targetWidth,
                        speed: 2500,
                        refreshInterval: 50
                    });
                });
            });
        }
    });

    // 3. Owl Carousel Initialization (Safely runs only if elements exist)
    var $owlCarousel = $('.owl-carousel');
    if ($owlCarousel.length && $.fn.owlCarousel) {
        $owlCarousel.owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            dots: false,
            autoplayTimeout: 8000
        });
    }

    // 4. Shuffle.js Filter & Masonry (Runs only when .shuffle-wrapper exists)
    var shuffleContainer = document.querySelector('.shuffle-wrapper');
    if (shuffleContainer && window.Shuffle) {
        var myShuffle = new window.Shuffle(shuffleContainer, {
            itemSelector: '.shuffle-item',
            buffer: 1
        });

        $('input[name="shuffle-filter"]').on('change', function (evt) {
            var input = evt.currentTarget;
            if (input.checked) {
                myShuffle.filter(input.value);
            }
        });
    }

    // 5. Magnific Popup (Runs only when gallery exists)
    var $portfolioGallery = $('.portfolio-gallery');
    if ($portfolioGallery.length && $.fn.magnificPopup) {
        $portfolioGallery.each(function () {
            $(this).find('.popup-gallery').magnificPopup({
                type: 'image',
                gallery: {
                    enabled: true
                }
            });
        });
    }

    // 6. Smooth Scrolling for Internal Anchor Links (e.g., #haberler)
    $('a[href^="#"]').on('click', function (e) {
        var targetId = $(this).attr('href');
        if (targetId && targetId !== '#' && targetId !== '#!') {
            var $target = $(targetId);
            if ($target.length) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: $target.offset().top - 80
                }, 600);
            }
        }
    });

    // 7. Swiper Testimonials Slider
    var $swiperContainer = $('.testimonials-swiper');
    if ($swiperContainer.length && typeof Swiper !== 'undefined') {
        new Swiper('.testimonials-swiper', {
            loop: true,
            speed: 700,
            autoplay: {
                delay: 4500,
                disableOnInteraction: false
            },
            slidesPerView: 1,
            spaceBetween: 24,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 24
                }
            }
        });
    }

})(jQuery);
