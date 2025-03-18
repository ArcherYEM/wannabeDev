$(document).ready(function(){
    $("#loginBtn").click(function(e){
        e.preventDefault();
        const loginId = $("#loginId").val().trim();
        const password = $("#password").val().trim();

        $.ajax({
            type: "POST",
            url: "/api/user/login",
            contentType: "application/json",
            data: JSON.stringify({loginId,password}),
            success:function(response){
                alert("로그인 성공")
/*                $(".mainTopLeft").children().remove();*/

            },
            error: function(error){
                alert("로그인 실패");
                console.error(error);
            }

        });
    });
});