$(document).ready(function(){
    $("#loginBtn").click(function(){
        const username = $("username").val();
        const password = $("password").val();

        $.ajax({
            type: "POST",
            url: "/login",
            contentType: "application/json",
            data: Json.stringify({username,password}),
            success:function(response){

            }error: function(error){
                alert:("로그인 실패");
            }

        });
    });
});