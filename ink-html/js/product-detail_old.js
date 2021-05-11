var slideN = $(".productSlide .img-box").length;
var Box = $(".product-content");
var infoW = $(".productSlide").width(); //右邊商品簡介寬度
var width = $(window).width();


// 商品頁色票展開
$('#swatchBtn').on("click", function () {
    $("#swatchBox").addClass(ClassNames$3.EXPANDED);
    var boxH = $(".swatch-box").outerHeight();
    $("#swatchBox").css("height", boxH);
})

$('#CloseswatchBox').on("click", function () {
    $("#swatchBox").css("height", "108px");
})


var colorAmount = $(".swatch-box").children("a").length;
if (colorAmount <= 4) {
    $('#swatchBtn').hide()
}

$(function () {
    createNav();
    slideFixed();
    $('body').scrollspy({
        target: '#slideNav',
        offset: 108
    })

    //slick slide 參數
    // 商品圖
    var slickOptions = {
        slidesToShow: 1,
        slidesToScroll: 1,
        mobileFirst: true,
        dots: true,
        arrows: false,
        responsive: [{
            breakpoint: 992,
            settings: 'unslick'
        }]
    }

    var timer = null;
    $(window).resize(function () {
        width = $(window).width();
        infoW = $(".productSlide").width(); //右邊商品簡介寬度
        if (timer) {
            window.clearTimeout(timer);
        }
        timer = window.setTimeout(function () {
            if (width > 992) {
                //RWD拖曳商品資訊寬度變化
                if ($(".product-content").hasClass("entered"))
                    $(".productInfo-wrap").css("width", infoW)
                //重新監聽
                $('body').scrollspy({
                    target: '#slideNav',
                    offset: 108
                })

            } else {
                if (!$('.productSlide').hasClass('slick-initialized'))
                    $('.productSlide').slick(slickOptions);
                $(".productInfo-wrap").css("width", "")
                //解除監聽
                $('body').scrollspy('dispose')
            }
        }, 500);
    }).trigger("resize")
})


//取slide數量 產生nav-link點點結構
function createNav() {
    if ($(".productSlide .img-box").length > 0) {
        //取slide數量
        slideN = $(".productSlide .img-box").length;
        var navDot = '';

        //取slide數量 產生nav-link點點結構
        for (var i = 0; i < slideN; i++) {
            navDot = '<li class="nav-item"><a href="#p0' + (i + 1) + '" class="nav-link"></a></li>';
            $('#slideNav').append(navDot);
        }

        //取slide的index+1 動態增加id
        $(".productSlide .img-box").each(function (idx, item) {
            $(this).attr("id", "p0" + (idx + 1))
        });

        // 側欄選單滾動動畫
        $('#slideNav a').click(function () {
            //不要讓網址掛上#id
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location
                .hostname === this.hostname) {
                let target = $(this.hash);
                target = target.length ? target : $('[name' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top - 88
                    }, 500);
                    return false;
                }
            }
        });
    }
}


// slide吸住上方
function slideFixed() {
    var timer = null;
    var scrollTimer = null;

    var navN = $("#slideNav .nav-item").length;
    var navH = $(".navClone").outerHeight(); //第二個nav高度
    var Box = $(".product-content");
    var iWinScroll; //捲軸捲動高度
    var windowH = $(window).innerHeight(); //瀏覽器可視高度
    var BoxH = Box.outerHeight(); //Box高度
    var BoxOffsetTop = parseInt(Box.offset().top); //Box距離視窗頂部高度
    var lastImgbox = $(".productSlide .img-box").eq(navN - 1); //最後slide
    var lastImgboxOffsetTop = parseInt(lastImgbox.offset().top) //最後slide上方距離視窗頂部高度

    $(window).on("resize", function () {
        width = $(window).width();
        if (timer) {
            window.clearTimeout(timer);
        }
        timer = window.setTimeout(function () {
            width = $(window).width();

            if (width <= 992) {
                console.log("小於992")
                Box.removeClass("entered");
                Box.removeClass("active");
                return false;
            } 
            else {
                $(document).on("scroll", function () {
                    if (scrollTimer) {
                        window.clearTimeout(scrollTimer);
                    }
                    scrollTimer = window.setTimeout(function () {
                        // console.log("滾動");
                        infoW = $(".productSlide").width();
                        iWinScroll = $(this).scrollTop();
                        BoxOffsetTop = parseInt(Box.offset().top); //Box距離視窗頂部高度
                        lastImgboxOffsetTop = parseInt(lastImgbox.offset().top) //最後slide上方距離視窗頂部高度
                        navH = $(".navClone").outerHeight()
                        var scrollH = windowH - iWinScroll //捲到BOX
                        var BoxEntered = BoxOffsetTop - navH; //BOX碰到Nav2 (108)
                        var BoxLeft = scrollH + BoxH; //50是margin-top


                        // Box進入
                        if (BoxOffsetTop - scrollH >= 108 && scrollH - BoxEntered + BoxH > 0) {
                            $(".productInfo-wrap").css("width", infoW);
                            Box.addClass("entered")
                            //還在BOX內-進入最後一張
                            if (lastImgboxOffsetTop - iWinScroll - navH - 20 <= 0) {
                                Box.addClass("active")

                            }
                            //還沒最後一張
                            else {
                                Box.removeClass("active")
                            }
                        }

                        //BOX還沒進入
                        else if (BoxLeft - BoxEntered - navH >= 0) {
                            Box.removeClass("entered")
                            $(".productInfo-wrap").css({
                                "width": ""
                            })
                        }

                        // BOX完全離開
                        else if (BoxEntered - iWinScroll - BoxH <= 0) {
                            //  console.log("完全離開")
                            Box.removeClass("entered active")
                            $(".productInfo-wrap").css({
                                "width": ""
                            })
                        } else {
                            // console.log("完全離開")
                            Box.removeClass("entered active")
                            $(".productInfo-wrap").css({
                                "width": ""
                            })
                        }
                    }, 10)
                })
            }

        }, 500)

    }).trigger("resize");
}
