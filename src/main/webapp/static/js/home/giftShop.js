//최근 본 아이템 슬라이드
const recentSwiper = new Swiper("#recent-item-swiper", {
    direction: "vertical",
    slidesPerView: 2,
    spaceBetween: 25,
    mousewheel: true,
    resistanceRatio: 0.5,
});
//카트 아이템리스트 슬라이드
const itemBuySwiper = new Swiper("#item-swiper", {
    direction: "vertical",
    slidesPerView: 2.5,
    spaceBetween: 25,
    mousewheel: true,
    resistanceRatio: 0.5,
});


$(function () {
    // 선물함 메뉴 효과
    $(".top-header-menu .tab").on("click", function () {
        $(".top-header-menu .tab").removeClass("active");
        $(this).addClass("active");
    });

    //최근 본 아이템 위아래
    $('#up-arrow').on("click", function () {
        recentSwiper.slidePrev();
    })
    $('#down-arrow').on("click", function () {
        recentSwiper.slideNext()
    })

    //장바구니 아이템 위아래
    $('#item-up-arrow').on("click", function () {
        itemBuySwiper.slidePrev();
    })
    $('#item-down-arrow').on("click", function () {
        itemBuySwiper.slideNext()
    })
});


