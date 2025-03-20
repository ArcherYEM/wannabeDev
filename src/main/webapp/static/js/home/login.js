$(document).ready(function(){
    loginCheck();
    $(".loginBtn").click(function(){

        const loginId = $("input[name='loginId']").val().trim();
        const password = $("input[name='password']").val().trim();

        if (loginId && password) {
            $.ajax({
                type: "POST",
                url: "/api/user/login",
                contentType: "application/json",
                data: JSON.stringify({loginId,password}),
                success:function(response){
                    loginCheck();
                    location.href ="/"
                },
                error: function(error){
                    console.error(error);
                }
            });
        }
    });

    $(".btn.small.nobtn").click(function () {
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


