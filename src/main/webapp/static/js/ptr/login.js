
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

// =========== 함수 정의 레이어 ===========

// 로그인
function login() {

    const LoginDTO = JSON.stringify({
        loginId: loginId.val(),
        password: password.val()
    });

    postAjax(API.LOGIN, LoginDTO, function(response) {

        if(response.status === HTTP_STATUS.OK.code) {
            swalPopup('로그인 성공', '로그인 성공하였습니다.', 'success', '확인', '닫기')
                .then((result) => {
                    if(result.isConfirmed) {
                        location.reload();  // 확인 버튼 누르면 html reload
                    }
                });
        } else if (response.status === HTTP_STATUS.NOT_FOUND.code) {
            swalPopup('로그인 실패', '로그인 정보를 확인해주세요.', 'error', '확인', '닫기');
        } else if (response.status === HTTP_STATUS.SERVER_ERROR.code) {
            swalPopup('로그인 실패', '서버 오류가 발생하였습니다.', 'error', '확인', '닫기');
        } else {
            swalPopup('로그인 실패', '로그인 정보를 확인해주세요.', 'error', '확인', '닫기');
        }
    });
}

// 로그아웃
function logout() {

    postAjax(API.LOGOUT, null,function(response) {

        if(response.status === HTTP_STATUS.OK.code) {
            swalPopup('로그아웃 성공', '로그아웃 성공하였습니다.', 'success', '확인', '닫기')
                .then((result) => {
                    if(result.isConfirmed) {
                        location.reload();  // 확인 버튼 누르면 html reload
                    }
                });
        } else if (response.status === HTTP_STATUS.NOT_FOUND.code) {
            swalPopup('로그아웃 실패', '로그아웃 정보를 확인해주세요.', 'error', '확인', '닫기');
        } else if (response.status === HTTP_STATUS.SERVER_ERROR.code) {
            swalPopup('로그아웃 실패', '서버 오류가 발생하였습니다.', 'error', '확인', '닫기');
        } else {
            swalPopup('로그아웃 실패', '로그아웃 정보를 확인해주세요.', 'error', '확인', '닫기');
        }
    });
}
