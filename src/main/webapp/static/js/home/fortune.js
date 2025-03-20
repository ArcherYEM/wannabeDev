$(document).ready(function(){
    $.ajax({
        url: "/main/fortune",
        type: "GET",
        success: function(response){
            $(".todayLucky").text(response);
        },
        error: function(xhr, status, error){
            console.error("AJAX 요청 실패:", status, error);
            $(".todayLucky").text("오늘의 운세를 불러오는데 실패했습니다.");
        }
    });
});
