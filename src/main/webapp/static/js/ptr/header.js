import VIEW from "./page.js";
import API from './api.js';
import { getAjax, fetchThen } from "./ajax.js";
import { swalPopup } from "./swal.js";

// =========== 변수 레이어 ===========

// 메뉴 관련 요소
const minihompi             = $("#minihompi,    #minihompi2");
const giftPage              = $("#giftPage,     #giftPage2");
const cartPage              = $("#cartPage,     #cartPage2");
const noticePage            = $("#noticePage,   #noticePage2");
const aboutUsPage           = $("#aboutUsPage,  #aboutUsPage2");
const signUpButtons         = $("#signupBtn,    #signupBtn2");
const dotoriRechargeBtn     = $("#rechargePageBtn");

// 미니홈피 팝업 스펙
const HOMPI_WIDTH   = 1280;
const HOMPI_HEIGHT  = 720;
const HOMPI_LEFT    = Math.ceil((window.screen.width - HOMPI_WIDTH) / 2);
const HOMPI_TOP     = Math.ceil((window.screen.height - HOMPI_HEIGHT) / 2);

// =========== 실행 레이어 ===========
$(document).ready(() => {

    // 메뉴 클릭 이벤트 설정
    componentClickEvent();

});

// 미니홈피 팝업 오픈 함수
function openPop() {
    const specs = `width=${HOMPI_WIDTH},height=${HOMPI_HEIGHT},left=${HOMPI_LEFT},top=${HOMPI_TOP}`;
    getAjax(
        API.MINI_HOMPI,
        (response) => {
            if (response.hompiId) {
                window.open(`/mini-hompi/main/${response.hompiId}`, 'mini-hompi', specs);
            } else {
                swalPopup('미니홈피', '미니홈피 정보를 불러오는데 실패했습니다.', 'error', '확인');
            }
        },
        (error) => {
            swalPopup('미니홈피', '로그인 후 열어주세요', 'error', '확인')
                .then(() => {
                    location.href = "/";
                });
        }
    );
}

// 메뉴 클릭 이벤트: 각 요소 클릭 시 지정된 페이지로 이동하거나 기능 실행
function componentClickEvent() {
    minihompi.click(()          => openPop());
    giftPage.click(()           => (location.href = VIEW.GIFT_SHOP));
    cartPage.click(()           => (location.href = VIEW.CART));
    noticePage.click(()         => (location.href = VIEW.NOTICE));
    aboutUsPage.click(()        => (location.href = VIEW.ABOUT_US));
    signUpButtons.click(()      => (location.href = VIEW.SIGN_UP));
    dotoriRechargeBtn.click(()  => (location.href = VIEW.RECHARGE));
}
