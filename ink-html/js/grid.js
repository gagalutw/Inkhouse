
    $(function () {
        var slickOptions = {
            slidesToShow: 2,
            slidesToScroll: 2,
            mobileFirst: true,
            dots: true,
            arrows: false,
            responsive: [{
                breakpoint: 992,
                settings: 'unslick'
            }]
        }
        var timer = null;
        $(window).on('resize', function () {
            var width = $(window).width();
            window.clearTimeout(timer);
            timer = window.setTimeout(function () {
                if (width < 992) {
                    $('.slideFour').slick(slickOptions);
                } else {

                }
            }, 500);
        }).trigger("resize");
    });
