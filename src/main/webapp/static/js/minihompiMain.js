/*미니홈피 팝업창 설정*/
function openPop() {
    var popupW = 1280;
    var popupH = 720;
    var left = Math.ceil((window.screen.width - popupW) / 2);
    var top = Math.ceil((window.screen.height - popupH) / 2);

    var popup = window.open('/mini-hompi/main',
        'mini-hompi',
        'width=' + popupW + ',height=' + popupH + ',left=' + left + ',top=' + top);
}


/*미니홈피 우측메뉴 페이지 이동 겸 버튼 색 바뀌는 기능*/
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
}


/* 메인 타이틀 수정 버튼 스왑 기능 */
$(document).ready(function () {
    $(".rightMenu").on("click", "#titleBtn", function () {
        const $btn = $(this);

        if ($btn.val() === '수정') {
            const $title = $("#mainTitle");
            const currentTitle = $title.text();

            const $input = $("<input>", {
                type: "text",
                id: "mainTitleInput",
                value: currentTitle
            });
            $title.replaceWith($input);
            $btn.val("저장");
            $btn.addClass("save-mode");
            $input.focus();
        } else {
            const newTitle = $("#mainTitleInput").val(); // 수정한 값을 가져옴
            const $span = $("<span>", {
                id: "mainTitle",
                text: newTitle
            });
            $("#mainTitleInput").replaceWith($span);
            $btn.val("수정");
            $btn.removeClass("save-mode");
        }
    });
});


