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
        $("#birthMonth").append(`<option value="${i.toString().padStart(2, '0')}">${i}</option>`);
    }
    // 일 생성
    for (let i = 1; i <= 31; i++) {
        $("#birthDay").append(`<option value="${i.toString().padStart(2, '0')}">${i}</option>`);
    }

    // 비밀번호 확인
    let isPasswordEqual = false;
    $("#passwordChk").on("keyup", function () {
        let pw = $("#password").val().trim();
        let pwChk = $("#passwordChk").val().trim()

        if (pw !== pwChk) {
            $(".checkMatch.pwd").text("비밀번호가 일치하지 않습니다.").css({
                "color":"red"
            });
        } else {
            isPasswordEqual = true;
            $(".checkMatch.pwd").text("비밀번호가 일치합니다.").css({
                "color":"blue"
            });
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
        if (loginIdValue === "") {
            $(".checkMatch.loginId").text("아이디를 입력하세요.").css({
                "color":"red"
            });
            return;
        }

        $.ajax({
            type: "POST",
            url: `/api/user/checkLoginId/${loginIdValue}`,
            success: function (response) {
                $("#checkDuplicateLoginId").addClass("checkedDuplicate").removeClass("checkDuplicate")
                $(".checkMatch.loginId").text("")
                isLoginIdValid = true;
            },
            error: function (error) {
                $(".checkMatch.loginId").text("이미 사용 중인 아이디입니다.").css({
                    "color":"red"
                });
                isLoginIdValid = false;
            }
        });

        // 값이 바뀌면 중복 false 처리
        loginId.on("keyup", function () {
            $("#checkDuplicateLoginId").addClass("checkDuplicate").removeClass("checkedDuplicate")
            isLoginIdValid = false;
        });
    })
    
    // 이메일 중복 확인
    $("#checkDuplicateEmail").on("click", function () {
        const email = $("#email");
        let emailValue = email.val().trim();
        if (emailValue === "") {
            $(".checkMatch.email").text("이메일을 입력하세요.").css({
                "color":"red"
            });
            return;
        }

        $.ajax({
            type: "POST",
            url: `/api/user/checkEmail/${emailValue}`,
            success: function (response) {
                $("#checkDuplicateEmail").addClass("checkedDuplicate").removeClass("checkDuplicate")
                $(".checkMatch.email").text("")
                isEmailValid = true;
            },
            error: function (error) {
                $(".checkMatch.email").text("이미 사용 중인 이메일입니다.").css({
                    "color":"red"
                });
                isEmailValid = false;
            }
        });

        // 값이 바뀌면 중복 false 처리
        email.on("keyup", function () {
            $("#checkDuplicateEmail").addClass("checkDuplicate").removeClass("checkedDuplicate")
            isEmailValid = false;
        });
    });

    // 전화번호 중복 확인
    $("#checkDuplicatePhoneNo").on("click", function () {
        const phoneNo = $("#phoneNo");
        let phoneNoValue = phoneNo.val().trim();
        if (phoneNoValue === "") {
            $(".checkMatch.phoneNo").text("전화번호를 입력하세요.").css({
                "color":"red"
            });
            return;
        }

        $.ajax({
            type: "POST",
            url: `/api/user/checkPhoneNo/${phoneNoValue}`,
            success: function (response) {
                $("#checkDuplicatePhoneNo").addClass("checkedDuplicate").removeClass("checkDuplicate")
                $(".checkMatch.phoneNo").text("");
                isPhoneValid = true;
            },
            error: function (error) {
                $(".checkMatch.phoneNo").text("이미 사용 중인 전화번호입니다.").css({
                    "color":"red"
                });
                alert("이미 사용 중인 전화번호입니다.");
                isPhoneValid = false;
            }
        });

        // 값이 바뀌면 중복 false 처리
        phoneNo.on("keyup", function () {
            $("#checkDuplicateEmail").addClass("checkDuplicate").removeClass("checkedDuplicate")
            isPhoneValid = false;
        });
    });

    // 회원가입 신청
    $("#signUpBtn").on("click", function () {
        let loginIdValue = $("#loginId").val().trim();
        let passwordValue = $("#password").val().trim();
        let nameValue = $("#name").val().trim();
        let birthValue = $("#birthYear").val()+$("#birthMonth").val()+$("#birthDay").val();
        let genderValue = $("#gender").val();
        let emailValue = $("#email").val().trim();
        let phoneNoValue = $("#phoneNo").val().trim();
        let confirmValue;
        if ($("#confirm1").is(":checked") == true) {
            confirmValue = "Y";
        } else {
            confirmValue = "N";
        }

        const userData = {
            loginId: loginIdValue,
            email: emailValue,
            phoneNo: phoneNoValue,
            password: passwordValue,
            name: nameValue,
            genderCode: genderValue,
            birthDate: birthValue,
            friendMessageAvailYN: "Y",
            confirmYN1: confirmValue,
            confirmYN2: "Y",
            confirmYN3: "Y"
        }

        if (!isLoginIdValid || !isEmailValid || !isPhoneValid) {
            alert("중복 값을 확인해야합니다");
            return;
        }

        if (!isPasswordEqual) {
            alert("비밀번호가 일치해야합니다");
            return;
        }

        if (userData.confirmYN1 === "N") {
            alert("이용약관에 동의해주세요");
            return;
        }

        if (!userData.loginId || !userData.email || !userData.phoneNo
            || !userData.password || !userData.name || !userData.genderCode
            || !userData.birthDate) {
            alert("모든 값을 입력해주세요");
            return;
        }

        $.ajax({
            type: "POST",
            url: "http://localhost:8080/api/user/signup",
            contentType: "application/json",
            data: JSON.stringify(userData),
            success: function (response) {
                alert("회원가입이 완료되었습니다!");
                location.href = "/";
            },
            error: function (error) {
                alert("회원가입에 실패하였습니다");
            }
        });
    });

});
