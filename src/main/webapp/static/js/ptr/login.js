
// login js - 250326 patrick

import HTTP_STATUS from './httpStatus.js';
import API from './api.js';
import { getAjax, postAjax, putAjax, deleteAjax } from "./ajax.js";
import { swalPopup } from "./swal.js";

// =========== 변수 레이어 ===========
const loginId = $('#loginId');
const password = $('#password');
const loginBtn = $('#loginBtn');
const logoutBtn = $('#logoutBtn');

// =========== 프로세스 레이어 ===========
$(document).ready(function() {

    loginBtn.click(function() {
        login();
    });

    logoutBtn.click(function() {
        logout();
    });


});


// =========== 이벤트 리스너 레이어 ===========



// =========== 함수 정의 레이어 ===========

// 로그인
function login() {

    console.log(loginId.val());
    console.log(password.val());

    const LoginDTO = JSON.stringify({
        loginId: loginId.val(),
        password: password.val()
    });

    postAjax(API.LOGIN, LoginDTO, function(response) {

        console.log("response", response)
        console.log("code", response.code)
        console.log("status", response.status)
        console.log("data", response.data)

        if(response.status === HTTP_STATUS.OK.code) {
            console.log(HTTP_STATUS.OK.message)
            swalPopup('로그인 성공', '로그인 성공하였습니다.', 'success', '확인', '닫기');
        } else if (response.status === HTTP_STATUS.NOT_FOUND.code) {
            console.log(HTTP_STATUS.BAD_REQUEST.message)
            swalPopup('로그인 실패', '로그인 정보를 확인해주세요.', 'error', '확인', '닫기');
        } else if (response.status === HTTP_STATUS.SERVER_ERROR.code) {
            console.log(HTTP_STATUS.SERVER_ERROR.message)
            swalPopup('로그인 실패', '서버 오류가 발생하였습니다.', 'error', '확인', '닫기');
        } else {
            console.log('로그인 실패');
            swalPopup('로그인 실패', '로그인 정보를 확인해주세요.', 'error', '확인', '닫기');
        }
    });
}

// 로그아웃
function logout() {
    getAjax(API.LOGOUT, function(response) {
        if(response.status === HTTP_STATUS.OK.code) {
            console.log(HTTP_STATUS.OK.message)
            swalPopup('로그아웃 성공', '로그아웃 성공하였습니다.', 'success', '확인', '닫기');
        } else if (response.status === HTTP_STATUS.NOT_FOUND.code) {
            console.log(HTTP_STATUS.BAD_REQUEST.message)
            swalPopup('로그아웃 실패', '로그아웃 정보를 확인해주세요.', 'error', '확인', '닫기');
        } else if (response.status === HTTP_STATUS.SERVER_ERROR.code) {
            console.log(HTTP_STATUS.SERVER_ERROR.message)
            swalPopup('로그아웃 실패', '서버 오류가 발생하였습니다.', 'error', '확인', '닫기');
        }
    });
}
