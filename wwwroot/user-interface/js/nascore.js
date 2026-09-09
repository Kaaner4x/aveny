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

    // 2. Animated Progress Bars (Triggered when scrolled into viewport)
    function initProgressBars() {
        var $progressItems = $('.modern-progress-item');
        if (!$progressItems.length) return;

        function animateBar(item) {
            var $item = $(item);
            var $bar = $item.find('.modern-progress-bar, .modern-progress-fill');
            var $badge = $item.find('.progress-badge');
            var targetWidth = parseInt($bar.attr('data-percent'), 10) || 0;

            if (!$bar.hasClass('animated')) {
                $bar.addClass('animated');
                $bar.attr('aria-valuenow', targetWidth);

                // Set initial width to 0
                $bar.css('width', '0%');

                // Frame-by-frame smooth jQuery animation, synchronously driving both the bar width and the percentage badge
                $bar.stop().animate({
                    width: targetWidth + '%'
                }, {
                    duration: 1400,
                    easing: 'swing',
                    step: function (now) {
                        if ($badge.length) {
                            $badge.text(Math.round(now) + '%');
                        }
                    },
                    complete: function () {
                        $bar.css('width', targetWidth + '%');
                        if ($badge.length) {
                            $badge.text(targetWidth + '%');
                        }
                    }
                });
            }
        }

        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        animateBar(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.15,
                rootMargin: '0px 0px -20px 0px'
            });

            $progressItems.each(function () {
                observer.observe(this);
            });
        } else {
            // Fallback: Scroll bazlı kontrol
            $(window).on('scroll', function () {
                var windowBottom = $(window).scrollTop() + $(window).height();
                $progressItems.each(function () {
                    if (windowBottom > $(this).offset().top + 40) {
                        animateBar(this);
                    }
                });
            }).trigger('scroll');
        }
    }

    $(document).ready(function () {
        initProgressBars();
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
    function initShuffle() {
        var shuffleContainer = document.querySelector('.shuffle-wrapper');
        if (shuffleContainer && window.Shuffle) {
            var myShuffle = new window.Shuffle(shuffleContainer, {
                itemSelector: '.shuffle-item',
                buffer: 1
            });

            // Resimler yüklendiğinde layout'u tekrar hesapla
            $(window).on('load', function () {
                myShuffle.update();
            });

            // Hem input change hem de Bootstrap radio label click için sağlamlaştırılmış filtre tetikleyici
            $(document).on('change', 'input[name="shuffle-filter"]', function (evt) {
                var val = $(this).val();
                myShuffle.filter(val);
            });

            $('.portfolio .btn-group label.btn').on('click', function () {
                var $btn = $(this);
                $btn.addClass('active').siblings().removeClass('active');
                var val = $btn.find('input[name="shuffle-filter"]').val();
                if (val) {
                    myShuffle.filter(val);
                }
            });
        }
    }

    $(document).ready(function () {
        initShuffle();
    });

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

    // 6. Smooth Scrolling for Internal Anchor Links (e.g., #haberler, #iletisim)
    $(document).on('click', 'a[href^="#"]', function (e) {
        var targetId = $(this).attr('href');
        // Sayfalama veya sahte link (#, #!) tıklandığında sayfanın en üstüne zıplamasını engelle
        if (targetId === '#' || targetId === '#!') {
            e.preventDefault();
            return;
        }

        if (targetId && targetId.length > 1) {
            var $target = $(targetId);
            if ($target.length) {
                e.preventDefault();
                $('.navbar-collapse.show').collapse('hide');
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

