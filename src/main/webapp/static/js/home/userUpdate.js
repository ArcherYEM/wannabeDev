/* 전역변수 */

/* 페이지 온 로드 */
$(document).ready(function(){
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

        if (checkPwd !== '' && newPwd !== checkPwd) {
          $('#pwdMatchMsg').text('비밀번호가 일치하지 않습니다').css('color', 'red');
        } else {
          $('#pwdMatchMsg').text('');
        }
    });

    // 새 비밀번호 영역 변경 시 일치 확인
    $('#newPwd').on('input', function () {
        $('#checkPwd').trigger('input');
    });
});

