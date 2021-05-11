var ClassNames$3={
    EXPANDED:'expand',
    OPENED:'opened',
    ISMOBILE:'is-mobile-mode'
};
var width;
var wH=$(window).innerHeight()

MobileNav();

//加入Scroll to top按鈕 +
$(function(){
    $('.wrapper').append('<a href="javascript: void(0)" class="scrollToTop"><i class="fas fa-chevron-up"></i></a>');
    var timer;

    $(document).on("scroll",function(){
        window.clearTimeout(timer)
        timer=window.setTimeout(function(){
            if($(window).scrollTop()>20){
                $('.scrollToTop').addClass('show');
            }else{
                $('.scrollToTop').removeClass('show');
            }
        },200)
    }).trigger("scroll")
            ;

    $('.scrollToTop').click(function(){
        $('html, body').animate({
            scrollTop:0
        },400);
        return false;
    });
});

function LoadGetButton()
{
    var options={
        facebook:"188573048408341",// Facebook page ID
        instagram:"inkhousehongkong",// Instagram username
        call_to_action:"Message us",// Call to action
        button_color:"#272727",// Color of button
        position:"right",// Position may be 'right' or 'left'
        order:"facebook,instagram",// Order of buttons
    };
    var proto=document.location.protocol,
            host="getbutton.io",
            url=proto+"//static."+host;
    var s=document.createElement('script');
    s.type='text/javascript';
    s.async=true;
    s.src=url+'/widget-send-button/js/init.js';
    s.onload=function(){
        WhWidgetSendButton.init(host,proto,options);
    };
    var x=document.getElementsByTagName('script')[0];
    x.parentNode.insertBefore(s,x);
    // GetButton.io 樣式
    $('body').append('<style>div[id^="gb-widget-"]{bottom:120px !important;}</style>');
}

// 導覽列樣式
$(function(){
    CloneNav()
    var timer=null;
    $(window).resize(function(){
        width=$(window).width();
        window.clearTimeout(timer);
        timer=window.setTimeout(function(){
            if(width>992){
                $("header").css("position","");
                $(".nav-box .nav").css("height","");
                $(".nav-box .nav").css("height","");
                
                // 桌機版導覽列hover效果
                $(".dropdown-btn").hover(function(){
                    $(this).addClass("active");
                    $(this).find(".dropdown-menu").addClass("show");
                },function(){
                    $(this).removeClass("active");
                    $(this).find(".dropdown-menu").removeClass("show");
                })

                $(window).on("scroll",function(){
                    $('.navOri').toggleClass('scrolling',$(window).scrollTop()>200);
                    $('.navClone').toggleClass('scrolling',$(window).scrollTop()>300);
                })


            }else{
                $(window).off("scroll").on("scroll");
                $("header").removeClass("scrolling");
                $(".dropdown-btn").unbind('mouseenter').unbind('mouseleave');
            }

        },500);
    }).trigger("resize");
})

//導覽列複製
function CloneNav(){
    $('header').after($('header').clone());
    $('header').eq(0).addClass('navOri')
    $('header').eq(1).addClass('navClone').removeAttr('id');
    $('header').eq(1).find($(".nav-top")).remove();
}

$(function(){
    //側邊購物車視窗展開
    $('.shoppingcartBtn').on("click",function(){
        // if(RebuldCartDrawer("#cart_drawer",".cart_badge"))
        {
            // ShowFreeChatButton(false);

            var headH=$(".shopping-drawer-header").outerHeight();
            var feeH=$(".fee-box").outerHeight();
            var summaryH=$(".summary-box").outerHeight();
            wH=$(window).innerHeight()
            var allH=parseInt(wH-(headH+feeH+summaryH));
            $(".cart-drawer-list").css("height",allH)
            $(".shopping-cart-drawer").addClass(ClassNames$3.OPENED);
            $("html").addClass(ClassNames$3.ISMOBILE);
        }
    })

    $('#cartClose, .close-element').on("click",function(){
        $(".shopping-cart-drawer").removeClass(ClassNames$3.OPENED);
        $(".cart-drawer-list").css("height","auto")
        // ShowFreeChatButton(true);
    })

    //篩選器視窗
    $('#filterBtn').on("click",function(){
        $(".filter-nav").addClass(ClassNames$3.OPENED);
        $("html").addClass(ClassNames$3.ISMOBILE);
    })

    $('.toggle-close-btn, .close-element').on("click",function(){
        $(".filter-nav").removeClass(ClassNames$3.OPENED);

    })
})

