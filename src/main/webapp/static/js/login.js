$(document).ready(function(){
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
                    alert("로그인 성공");
                },
                error: function(error){
                    alert("로그인 실패");
                    console.error(error);
                },
                complete: function () {
                    console.log("1", loginId)
                    console.log("2", password)
                }
            });
        }
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