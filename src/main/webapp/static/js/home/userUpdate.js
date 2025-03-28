/* 전역변수 */

/* 페이지 온 로드 */
$(document).ready(function(){
    getMyInfo(); // 회원정보 조회
});

// 회원정보 조회
function getMyInfo(){
    $.ajax({
        url : '/api/home/getMyInfo',
        method: 'get',

        success : function(res){
            if(res){
                $('#user_id').text(res.loginId);
                $('#user_name').text(res.name);
                $('#user_birth').text(res.birthDate);
                $('#user_gender').text(res.genderCode === "M" ? "남성" : "여성");
                $('#email').val(res.email);
                $('#phone').val(res.phoneNo);
            } else {
                Swal.fire( '회원정보 조회 실패', '조회에 실패하였습니다', 'error' );
            }
        },
        error : function(error){
            Swal.fire( '회원정보 조회 실패', `서버 오류 발생 : error`, 'error' );
        }
    });
}

//휴대폰 번호 입력 시 하이픈 삽입 + 입력 길이 제한
$('#phone').on('input', function () {
    let number = $(this).val().replace(/[^0-9]/g, '');
    number = number.slice(0, 11);

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
        } else {
            $('#pwdMatchMsg').text('비밀번호가 일치하지 않습니다').css('color', 'red');
        }
    } else {
        $('#pwdMatchMsg').text('');
    }
});

// 새 비밀번호 영역 변경 시 일치 확인
$('#newPwd').on('input', function () {
    $('#checkPwd').trigger('input');
});