var slideN=$(".productSlide .img-box").length;
var Box=$(".product-content");
var infoW=$(".productSlide").width(); //右邊商品簡介寬度
var width=$(window).width();

// 商品頁色票展開
$('#swatchBtn').on("click",function(){
    $("#swatchBox").addClass(ClassNames$3.EXPANDED);
    var boxH=$(".swatch-box").outerHeight();
    $("#swatchBox").css("height",boxH);
})

$('#CloseswatchBox').on("click",function(){
    $("#swatchBox").css("height","108px");
})


var colorAmount=$(".swatch-box").children("a").length;
if(colorAmount<=4){
    $('#swatchBtn').hide()
}

$(function(){
    createNav();
    slideFixed();
    $('body').scrollspy({
        target:'#slideNav',
        offset:108
    })

    //slick slide 參數
    // 商品圖
    var slickOptions={
        slidesToShow:1,
        slidesToScroll:1,
        mobileFirst:true,
        dots:true,
        arrows:false,
        responsive:[{
                breakpoint:992,
                settings:'unslick'
            }]
    }

    var timer=null;
    $(window).resize(function(){
        width=$(window).width();
        var infoW=$(".productSlide").width() + 50; //右邊商品簡介寬度
        if(timer){
            window.clearTimeout(timer);
        }
        timer=window.setTimeout(function(){
            if(width>992){
              infoW=$(".productSlide").width() + 50; //右邊商品簡介寬度
                //RWD拖曳商品資訊寬度變化
                console.log(infoW)
                $(".productInfo").css("width",infoW)
                //重新監聽
                $('body').scrollspy({
                    target:'#slideNav',
                    offset:108
                })

            }else{
                if(!$('.productSlide').hasClass('slick-initialized'))
                    $('.productSlide').slick(slickOptions);
                $(".productInfo").css("width","")
                //解除監聽
                $('body').scrollspy('dispose')
            }
        },500);
    }).trigger("resize")
})


//取slide數量 產生nav-link點點結構
function createNav(){
    if($(".productSlide .img-box").length>0){
        //取slide數量
        slideN=$(".productSlide .img-box").length;
        var navDot='';

        //取slide數量 產生nav-link點點結構
        for(var i=0;i<slideN;i++){
            navDot='<li class="nav-item"><a href="#p0'+(i+1)+'" class="nav-link"></a></li>';
            $('#slideNav').append(navDot);
        }

        //取slide的index+1 動態增加id
        $(".productSlide .img-box").each(function(idx,item){
            $(this).attr("id","p0"+(idx+1))
        });

        // 側欄選單滾動動畫
        $('#slideNav a').click(function(){
            //不要讓網址掛上#id
            if(location.pathname.replace(/^\//,'')===this.pathname.replace(/^\//,'')&&location
                    .hostname===this.hostname){
                let target=$(this.hash);
                target=target.length?target:$('[name'+this.hash.slice(1)+']');
                if(target.length){
                    $('html, body').animate({
                        scrollTop:target.offset().top-88
                    },500);
                    return false;
                }
            }
        });
    }
}

$(window).on("resize",function(){
    slideFixed();
})

$(document).on("scroll",function(){
    slideFixed();
})

// slide吸住上方
function slideFixed(){
    width=$(window).outerWidth();
    if(width>992){
        var l_img=$(".productSlide");
        var l_top=$(".productSlide-block").offset().top;
        var l_bottom=l_top+$(".productSlide-block").outerHeight();
        var r_height=$(".productInfo").outerHeight();
        var r_bottom=l_bottom-r_height;
        var navH=$(".navClone").outerHeight()+30;
        var scrollVal=$(this).scrollTop()+navH;
        if(scrollVal>l_top)
        {
            if((scrollVal-r_bottom)<0)
            {
                $(".productInfo").css({"position":"fixed","top":navH});
                $(".productSlide-block .slide-nav-pill").css({"position":"fixed","top":navH+50});
                 l_img.css({"margin-left":"50px"});
            }else
            {
                // console.log("離開")
                $(".productInfo").css({"position":"relative","top":r_bottom-l_top});
                $(".productSlide-block .slide-nav-pill").css({"position":"relative","top":""});
                l_img.css({"margin-left":""});
            }
        }else
        {
            // console.log("還沒進入")
            $(".productInfo").css({"position":"static"});
            $(".productSlide-block .slide-nav-pill").css({"position":"static","top":""});
            l_img.css({"margin-left":""});

        }
    }else
    {
        $(".productInfo").css({"position":"static"});
        $(".productSlide-block .slide-nav-pill").css({"position":"static"});

    }
    return;
}
