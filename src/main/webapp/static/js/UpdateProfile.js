$(document).ready(function() {
    // ✅ 로그인한 사용자 정보를 불러와 <span> 태그에 채우는 함수 실행
    loadUserInfo();

    // ✅ 중복 확인 버튼 클릭 이벤트
    $('.join-date a').on('click', handleDuplicateCheck);

    // ✅ 수정 완료 버튼 클릭 이벤트
    $('.submit-btn').on('click', handleFormSubmit);
});

// ✅ 로그인한 사용자 정보를 서버에서 가져와 <span> 태그에 넣는 함수 (POST 방식)
function loadUserInfo() {
    $.ajax({
        url: '/api/get-user', // 🔹 실제 로그인한 사용자 정보를 가져오는 API
        method: 'POST', // 🔹 GET → POST 방식으로 변경
        contentType: 'application/json', // JSON 데이터 전송
        data: JSON.stringify({ sessionToken: getSessionToken() }), // 🔹 현재 로그인된 사용자의 세션 토큰 전송
        success: function(user) {
            // 🔹 가져온 사용자 정보를 <span> 태그 안에 삽입
            $('#username').text(user.username);
            $('#name').text(user.name);
            $('#birthdate').text(user.birthdate);
            $('#gender').text(user.gender);
        },
        error: function() {
            alert('사용자 정보를 불러오는 데 실패했습니다.');
        }
    });
}

// ✅ 현재 로그인된 사용자의 세션 토큰을 가져오는 함수 (예시)
function getSessionToken() {
    return localStorage.getItem('sessionToken') || 'defaultToken'; // 🔹 실제 로그인 세션 관리 방식에 맞게 수정 필요
}

// ✅ 중복 확인 버튼 핸들러 (POST 방식)
function handleDuplicateCheck(e) {
    e.preventDefault();
    const inputValue = $(this).siblings('input').val();
    const field = $(this).siblings('label').text().trim();

    if (inputValue) {
        checkDuplicate(field, inputValue, $(this));
    } else {
        alert(`${field}을(를) 입력해주세요.`);
    }
}

// ✅ 폼 제출 버튼 핸들러
function handleFormSubmit() {
    const formData = getFormData(); // 폼 데이터 가져오기

    if (validateForm(formData)) { // 폼 검증 후 업데이트 요청
        updateUserInfo(formData);
    }
}

// ✅ 입력 폼 데이터 수집 함수 (로그인한 데이터가 `<span>` 태그에 먼저 들어간 후 가져옴)
function getFormData() {
    return {
        // 🔹 로그인한 사용자 정보는 <span> 태그에서 가져옴
        username: $('#username').text(),
        name: $('#name').text(),
        birthdate: $('#birthdate').text(),
        gender: $('#gender').text(),

        // 🔹 사용자가 입력하는 데이터 (비밀번호, 이메일, 전화번호)
        currentPassword: $('.password-group input').eq(0).val(),
        newPassword: $('.password-group input').eq(1).val(),
        confirmPassword: $('.password-group input').eq(2).val(),
        email: $('.join-date input').eq(0).val(),
        phone: $('.join-date input').eq(1).val()
    };
}

// ✅ 중복 확인 함수 (POST 방식)
function checkDuplicate(field, value, element) {
    $.ajax({
        url: '/api/check-duplicate', // 🔹 실제 서버 API로 변경 필요
        method: 'POST', // 🔹 POST 방식으로 변경
        contentType: 'application/json', // JSON 데이터 전송
        data: JSON.stringify({ field: field, value: value }), // 요청 본문(body)에 데이터 포함
        success: function(response) {
            // 🔹 서버 응답에서 중복 여부 확인
            if (response.isDuplicate) {
                alert(`${field}이(가) 이미 사용 중입니다.`);
                element.addClass('disabled');
            } else {
                alert(`${field}을(를) 사용할 수 있습니다.`);
                element.removeClass('disabled');
            }
        },
        error: function() {
            alert('서버 오류가 발생했습니다. 다시 시도해주세요.');
        }
    });
}

// ✅ 폼 유효성 검사 함수
function validateForm(formData) {
    if (!formData.email) {
        alert('이메일을 입력해주세요.');
        return false;
    }
    if (!formData.phone) {
        alert('전화번호를 입력해주세요.');
        return false;
    }
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
        alert('새 비밀번호가 일치하지 않습니다.');
        return false;
    }
    return true;
}

// ✅ 사용자 정보 업데이트 함수 (POST 방식)
function updateUserInfo(formData) {
    $.ajax({
        url: '/api/update-user', // 🔹 실제 사용자 정보 업데이트 API
        method: 'POST', // 🔹 POST 방식 사용
        contentType: 'application/json',
        data: JSON.stringify(formData), // JSON 데이터 전송
        success: function(response) {
            alert('정보가 성공적으로 업데이트되었습니다.');
            console.log('Response:', response);
            // 🔹 성공 시 페이지 리다이렉트 또는 상태 업데이트 가능
            // window.location.href = '/success'; // 예시
        },
        error: function() {
            alert('정보 업데이트에 실패했습니다. 다시 시도해주세요.');
        }
    });
}