// 關閉元素
$('.close-element, #cartClose').on("click",function(){
    $("html").removeClass(ClassNames$3.ISMOBILE);
    // $(document).find(ClassNames$3.EXPANDED).removeClass(ClassNames$3.EXPANDED);
    $(document).find(".expand").removeClass(ClassNames$3.EXPANDED);
    $(document).find(".opened").removeClass(ClassNames$3.OPENED);
    // ShowFreeChatButton(true);
})

// 商品頁篩選器開關
$(function(){
    $(".filterHeader").on("click",function(){
        var $this=$(this);
        var Option=$this.siblings(".filterOption");
        Option.slideToggle("easing",function(){
            if(Option.hasClass("show"),$this.hasClass("on")){
                Option.removeClass("show");
                $this.removeClass("on");
            }else{
                Option.addClass("show")
                $this.addClass("on");
            }
        })
    })
})

//手機版導覽列控制
function MobileNav(){
    // 手機版導覽列點擊展開submenu
    $(".icon").on("click",function(){
        $(this).parent(".dropdown-btn").toggleClass(ClassNames$3.EXPANDED);
        $(this).siblings(".dropdown-menu").toggleClass(ClassNames$3.OPENED);
    })
    //手機導覽列展開
    $('#menuToggle').on("click",function(){
        var headH=$(".mob-nav-logo").outerHeight();
        var lanH=$(".mob-lan-box .lan-box").outerHeight();
        wH=$(window).innerHeight();
        var allH=parseInt(wH-(headH+lanH));
        $(".nav-box .nav").css("height",allH);
        $(this).toggleClass(ClassNames$3.EXPANDED);
        $('.main-nav').toggleClass(ClassNames$3.EXPANDED);
        $("html").toggleClass(ClassNames$3.ISMOBILE);
        ShowFreeChatButton(false);
    })
    //手機導覽列關閉
    $('.mob-nav-btn').on("click",function(){
        $("#menuToggle, .main-nav").removeClass(ClassNames$3.EXPANDED);
        $("html").removeClass(ClassNames$3.ISMOBILE);
        $(".dropdown-btn").removeClass(ClassNames$3.EXPANDED);
        $(".dropdown-menu").removeClass(ClassNames$3.OPENED);
        ShowFreeChatButton(true);

    })
    //手機搜尋列
    $("#search-btn-mob").on("click",function(){
        $(".search-box").toggleClass(ClassNames$3.EXPANDED);
    })
}

//判斷手機行動裝置
function isMobile(){
    return (
            (navigator.userAgent.match(/Android/i))||
            (navigator.userAgent.match(/webOS/i))||
            (navigator.userAgent.match(/iPhone/i))||
            (navigator.userAgent.match(/iPod/i))||
            //  (navigator.userAgent.match(/iPad/i)) ||
                    (navigator.userAgent.match(/BlackBerry/))
                    );
}


//測試
// $(document).on('click', function (e) {
//   console.log($(e.target));
// })

// $(function () {
// var timer = null;
// $(window).resize(function () {
//   var width = $(window).width();
//   window.clearTimeout(timer);
//   timer = window.setTimeout(function () {
//     if (width > 992 ) {
//       console.log("我是桌機")

//       }else {
//       console.log("我是手機+按鈕可動")

//       }
//   }, 500);
// }).trigger("resize");
// })

// document.addEventListener("DOMContentLoaded", function() {
//    console.log($( "div[id*='gb-widget-']").attr("id"))
// });


