$(document).on("click", "#moveHome", function (e) {
    e.preventDefault();
    $.ajax({
        type: "GET",
        url: "/mini-hompi/hompiMain",
        dataType: "html",
        success: function (data) {
            $("#mainWrapBackground").children().remove();
            $("#mainWrapBackground").html(data);
        },
        error: function (xhr, status, error) {
            alert("페이지 로딩에 실패했습니다.\n오류내용: " + error);
        }
    });
});
/** 이벤트 리스너 등록 **/
$(document).ready(function () {

    const $popuoMain = $("#popupMain");

    const $menu_diary = $("#menu_diary");
    const $menu_photo = $("#menu_photo");
    const $menu_board = $("#menu_board");
    const $menu_visitor = $("#menu_visitor");

    const $moveHome = $("#moveHome");
    const $moveProfile = $("#moveProfile");
    const $moveDairy = $("#moveDairy");
    const $moveJukebox = $("#moveJukebox");
    const $movePhoto = $("#movePhoto");
    const $moveBoard = $("#moveBoard");
    const $moveVisitor = $("#moveVisitor");
    const $moveSetting = $("#moveSetting");

    const hompMain_url = "/mini-hompi/hompiMain"
    const homp_url = "/mini-hompi/main";
    const prolfile_url = "/mini-hompi/profile";
    const jukebox_url = "/mini-hompi/jukebox";
    const setting_url = "/mini-hompi/setting";
    const dairy_url = "/mini-hompi/dairy";
    const photo_url = "/mini-hompi/photo";
    const board_url = "/mini-hompi/board";
    const visitor_url = "/mini-hompi/visitor";


    const $droupdown = $("#nameWrap");
    const $dropbtn = $droupdown.find(".name");


    //오른쪽 사이드 메뉴 이동(색깔 변경)


    $moveProfile.on("click", function (e) {
        e.preventDefault();
        moveHomePageCgColor(e, prolfile_url, "moveProfile");
    });

    $moveDairy.on("click", function (e) {
        e.preventDefault();
        moveHomePageCgColor(e, dairy_url, "moveDairy");
    });
    $moveJukebox.on("click", function (e) {
        e.preventDefault();
        moveHomePageCgColor(e, jukebox_url, "moveJukebox");
    });

    $moveSetting.on("click", function (e) {
        e.preventDefault();
        moveHomePageCgColor(e, setting_url, "moveSetting");
    });

    $movePhoto.on("click", function (e) {
        e.preventDefault();
        moveHomePageCgColor(e, photo_url, "movePhoto");
    });
    $moveBoard.on("click", function (e) {
        e.preventDefault();
        moveHomePageCgColor(e, board_url, "moveBoard");
    });

    $moveVisitor.on("click", function (e) {
        e.preventDefault();
        moveHomePageCgColor(e, visitor_url, "moveVisitor");
    });

    //메인화면에 있는 이동
    $menu_diary.on("click", function (e) {
        e.preventDefault();
        moveHomePageCgColor(e, dairy_url, "moveDairy");
    });

    $menu_photo.on("click", function (e) {
        e.preventDefault();
        moveHomePageCgColor(e, photo_url, "movePhoto");
    });

    $menu_board.on("click", function (e) {
        e.preventDefault();
        moveHomePageCgColor(e, board_url, "moveBoard");
    });

    $menu_visitor.on("click", function (e) {
        e.preventDefault();
        moveHomePageCgColor(e, visitor_url, "moveVisitor");
    });

    /** 함수 등록 **/
    function movePage(url) {
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
    }

    function moveHomePageCgColor(e, url, menuName) {
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
            if (menuName === btn.id) {
                btn.classList.add("on");
            } else {
                btn.classList.remove("on");
            }
        });
        console.log(e.currentTarget);
    }

//메인에서 이름 누르면 나오는 드롭박스
    $dropbtn.on("click", function (e) {
        e.preventDefault();
        $droupdown.toggleClass("active");
        $droupdown.find("#name-droupdown").slideToggle();
    });
    $(document).on("click", function (e) {
        if (!$droupdown.is(e.target) && $droupdown.has(e.target).length === 0) {
            $droupdown.removeClass("active");
            $droupdown.find("#name-droupdown").slideUp();
        }
    });

    //미니홈피 타이틀 변경
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
            const newTitle = $("#mainTitleInput").val();
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

/** 미니홈피 팝업창 설정 **/
function openPop() {
    var popupW = 1280;
    var popupH = 720;
    var left = Math.ceil((window.screen.width - popupW) / 2);
    var top = Math.ceil((window.screen.height - popupH) / 2);

    const hompiId = 1;

    window.open(`/mini-hompi/minihompiWrap`,
        'mini-hompi',
        'width=' + popupW + ',height=' + popupH + ',left=' + left + ',top=' + top);
}

/** 쪽지 팝업창 설정 **/
function onpneMessage() {
    var popupW = 500;
    var popupH = 500;
    var left = Math.ceil((window.screen.width - popupW) / 2);
    var top = Math.ceil((window.screen.height - popupH) / 2);

    var popup = window.open('/mini-hompi/newmessage',
        '쪽지 보내기',
        'width=' + popupW + ',height=' + popupH + ',left=' + left + ',top=' + top);
}
