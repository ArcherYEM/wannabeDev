$(document).ready(function() {
    // 로그인 시 사용자 데이터 표시 (서버에서 Thymeleaf로 이미 렌더링됨)
    const loginId = $('#LoginId').text(); // 수정 불가 데이터 예시

    // 중복 확인 버튼 클릭 이벤트
    $('.check-duplicate').on('click', function(e) {
        e.preventDefault();
        const type = $(this).data('type'); // "email" 또는 "phone"
        const value = $(`#${type === 'email' ? 'email' : 'PoneNo'}`).val();

        if (!value) {
            alert(`${type === 'email' ? '이메일' : '전화번호'}를 입력해주세요.`);
            return;
        }

        // 서버에 중복 확인 요청 (AJAX)
        $.ajax({
            url: `/api/check-${type}-duplicate`, // 서버의 중복 체크 API 경로
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

        // 입력값 가져오기
        const currentPassword = $('#password').val();
        const newPassword = $('#newpassword').val();
        const confirmNewPassword = $('#new_password').val();
        const email = $('#email').val();
        const phoneNo = $('#PoneNo').val();

        // 유효성 검사
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

        // 현재 비밀번호 확인 요청
        $.ajax({
            url: '/api/verify-password', // 비밀번호 확인 API
            method: 'POST',
            data: { password: currentPassword, loginId: loginId },
            success: function(response) {
                if (!response.isValid) {
                    alert('현재 비밀번호가 일치하지 않습니다.');
                    return;
                }

                // 비밀번호가 일치하면 수정 데이터 전송
                const updateData = {
                    loginId: loginId,
                    password: newPassword,
                    email: email,
                    phoneNo: phoneNo
                };

                $.ajax({
                    url: '/api/update-profile', // 프로필 업데이트 API
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(updateData),
                    success: function(response) {
                        alert('회원정보가 성공적으로 수정되었습니다.');
                        window.location.href = '/profile'; // 수정 후 이동할 페이지
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