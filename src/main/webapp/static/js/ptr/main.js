
// main home.js
import HTTP_STATUS from './httpStatus.js';
import API from './api.js';
import VIEW from "./page.js";
import { getAjax, postAjax, putAjax, deleteAjax } from "./ajax.js";
import { swalPopup } from "./swal.js";


// =========== 변수 레이어 ===========
const miniHompi = $("#");
const giftPage = $("#giftPage");
const cartPage = $("#cartPage");
const noticePage = $("#noticePage");
const aboutUsPage = $("#aboutUsPage");

// =========== 이벤트 레이어 ===========
// 선물상점 페이지 이동

$(document).ready(function () {

    menuClickEvent();

});

// =========== 함수 레이어 ===========
function menuClickEvent() {
    giftPage.click(function (){
        location.href = VIEW.GIFT_SHOP;
    });
    cartPage.click(function (){
        location.href = VIEW.CART;
    });
    noticePage.click(function (){
        location.href = VIEW.NOTICE;
    });
    aboutUsPage.click(function (){
        location.href = VIEW.ABOUT_US;
    });
}
