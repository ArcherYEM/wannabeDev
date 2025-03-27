/** 이벤트 리스너 등록 **/
$(document).ready(function () {
    let userId = 0;

    $.ajax({
        type: "GET",
        url: "../userInfo",
        contentType: "application/json",
        dataType: "json",
        success:function(response){
            userId = response.userId;
            console.log("userId :: " + userId);
            $("#popupMessageMain").load("/popupMessage/MessageList?userId="+userId);
        },
        error:function(error){
            alert("비 정상적인 접근 입니다.");
        }
    });


    $(".receiveMsgbox>a").css({"color": "#ff8000"});

    $(".navClick").click(function () {
        var className =  $(this).attr("class");
        className = className.substr(9);

        console.log("className : " + className);
        console.log(className.substring(9));

        $("a.aTag").css({ "color": "#333333"});
        $("a."+className).css({ "color": "#ff8000"});
        /* 쪽지 보내기*/
        if (className === "sendMsgFrm") { $("#popupMessageMain").load("/popupMessage/SendMessage"); }
        /* 받은 쪽지함*/
        if (className === "receiveMsgbox") { $("#popupMessageMain").load("/popupMessage/ReciveMessageBox"); }
        /* 보낸 쪽지함*/
        if (className === "sendMsgBox") {
            $("#popupMessageMain").load("/popupMessage/SendMessageBox");

        }

    });

});

/** 쪽지 팝업창 설정 **/
function openPopupMessage() {
    var popupW = 650;
    var popupH = 650;
    var left = Math.ceil((window.screen.width - popupW) / 2);
    var top = Math.ceil((window.screen.height - popupH) / 2);

    var popup = window.open('/popupMessage/main',
        '쪽지 보내기',
        'width=' + popupW + ',height=' + popupH + ',left=' + left + ',top=' + top);
}

