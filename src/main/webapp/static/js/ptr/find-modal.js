import API from './api.js';
import { queryPostAjax } from './ajax.js';
import { swalPopup } from "./swal.js";

// --- DOM 객체 ---
let $findIdAndPw,    $findIdClose, $tabFindId;
let $findPwdClose,   $tabFindPwd,  $modal;
let $findIdForm,     $findPwdForm, $birthYear;
let $birthDay,       $findIdBtn,   $name;
let $gotoChangePwd,  $changePwd,   $userId;
let $showIdLayer,    $newPwdCheck, $codeCheck;
let $emailCheck,     $birthMonth,  $emailSend;
let $changePwdLayer, $foundId,     $newPwd,     $email;

let verificationCode = "";

$(document).ready(() => {

    // DOM 객체 참조
    $findIdAndPw   = $('#findIdAndPw');
    $modal         = $('#modal-layer');
    $findIdClose   = $('#findIdClose');
    $findPwdClose  = $('#findPwdClose');
    $tabFindId     = $('#tab-find-id');
    $tabFindPwd    = $('#tab-find-pwd');
    $findIdForm    = $('#find-id-form');
    $findPwdForm   = $('#find-pwd-form');
    $birthYear     = $('#birth-year');
    $birthMonth    = $('#birth-month');
    $birthDay      = $('#birth-day');
    $findIdBtn     = $('#findId');
    $showIdLayer   = $('#show-id-layer');
    $foundId       = $('#found-id');
    $gotoChangePwd = $('#gotoChangePwd');
    $userId        = $('#userId');
    $name          = $('#name');
    $email         = $('#email');
    $emailSend     = $('#emailSend');
    $codeCheck     = $('#codeCheck');
    $emailCheck    = $('#emailCheck');
    $changePwdLayer= $('#change-pwd-layer');
    $newPwd        = $('#newPwd');
    $newPwdCheck   = $('#newPwdCheck');
    $changePwd     = $('#changePwd');

    // 이벤트 핸들러 등록
    $findIdAndPw.on     ('click', e  => { e.preventDefault(); openModal(); });
    $findIdClose.on     ('click', e  => { e.preventDefault(); closeModal(); });
    $findPwdClose.on    ('click', e  => { e.preventDefault(); closeModal(); });
    $emailSend.on       ('click', () => { sendVerificationCode(); });
    $changePwd.on       ('click', () => { changePassword(); });
    $emailCheck.on      ('click',         checkVerificationCode);
    $tabFindPwd.on      ('click',         switchToPwdTab);
    $gotoChangePwd.on   ('click',         switchToPwdTab);
    $tabFindId.on       ('click',         switchToIdTab);
    $findIdBtn.on       ('click',         findId);

    if (!$('#passwordMessage').length) {
        $newPwdCheck.after (
            '<div id="passwordMessage" style="margin-top:5px; font-size:0.9em;"></div>'
        );
    }
    $newPwd.on      ('input', updatePasswordMessage);
    $newPwdCheck.on ('input', updatePasswordMessage);

    populateDateSelects();
});


// --- 기능 함수들 ---

function openModal() {
    $modal.css('display', 'block');
}

function closeModal() {
    $modal.css('display', 'none');
    reset();
}

function reset() {
    $name.val                  ('');
    $email.val                 ('');
    $userId.val                ('');
    $newPwd.val                ('');
    $birthDay.val              ('');
    $codeCheck.val             ('');
    $birthYear.val             ('');
    $birthMonth.val            ('');
    $newPwdCheck.val           ('');
    $foundId.text              ('');
    $('#passwordMessage').text ('');
    $showIdLayer.css           ('display', 'none');
    $changePwdLayer.css        ('display', 'none');
}

function switchToIdTab() {
    $tabFindId.addClass     ('active');
    $tabFindPwd.removeClass ('active');
    $findIdForm.css         ('display', 'block');
    $findPwdForm.css        ('display', 'none');
}

