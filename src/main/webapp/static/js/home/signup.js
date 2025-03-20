$(document).ready(function() {

    /*
     * 회원 가입 페이지 초기 로딩 시 동적 생성
     */

    // 생년월일
    // 연도 생성
    let startYear = 1950;
    let endYear = new Date().getFullYear();
    for (let i = endYear; i >= startYear; i--) {
        $("#birthYear").append(`<option value="${i}">${i}</option>`);
    }
    // 월 생성
    for (let i = 1; i <= 12; i++) {
        $("#birthMonth").append(`<option value="${i}">${i}</option>`);
    }
    // 일 생성
    for (let i = 1; i <= 31; i++) {
        $("#birthDay").append(`<option value="${i}">${i}</option>`);
    }

    // 비밀번호 확인
    $("#passwordChk").on("keyup", function () {
        let pw = $("#password").val();
        let pwChk = $("#passwordChk").val()

        if (pw !== pwChk) {
            $(".failChk").show();
            $(".successChk").hide();
        } else {
            $(".failChk").hide();
            $(".successChk").show();
        }
    });

    // 중복 확인
    let isLoginIdValid = false;
    let isEmailValid = false;
    let isPhoneValid = false;

    // 아이디 중복 확인
    $("#checkDuplicateLoginId").on("click", function () {
        const loginId = $("#loginId");
        let loginIdValue = loginId.val().trim();
        console.log("로그인 아이디" + loginId)
        if (loginIdValue === "") {
            alert("아이디를 입력하세요.");
            return;
        }

        $.ajax({
            type: "POST",
            url: `/api/user/checkLoginId/${loginIdValue}`,
            success: function (response) {
                $("#checkDuplicateLoginId").addClass("checkedDuplicate").removeClass("checkDuplicate")
                console.log("아이디 중복 없음")
                isLoginIdValid = true;
            },
            error: function (error) {
                alert("이미 사용 중인 아이디입니다.");
                isLoginIdValid = false;
            }
        });

        // 값이 바뀌면 중복 false 처리
        loginId.on("keyup", function () {
            isLoginIdValid = false;
        });
    })
});

/*







    // 중복 확인 여부를 저장하는 변수
    let isLoginIdValid = false;
    let isEmailValid = false;
    let isPhoneValid = false;

    // 아이디 중복 확인
    $("#checkDuplicateLoginId").click(function () {
        const loginId = $("#signUpLoginId").val().trim();
        if (loginId === "") {
            alert("아이디를 입력하세요.");
            return;
        }

        $.ajax({
            type: "POST",
            url: `/api/user/checkLoginId/${loginId}`,
            success: function(response) {
                alert("사용 가능한 아이디입니다.");
                isLoginIdValid = true;
                checkAllValid(); // 모든 필드 검증 후 버튼 활성화
            },
            error: function(error) {
                alert("이미 사용 중인 아이디입니다.");
                isLoginIdValid = false;
                disableSignUpButton();
            }
        });
    });

    // 이메일 중복 확인
    $("#checkDuplicateEmail").click(function () {
        const email = $("#email").val().trim();
        if (email === "") {
            alert("이메일을 입력하세요.");
            return;
        }

        $.ajax({
            type: "POST",
            url: `/api/user/checkEmail/${email}`,
            success: function(response) {
                alert("사용 가능한 이메일입니다.");
                isEmailValid = true;
                checkAllValid();
            },
            error: function(error) {
                alert("이미 사용 중인 이메일입니다.");
                isEmailValid = false;
                disableSignUpButton();
            }
        });
    });

    // 휴대폰 번호 중복 확인
    $("#checkDuplicatePhoneNo").click(function () {
        const phoneNo = $("#phoneNo").val().trim();
        if (phoneNo === "") {
            alert("휴대폰 번호를 입력하세요.");
            return;
        }

        $.ajax({
            type: "POST",
            url: `/api/user/checkPhoneNo/${phoneNo}`,
            success: function(response) {
                alert("사용 가능한 휴대폰 번호입니다.");
                isPhoneValid = true;
                checkAllValid();
            },
            error: function(error) {
                alert("이미 사용 중인 휴대폰 번호입니다.");
                isPhoneValid = false;
                disableSignUpButton();
            }
        });
    });



    // 모든 필드가 통과했을 경우 회원가입 버튼 활성화
    function checkAllValid() {
        if (isLoginIdValid && isEmailValid && isPhoneValid) {
            $("#signUpBtn").prop("disabled", false);
        }
    }

    // 하나라도 실패하면 회원가입 버튼 비활성화
    function disableSignUpButton() {
        $("#signUpBtn").prop("disabled", true);
    }

    // 회원가입 요청
    $("#signUpBtn").click(function (event) {
        event.preventDefault();

        const userData = {
            loginId: $("#signUpLoginId").val().trim(),
            email: $("#email").val().trim(),
            phoneNo: $("#phoneNo").val().trim(),
            password: $("#password").val().trim(),
            name: $("#name").val().trim(),
            genderCode: $("#gender").val(), // M or F
            birthDate: $("#birthDate").val().trim(), // 8자리 숫자
            friendMessageAvailYN: $("#friendMessageAvailYN").val(), // Y or N
            hompiUseYN: $("#hompiUseYN").val(), // Y or N
            confirmYN1: $("#confirmYN1").val(), // Y or N
            confirmYN2: $("#confirmYN2").val(), // Y or N
            confirmYN3: $("#confirmYN3").val() // Y or N
        };

        // 필수 필드 확인
        if (!userData.loginId || !userData.email || !userData.phoneNo || !userData.password || !userData.name ) {
            alert("모든 필수 정보를 입력해주세요.");
            return;
        }

        $.ajax({
            type: "POST",
            url: "http://localhost:8080/api/user/signup",
            contentType: "application/json",
            data: JSON.stringify(userData),
            success: function (response) {
                alert("회원가입이 완료되었습니다!");
                location.href = "/home";
            },
            error: function (error) {
                alert("회원가입 실패: " + error.responseText);
                console.error(error);
            }
        });
    });
    // 초기에 회원가입 버튼 비활성화
    disableSignUpButton();

 */
