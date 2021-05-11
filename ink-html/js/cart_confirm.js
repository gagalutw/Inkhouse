$(function () {
    var timer = null;
    var scrollTimer= null; 
    var width = $(window).width();
    var iWinScroll = $(this).scrollTop();

    $(window).on("resize", function () {
        if (timer) {
            window.clearTimeout(timer);
        }
        timer = window.setTimeout(function () {
            width = $(window).width();

            if (width <= 768) {
                //小於768複製
                if( $(".mob-priceBox").length <=0){
                    $('.delivery-block .form-block').after($('.summaryInfo').clone()
                    .addClass("mob-priceBox"));
                $(".mob-priceBox").find("p._data, ._flexbox, .third-title").remove();
                }

                $(document).on("scroll", function () {
                    if (scrollTimer) {
                        window.clearTimeout(scrollTimer);
                    }
                    scrollTimer = window.setTimeout(function(){
                    iWinScroll = $(this).scrollTop();

                    if (width > 769) {
                        return false;
                    }
                    if (iWinScroll > 500) {
                        $('.mob-priceBox').addClass('show');
                    } else {
                        $('.mob-priceBox').removeClass('show');
                    }

                    if (iWinScroll > 1500) {
                        $('.mob-priceBox').removeClass('show');
                    }
                }, 100);

            })

            } else {
                $(".mob-priceBox").remove();
                return false;
            }
        }, 500);
    }).trigger("resize");
})

