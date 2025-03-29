/* 전역변수 */
let originalEmail = '';
let originalPhone = '';

/* 페이지 온 로드 */
$(document).ready(function () {
    getMyInfo(); // 회원정보 조회
    $('#checkEmail, #checkPhone, #checkOldPwd').prop('disabled', true); // 중복버튼 비활성화
});

// 회원정보 조회
function getMyInfo() {
    $.ajax({
        url: '/api/home/getMyInfo',
        method: 'get',

        success: function (res) {
            if (res) {
                $('#user_id').text(res.loginId);
                $('#user_name').text(res.name);
                $('#user_birth').text(res.birthDate);
                $('#user_gender').text(res.genderCode === "M" ? "남성" : "여성");
                $('#email').val(res.email);
                $('#phone').val(res.phoneNo);

                originalEmail = res.email;
                originalPhone = res.phoneNo;
            } else {
                Swal.fire('회원정보 조회 실패', '조회에 실패하였습니다', 'error');
            }
        },
        error: function (error) {
            Swal.fire('회원정보 조회 실패', `서버 오류 발생 : error`, 'error');
        }
    });
}

//휴대폰 번호 입력 시 하이픈 삽입 + 입력 길이 제한
$('#phone').on('input', function () {
    let number = $(this).val().replace(/[^0-9]/g, '');
    number = number.slice(0, 11);
    $('#checkPhone').prop('disabled', false);

    if (number.length <= 3) {
        $(this).val(number);
    } else if (number.length <= 7) {
        $(this).val(number.replace(/(\d{3})(\d+)/, '$1-$2'));
    } else {
        $(this).val(number.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3'));
    }
});

// 새 비밀번호 일치 확인
$('#checkPwd').on('input', function () {
    const newPwd = $('#newPwd').val();
    const checkPwd = $(this).val();

    if (newPwd !== '' && checkPwd !== '') {
        if (newPwd === checkPwd) {
            $('#pwdMatchMsg').text('비밀번호가 일치합니다.').css('color', 'green');
            $('#passWdWrap').attr('status', 'yes');
        } else {
            $('#pwdMatchMsg').text('비밀번호가 일치하지 않습니다').css('color', 'red');
            $('#passWdWrap').attr('status', 'no');
        }
    } else {
        $('#pwdMatchMsg').text('');
    }
});

// 새 비밀번호 영역 변경 시 일치 확인
$('#newPwd').on('input', function () {
    $('#checkPwd').trigger('input');
});

$('#oldPwd').on('input', function () {
    if ($(this).val().trim() !== '') {
        $('#checkOldPwd').prop('disabled', false);
    } else {
        $('#checkOldPwd').prop('disabled', true);
    }
});

/** 현재 비밀번호 확인 **/
$('#checkOldPwd').click(function () {
    const password = $('#oldPwd').val();

    $.ajax({
        url: '/api/home/checkPassword',
        method: 'POST',
        dataType: 'json',
        data: {password: password},
        success: function (data) {

            if (data.result === -1) {
                Swal.fire('다시 로그인 후 이용해주세요.', '', 'warning');
                return;
            }
            if (data.checkOldPaw) {
                $('#oldPwdMsg')
                    .text('비밀번호가 확인되었습니다.')
                    .css('color', 'green');

                $('.changeWrap').stop(true, true).slideDown();
                $("#newPwd").focus();
            } else {
                $('#oldPwdMsg')
                    .text('비밀번호가 일치하지 않습니다.')
                    .css('color', 'red');

                $('.changeWrap').stop(true, true).slideUp();
            }
        },
        error: function () {
            $('#oldPwdMsg')
                .text('비밀번호 확인 중 오류가 발생했습니다.')
                .css('color', 'red');

            $('.changeWrap').stop(true, true).slideUp();
        }
    });
});


/** 비밀번호 변경 **/
$('#passWdWrap').on('click', function () {
    const oldPwd = $('#oldPwd').val().trim();
    const newPwd = $('#newPwd').val().trim();
    const checkPwd = $('#checkPwd').val().trim();

    if (oldPwd === null || oldPwd === '' && $('#passWdWrap').attr('status') !== 'yes') {
        Swal.fire('비밀번호를 입력해 주세요.');
        return;
    }

    if (newPwd === null || newPwd === '' && $('#passWdWrap').attr('status') !== 'yes') {
        Swal.fire('새 비밀번호를 입력해 주세요.');
        return;
    }

    if (checkPwd === null || checkPwd === '' && $('#passWdWrap').attr('status') !== 'yes') {
        Swal.fire('비밀번호 확인을 입력해주세요.');
        return;
    }

    $.ajax({
        url: '/api/home/updateMyPasswd',
        method: 'post',
        dataType: 'json',
        data: {
            password: newPwd,
        },
        success: function (result) {
            if (result === 1) {
                Swal.fire('비밀번호 수정 성공');
                $('#passWdWrap').removeAttr('status')
            } else if (result < 0) {
                Swal.fire('다시 로그인 후 이용해주세요.', '', 'warning');
                $('#passWdWrap').attr('status', 'no');
            } else {
                Swal.fire('개인정보 수정 실패', '', 'error');
                $('#passWdWrap').attr('status', 'no');
            }
        },
        error: function () {
            Swal.fire('서버 오류 발생', '', 'error');
        }
    });
});


/** 개인정보 수정 **/

$('#InfoWdWrap').on('click', function () {
    const email = $('#email').val().trim();
    const phone = $('#phone').val().trim();

    const emailChanged = email !== originalEmail;
    const phoneChanged = phone !== originalPhone;

    if (!emailChanged && !phoneChanged) {
        Swal.fire('변경된 내용이 없습니다.');
        return;
    }

    if (emailChanged && $('#checkEmail').attr('status') !== 'yes') {
        Swal.fire('이메일 중복확인을 완료해주세요.');
        return;
    }

    if (phoneChanged && $('#checkPhone').attr('status') !== 'yes') {
        Swal.fire('휴대폰 중복확인을 완료해주세요.');
        return;
    }

    $.ajax({
        url: '/api/home/updateMyInfo',
        method: 'post',
        dataType: 'json',
        data: {
            email: email,
            phone: phone
        },
        success: function (result) {
            if (result === 1) {
                Swal.fire('개인정보 수정 성공');

                originalEmail = email;
                originalPhone = phone;
                $('#checkEmail, #checkPhone').removeAttr('status').prop('disabled', true);
            } else if (result < 0) {
                Swal.fire('다시 로그인 후 이용해주세요.', '', 'warning');
            } else {
                Swal.fire('개인정보 수정 실패', '', 'error');
            }
        },
        error: function () {
            Swal.fire('서버 오류 발생', '', 'error');
        }
    });
});

/** 이메일 입력 감지 **/
$('#email').on('input', function () {
    if ($(this).val().trim() !== '') {
        $('#checkEmail').prop('disabled', false);
    } else {
        $('#checkEmail').prop('disabled', true);
    }
    $('#checkEmail').removeAttr('status');
});

/** 이메일 중복 확인 **/
$('#checkEmail').on('click', function () {
    const email = $('#email').val().trim();
    if (email === "") return;

    $.ajax({
        url: '/api/home/checkEmail',
        method: 'post',
        data: {email: email},
        success: function (result) {
            if (result > 0) {
                $('#checkEmail').attr('status', 'no');
                $('#emailMsg').text('이미 존재하는 이메일입니다.').css('color', 'red');
            } else if (result < 0) {
                $('#checkEmail').attr('status', 'no');
                $('#emailMsg').text('다시 로그인 후 이용해주세요.').css('color', 'red');
            } else {
                $('#checkEmail').attr('status', 'yes');
                $('#emailMsg').text('사용 가능한 이메일입니다.').css('color', 'green');
            }
        },
        error: function () {
            $('#emailMsg').text('이메일 확인 중 오류 발생').css('color', 'red');
        }
    });
});

/** 휴대폰 번호 중복 확인 **/

$('#phone').on('input', function () {
    if ($(this).val().trim() !== '') {
        $('#checkPhone').prop('disabled', false);
    } else {
        $('#checkPhone').prop('disabled', true);
    }
    $('#checkPhone').removeAttr('status');
});

$('#checkPhone').on('click', function () {
    const phone = $('#phone').val().trim();
    if (phone === "") return;

    $.ajax({
        url: '/api/home/checkPhone',
        method: 'post',
        data: {phone: phone},
        success: function (result) {
            if (result > 0) {
                $('#checkPhone').attr('status', 'no');
                $('#phoneMsg').text('이미 존재하는 휴대폰 번호입니다.').css('color', 'red');
            } else if (result < 0) {
                $('#checkPhone').attr('status', 'no');
                $('#phoneMsg').text('다시 로그인 후 이용해주세요.').css('color', 'red');
            } else {
                $('#checkPhone').attr('status', 'yes');
                $('#phoneMsg').text('사용 가능한 휴대폰 번호입니다.').css('color', 'green');
            }
        },
        error: function () {
            $('#phoneMsg').text('번호 확인 중 오류 발생').css('color', 'red');
        }
    });
});
