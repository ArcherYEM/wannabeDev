$(document).ready(function(){
    loginCheck();
    $(".loginBtn").click(function(){
        
        let loginCheckDisplayText = $("#loginCheckDisplayText")

        let loginId = $("input[name='loginId']");
        let password = $("input[name='password']");

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
                loginCheck();
                Swal.fire(
                    '로그인 성공!',
                    '환영합니다 :)',
                    'success'
                ).then(() => {
                    location.href = "/";
                });
                loginCheckDisplayText.text("")
            },
            error: function(error){
                loginId.val("")
                password.val("")
                loginCheckDisplayText.text("아이디 혹은 비밀번호를 다시 입력해주세요").css({
                    "color": "red"
                })
            }
        });
    });

    $(".logoutBtn").click(function () {
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

function loginCheck(){
        $.ajax({
            type: "GET",
            url: "userInfo",
            contentType: "application/json",
            dataType: "json",
            success:function(response){
                if(response === null){
                    $(".loginWrap.noLogin").show();
                    $(".loginWrap.yesLogin").hide();
                    return;
                }
                $(".loginWrap.noLogin").hide();
                $(".loginWrap.yesLogin").show();
                $(".username").text(response.name);
                $(".name").text(response.name);
            },
            error:function(error){
                console.error(error);
            }
        });
    }


