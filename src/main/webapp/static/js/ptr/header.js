import VIEW from "./page.js";

// =========== 변수 레이어 ===========

// 메뉴 관련 요소
const miniHompi             = $("#miniHompi,    #miniHompi2");
const giftPage              = $("#giftPage,     #giftPage2");
const cartPage              = $("#cartPage,     #cartPage2");
const noticePage            = $("#noticePage,   #noticePage2");
const aboutUsPage           = $("#aboutUsPage,  #aboutUsPage2");
const signUpButtons         = $("#signupBtn,    #signupBtn2");
const dotoriRechargeBtn     = $("#rechargePageBtn");

// =========== 실행 레이어 ===========
$(document).ready(() => {

    // 메뉴 클릭 이벤트 설정
    componentClickEvent();

});



// 메뉴 클릭 이벤트: 각 요소 클릭 시 지정된 페이지로 이동하거나 기능 실행
function componentClickEvent() {
    miniHompi.click(()          => openPop());
    giftPage.click(()           => (location.href = VIEW.GIFT_SHOP));
    cartPage.click(()           => (location.href = VIEW.CART));
    noticePage.click(()         => (location.href = VIEW.NOTICE));
    aboutUsPage.click(()        => (location.href = VIEW.ABOUT_US));
    signUpButtons.click(()      => (location.href = VIEW.SIGN_UP));
    dotoriRechargeBtn.click(()  => (location.href = VIEW.RECHARGE));
}
