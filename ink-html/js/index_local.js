$("header").css("position", "relative");
//lading畫面+header樣式
$(function () {
    // $("body").css("overflow","hidden")
    // grain.init();
    // logofadeINout();
    // $(this).scrollTop(0);
    var timer = null;
    $(window).resize(function () {
        var width = $(window).width();
        window.clearTimeout(timer);
        timer = window.setTimeout(function () {
            if (width > 992) {
                if ($(".index-banner").children(".index-video").length > 0) {
                    $('header').eq(0).addClass('indexHeader')
                    $(".indexHeader").find(".logo-box img").attr("src", "images/white-logo.png")
                    // $(".indexHeader").find(".logo-box img").attr("src",BASE_PATH+"/src/images/white-logo.png")
                } else {
                    $('header').removeClass('indexHeader')
                }
            } else {
                $('header').removeClass('indexHeader')
                $("header").find(".logo-box img").attr("src", "images/logo.svg")
                // $("header").find(".logo-box img").attr("src",BASE_PATH+"/src/images/logo.svg")

            }
        }, 500);
    }).trigger("resize");
    // ShowFreeChatButton(true);
})

//雜訊
var grain = {
    init: function () {
        var _this = this;
        _this.patternSize = 400,
            _this.patternScaleX = .3,
            _this.patternScaleY = .3,
            _this.patternRefreshInterval = 6,
            _this.patternAlpha = 20,
            _this.canvas = document.querySelector(".grain"),
            _this.ctx = _this.canvas.getContext("2d"),
            _this.ctx.scale(_this.patternScaleX, _this.patternScaleY), _this.patternCanvas = document.createElement("canvas"), _this.patternCanvas.width = _this.patternSize, _this.patternCanvas.height = _this.patternSize, _this.patternCtx = _this.patternCanvas.getContext("2d"), _this.patternData = _this.patternCtx.createImageData(_this.patternSize, _this.patternSize), _this.patternPixelDataLength = _this.patternSize * _this.patternSize * 4, _this.resize = _this.resize.bind(_this), _this.loop = _this.loop.bind(_this), _this.frame = 0, window.addEventListener("resize", _this.resize), _this.resize(), window.requestAnimationFrame(_this.loop)
    },
    resize: function () {
        var _this = this;
        _this.canvas.width = window.innerWidth * devicePixelRatio, _this.canvas.height = window.innerHeight * devicePixelRatio
    },
    update: function () {
        var _this = this;
        for (var t = _this.patternPixelDataLength, e = _this.patternData, i = _this.patternAlpha, n = _this.patternCtx, s = 0; s < t; s += 4) {
            var r = 255 * Math.random();
            e.data[s] = r, e.data[s + 1] = r, e.data[s + 2] = r, e.data[s + 3] = i
        }
        n.putImageData(e, 0, 0)
    },
    draw: function () {
        var _this = this;
        var t = _this.ctx,
            e = _this.patternCanvas,
            i = _this.canvas,
            n = (_this.viewHeight, i.width),
            s = i.height;
        t.clearRect(0, 0, n, s), t.fillStyle = t.createPattern(e, "repeat"), t.fillRect(0, 0, n, s)
    },
    loop: function () {
        var _this = this;
        var t = ++_this.frame % _this.patternRefreshInterval == 0;
        t && (_this.update(), _this.draw()), window.requestAnimationFrame(_this.loop)
    }
};


//logo fadeINout
function logofadeINout() {
    $(".circle").fadeIn(1500, function () {
        $(this).toggleClass("fading");
    });

    //第一個點延遲一秒進場,其他依序.2秒進場
    $(".first").delay(1000).fadeIn(200);
    var start = 1000;
    var interval = 200;
    $(".dot").each(function () {
        $(this).delay(start).fadeIn(200);
        start += interval;
    });
    $("img").delay(2500).fadeIn(1000);
    //畫面離開
    $(".landing").delay(3500).fadeOut(1000);

    window.setTimeout(function () {
        $("header").css("position", "");
        $("body").css("overflow", "");
        $('html, body').scrollTop(0);
    }, 3600);

    window.setTimeout(function () {
        $("#Landing").remove();
        LoadGetButton();
    }, 4000);
}

//scrollDown
$('.scroller').click(function () {
    //不要讓網址掛上#id
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location
        .hostname === this.hostname) {
        let target = $(this.hash);
        target = target.length ? target : $('[name' + this.hash.slice(1) + ']');
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 100
            }, 500);
            return false;
        }
    }
});



// slick slide
$(function () {
    bannerSlide() ;
    rankingSlide();
})




function rankingSlide() {

    var rankingsOptions = {
        slidesToShow: 5,
        slidesToScroll: 5,
        arrows: true,
        responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
        ]
    }
    if (!$('.rankingSlidePen').hasClass('slick-initialized'))
        $('.rankingSlidePen').slick(rankingsOptions);

    if (!$('.rankingSlideInk').hasClass('slick-initialized'))
        $('.rankingSlideInk').slick(rankingsOptions);
}

function bannerSlide() {
    var bannerslickOptions = {
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
    }
    $('.indexSlide').slick(bannerslickOptions);
}
