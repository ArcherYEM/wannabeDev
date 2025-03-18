$(document).ready(function(){
    $(".loginBtn").click(function(){

        const loginId = $("input[name='userId']").val().trim();
        const password = $("input[name='password']").val().trim();


        $.ajax({
            type: "POST",
            url: "/api/user/login",
            contentType: "application/json",
            data: JSON.stringify({loginId,password}),
            success:function(response){
                alert("로그인 성공")
                location.href = "/home";
            },
            error: function(error){
                alert("로그인 실패");
                console.error(error);
            }

        });
    });

    $(".logoutBtn").click(function () {
        $.ajax({
            type: "POST",
            url: "/api/user/logout",
            success:function(response){
                alert("로그아웃 성공")
                location.href = "/home";
            },
            error: function(error){
                alert("로그아웃 실패");
                console.error(error);
            }
        });
    });
});