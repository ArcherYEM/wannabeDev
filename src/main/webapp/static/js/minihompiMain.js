function openPop() {
    var popupW = 1280;
    var popupH = 720;
    var left = Math.ceil((window.screen.width - popupW) / 2);
    var top = Math.ceil((window.screen.height - popupH) / 2);

    var popup = window.open('/mini-hompi/main',
        'mini-hompi',
        'width=' + popupW + ',height=' + popupH + ',left=' + left + ',top=' + top);
}

window.openPop = openPop;

function menuMovePage(e, url) {
    console.log(e.currentTarget);
    $.ajax({
        type: "GET",
        url: url,
        dataType: "html",
        success: function (data) {
            $("#rightWrap .rightMainWrap").children().remove();
            $("#rightWrap .rightMainWrap").html(data);
        },
        error: function (xhr, status, error) {
            alert("페이지 로딩에 실패했습니다.\n오류내용: " + error);
        }
    });

    var btns = document.querySelectorAll("li");
    btns.forEach(function (btn, i) {
        if (e.currentTarget == btn) {
            btn.classList.add("on");
        } else {
            btn.classList.remove("on");
        }
    });
    console.log(e.currentTarget);
}

function menuMoveHomePage(e, url) {
    $.ajax({
        type: "GET",
        url: url,
        dataType: "html",
        success: function (data) {
            $("#rightWrap .rightMainWrap").children().remove();
            $("body").html(data);
        },
        error: function (xhr, status, error) {
            alert("페이지 로딩에 실패했습니다.\n오류내용: " + error);
        }
    });

    var btns = document.querySelectorAll("li");
    btns.forEach(function (btn, i) {
        if (e.currentTarget == btn) {
            btn.classList.add("on");
        } else {
            btn.classList.remove("on");
        }
    });
    console.log(e.currentTarget);
}

