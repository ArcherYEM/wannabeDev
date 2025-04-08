$(document).ready(function(){
    // login 상태에 따라서 페이지 변경
    loginCheck();

    // login
    // header
    $("#loginBtnHeader").on("click", function(){
        let loginId = $("#loginIdHeader");
        let password = $("#passwordHeader");
        login(loginId, password);
    });
    $("#loginIdHeader, #passwordHeader").on("keydown", function(e){
        if (e.key == "Enter") {
            let loginId = $("#loginIdHeader");
            let password = $("#passwordHeader");
            login(loginId, password);
        }
    });

    // content
    $("#loginBtnFragment").on("click", function(){
        let loginId = $("#loginIdFragment");
        let password = $("#passwordFragment");
        login(loginId, password);
    });
    $("#loginIdFragment, #passwordFragment").on("keydown", function(e){
        if (e.key == "Enter") {
            let loginId = $("#loginIdFragment");
            let password = $("#passwordFragment");
            login(loginId, password);
        }
    });

    // logout
    $("#logoutBtn, #logoutBtn2").click(function () {
        $.ajax({
            type: "POST",
            url: "/api/user/logout",
            success:function(response){
                location.href = "/";
            },
            error: function(error){
                console.error(error);
            }
        });
    });

});

function login(loginId, password) {
    showLoadingSpinner();
    let loginData = {
        "loginId": loginId.val().trim(),
        "password": password.val().trim(),
    }

    $.ajax({
        type: "POST",
        url: "/api/user/login",
        contentType: "application/json",
        data: JSON.stringify(loginData),
        success:function(response){
            Swal.fire(
                '로그인 성공!',
                '환영합니다',
                'success'
            ).then(() => {
                location.href = "/";
            });
            hideLoadingSpinner();
        },
        error: function(error){
            loginId.val("")
            password.val("")
            Swal.fire(
                '로그인 실패',
                '아이디 혹은 비밀번호를 다시 입력해주세요',
                'error'
            );
            hideLoadingSpinner();
        }
    });
}

function loginCheck(){
    $.ajax({
        type: "GET",
        url: "userInfo",
        contentType: "application/json",
        success:function(response){
            if(response.accessIp === null){
                $(".loginWrap.noLogin").show();
                $(".loginWrap.yesLogin").hide();
                $(".headerRight.noLogin").show();
                $(".headerRight.yesLogin").hide();
                return;
            }
            $(".loginWrap.noLogin").hide();
            $(".loginWrap.yesLogin").show();
            $(".username").text(response.name);
            $(".headerRight.noLogin").hide();
            $(".headerRight.yesLogin").show();
            $("#ipDisplayHeader").text(response.accessIp);
            $("#nameDisplayHeader").text(response.name);
        },
        error:function(error){
        }
    });
}