function switchToPwdTab() {
    $tabFindPwd.addClass    ('active');
    $tabFindId.removeClass  ('active');
    $findPwdForm.css        ('display', 'block');
    $findIdForm.css         ('display', 'none');
}

function populateDateSelects() {
    const currentYear = new Date().getFullYear();
    for (let y = currentYear; y >= 1920; y--) {
        $birthYear.append($('<option>', { value: y, text: y }));
    }
    for (let m = 1; m <= 12; m++) {
        $birthMonth.append($('<option>', { value: m, text: m }));
    }
    for (let d = 1; d <= 31; d++) {
        $birthDay.append($('<option>', { value: d, text: d }));
    }
}

function findId() {
    const nameVal = $name.val().trim(),
        yearVal = $birthYear.val(),
        monthVal = $birthMonth.val(),
        dayVal = $birthDay.val();

    const birthDate = `${yearVal}${monthVal}${dayVal}`;

    if (!nameVal || !yearVal || !monthVal || !dayVal) {
        swalPopup('아이디 찾기', '이름과 생년월일을 모두 입력해주세요.', 'warning', '확인');
        return;
    }

    queryPostAjax(API.FIND_USERID,
        '?' + $.param({ name: nameVal, birthDate: birthDate }),
        data => {
            $foundId.text(data.id);
            $showIdLayer.css('display', 'block');
        },
        err => {
            swalPopup('아이디 찾기', '일치하는 정보가 없습니다.', 'error', '확인');
        }
    );
}

function sendVerificationCode() {
    const emailVal = $email.val().trim(),
        userIdVal = $userId.val().trim();

    if (!emailVal || !userIdVal) {
        alert('아이디와 이메일을 입력해주세요.');
        return;
    }

    queryPostAjax(
        API.SEND_CODE,
        '?' + $.param({ loginId: userIdVal, email: emailVal }),
        data => {
            verificationCode = data.authCode;
            swalPopup('인증번호 전송 성공!', '이메일을 확인해주세요.', 'success', '확인');
        },
        err => {
            swalPopup('인증번호 전송 실패!', '다시 시도해주세요.', 'error', '확인');
        }
    );
}

function checkVerificationCode() {
    const inputCode = $codeCheck.val().trim();
    if (inputCode === verificationCode) {
        swalPopup('인증번호 확인', '인증번호가 일치합니다.', 'success', '확인');
        $changePwdLayer.css('display', 'block');
    } else {
        swalPopup('인증번호 확인', '인증번호가 일치하지 않습니다.', 'error', '확인');
    }
}

function updatePasswordMessage() {
    const pwd = $newPwd.val().trim(),
        pwdCheck = $newPwdCheck.val().trim();
    let message = (!pwd || !pwdCheck) ? '비밀번호를 모두 입력해주세요.' :
        (pwd !== pwdCheck) ? '비밀번호가 일치하지 않습니다.' : '비밀번호가 일치합니다.';
    let color = (!pwd || !pwdCheck || pwd !== pwdCheck) ? 'red' : 'green';
    $('#passwordMessage').text(message).css('color', color);
}

function changePassword() {
    const newPwdVal = $newPwd.val().trim(),
        newPwdCheckVal = $newPwdCheck.val().trim();
    if (!newPwdVal || !newPwdCheckVal || newPwdVal !== newPwdCheckVal) return;
    $('#passwordMessage').text('');

    queryPostAjax(API.CHANGE_PASSWORD,
        '?' + $.param({ loginId: $userId.val(), email: $email.val(), password: newPwdVal }),
        data => {
            if (data.status === "success") {
                swalPopup('비밀번호 변경', data.message || '비밀번호가 변경되었습니다.', 'success', '확인');
                closeModal();
            } else {
                swalPopup('비밀번호 변경', data.message || '비밀번호 변경에 실패했습니다.', 'error', '확인');
            }
        },
        err => {
            swalPopup('비밀번호 변경', '비밀번호 변경에 실패했습니다.', 'error', '확인');
        }
    );
}
