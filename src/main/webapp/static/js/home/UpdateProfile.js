$(document).ready(function() {
    const loginId = $('#LoginId').text();

    // 중복 확인 버튼 클릭 이벤트
    $('.check-duplicate').on('click', function(e) {
        e.preventDefault();
        const type = $(this).data('type');
        const value = $(`#${type === 'email' ? 'email' : 'PoneNo'}`).val();

        if (!value) {
            alert(`${type === 'email' ? '이메일' : '전화번호'}를 입력해주세요.`);
            return;
        }

        // 서버에 중복 확인 요청 (AJAX)
        $.ajax({
            url: `/user/check-${type}-duplicate`, // 컨트롤러 엔드포인트와 일치
            method: 'POST',
            data: { [type]: value },
            success: function(response) {
                if (response.isDuplicate) {
                    alert(`${type === 'email' ? '이메일' : '전화번호'}가 이미 사용 중입니다.`);
                } else {
                    alert(`${type === 'email' ? '이메일' : '전화번호'} 사용 가능합니다.`);
                }
            },
            error: function() {
                alert('중복 확인 중 오류가 발생했습니다.');
            }
        });
    });

    // 수정 완료 버튼 클릭 이벤트
    $('#submitBtn').on('click', function(e) {
        e.preventDefault();

        const currentPassword = $('#password').val();
        const newPassword = $('#newpassword').val();
        const confirmNewPassword = $('#new_password').val();
        const email = $('#email').val();
        const phoneNo = $('#PoneNo').val();

        if (!currentPassword) {
            alert('현재 비밀번호를 입력해주세요.');
            return;
        }
        if (!newPassword || newPassword !== confirmNewPassword) {
            alert('새 비밀번호가 일치하지 않거나 입력되지 않았습니다.');
            return;
        }
        if (!email || !phoneNo) {
            alert('이메일과 전화번호를 입력해주세요.');
            return;
        }

        // 비밀번호 확인 요청
        $.ajax({
            url: '/user/verify-password', // 컨트롤러 엔드포인트와 일치
            method: 'POST',
            data: { password: currentPassword, loginId: loginId },
            success: function(response) {
                if (!response.isValid) {
                    alert('현재 비밀번호가 일치하지 않습니다.');
                    return;
                }

                const updateData = {
                    loginId: loginId,
                    password: newPassword,
                    email: email,
                    phoneNo: phoneNo
                };

                $.ajax({
                    url: '/user/update-profile', // 컨트롤러 엔드포인트와 일치
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(updateData),
                    success: function(response) {
                        alert('회원정보가 성공적으로 수정되었습니다.');
                        window.location.href = '/profile';
                    },
                    error: function() {
                        alert('회원정보 수정 중 오류가 발생했습니다.');
                    }
                });
            },
            error: function() {
                alert('비밀번호 확인 중 오류가 발생했습니다.');
            }
        });
    });
});