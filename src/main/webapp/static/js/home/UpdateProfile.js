$(document).ready(function() {
    const loginId = $('#LoginId').text();
    let isEmailAvailable = false;
    let isPhoneAvailable = false;

    // 중복 확인 버튼 클릭 이벤트
    $('.check-duplicate').on('click', function(e) {
        e.preventDefault();
        const type = $(this).data('type');
        const value = $(`#${type === 'email' ? 'email' : 'PoneNo'}`).val();

        if (!value) {
            alert(`${type === 'email' ? '이메일' : '전화번호'}를 입력해주세요.`);
            return;
        }

        // 이메일과 전화번호 형식 확인
        if (type === 'email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value)) {
                alert('올바른 이메일 형식이 아닙니다. 예: abc@naver.com');
                return;
            }
        } else if (type === 'phone') {
            // 수정: 전화번호 형식 규칙 변경
            // 숫자 11자리로만 입력받아요. 예: 01012345678
            const phonePattern = /^\d{11}$/;
            if (!phonePattern.test(value)) {
                alert('올바른 전화번호 형식이 아닙니다. 예: 01012345678 (숫자 11자리)');
                return;
            }
            // 수정: 전화번호가 010으로 시작하는지 확인
            if (!value.startsWith('010')) {
                alert('전화번호는 010으로 시작해야 합니다.');
                return;
            }
        }

        // 서버에 중복 확인 요청 (AJAX)
        $.ajax({
            url: `/user/check-${type}-duplicate`,
            method: 'POST',
            data: { [type]: value },
            success: function(response) {
                if (response.isDuplicate) {
                    alert(`${type === 'email' ? '이메일' : '전화번호'}가 이미 사용 중입니다.`);
                    if (type === 'email') isEmailAvailable = false;
                    else isPhoneAvailable = false;
                } else {
                    alert(`${type === 'email' ? '이메일' : '전화번호'} 사용 가능합니다.`);
                    if (type === 'email') isEmailAvailable = true;
                    else isPhoneAvailable = true;
                }
            },
            error: function() {
                alert('중복 확인 중 오류가 발생했습니다.');
                if (type === 'email') isEmailAvailable = false;
                else isPhoneAvailable = false;
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

        if (!isEmailAvailable) {
            alert('이메일 중복 확인을 해주세요.');
            return;
        }
        if (!isPhoneAvailable) {
            alert('전화번호 중복 확인을 해주세요.');
            return;
        }

        // 비밀번호 확인 요청
        $.ajax({
            url: '/user/verify-password',
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

                // 회원정보 업데이트 요청
                $.ajax({
                    url: '/user/update-profile',
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(updateData),
                    success: function(response) {
                        alert('회원정보가 성공적으로 수정되었습니다.');
                        window.location.href = '/profile';
                    },
                    error: function(xhr) {
                        const errorMessage = xhr.responseJSON && xhr.responseJSON.message
                            ? xhr.responseJSON.message
                            : '회원정보 수정 중 오류가 발생했습니다.';
                        alert(errorMessage);
                    }
                });
            },
            error: function() {
                alert('비밀번호 확인 중 오류가 발생했습니다.');
            }
        });
    });
});