/** 이벤트 리스너 등록 **/
$(document).ready(function () {

    console.log("✅ minihompiMain.js가 로드되고 실행됨!");
    getminihompiDataList();

    const popuoMain = $("#popupMain");

    const menu_diary = $("#menu_diary");
    const menu_photo = $("#menu_photo");
    const menu_board = $("#menu_board");
    const menu_visitor = $("#menu_visitor");

    const moveProfile = $("#moveProfile");
    const moveDairy = $("#moveDairy");
    const moveJukebox = $("#moveJukebox");
    const movePhoto = $("#movePhoto");
    const moveBoard = $("#moveBoard");
    const moveVisitor = $("#moveVisitor");
    const moveSetting = $("#moveSetting");

    const count_dairy = $("#count_diary");
    const count_visitor = $("#count_visitor");
    const count_photo = $("#count_photo");
    const count_board = $("#count_board");

    const hompiMain_url = "/mini-hompi/hompiMain"
    const hompi_url = "/mini-hompi/main";
    const prolfile_url = "/mini-hompi/profile";
    const jukebox_url = "/mini-hompi/jukebox";
    const setting_url = "/mini-hompi/setting";
    const dairy_url = "/mini-hompi/dairy";
    const photo_url = "/mini-hompi/photo";
    const board_url = "/mini-hompi/board";
    const visitor_url = "/mini-hompi/visitor";
    const minihompiUp = "/mini-hompi/titleUpdate"


    const droupdown = $("#nameWrap");
    const dropbtn = droupdown.find(".name");

    const mainTitle = $("#titleBtn.save-mode");


    //오른쪽 사이드 메뉴 이동(색깔 변경)


    moveProfile.on("click", function (e) {
        e.preventDefault();
        moveHomePageCgColor(e, prolfile_url, "moveProfile");
    });

    moveDairy.on("click", function (e) {
        e.preventDefault();
        moveHomePageCgColor(e, dairy_url, "moveDairy");
    });
    moveJukebox.on("click", function (e) {
        e.preventDefault();
        moveHomePageCgColor(e, jukebox_url, "moveJukebox");
    });

    moveSetting.on("click", function (e) {
        e.preventDefault();
        moveHomePageCgColor(e, setting_url, "moveSetting");
    });

    movePhoto.on("click", function (e) {
        e.preventDefault();
        moveHomePageCgColor(e, photo_url, "movePhoto");
    });
    moveBoard.on("click", function (e) {
        e.preventDefault();
        moveHomePageCgColor(e, board_url, "moveBoard");
    });

    moveVisitor.on("click", function (e) {
        e.preventDefault();
        moveHomePageCgColor(e, visitor_url, "moveVisitor");
    });

    //메인화면에 있는 이동
    menu_diary.on("click", function (e) {
        e.preventDefault();
        moveHomePageCgColor(e, dairy_url, "moveDairy");
    });

    menu_photo.on("click", function (e) {
        e.preventDefault();
        moveHomePageCgColor(e, photo_url, "movePhoto");
    });

    menu_board.on("click", function (e) {
        e.preventDefault();
        moveHomePageCgColor(e, board_url, "moveBoard");
    });

    menu_visitor.on("click", function (e) {
        e.preventDefault();
        moveHomePageCgColor(e, visitor_url, "moveVisitor");
    });

    count_dairy.on("click", function (e) {
        e.preventDefault();
        moveHomePageCgColor(e, dairy_url, "moveDairy");
    });

    count_photo.on("click", function (e) {
        e.preventDefault();
        moveHomePageCgColor(e, photo_url, "movePhoto");
    });

    count_visitor.on("click", function (e) {
        e.preventDefault();
        moveHomePageCgColor(e, visitor_url, "moveVisitor");
    });

    count_board.on("click", function (e) {
        e.preventDefault();
        moveHomePageCgColor(e, board_url, "moveBoard");
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

// 메인에서 이름 누르면 나오는 드롭박스
    dropbtn.on("click", function (e) {
        e.preventDefault();
        droupdown.toggleClass("active");
        droupdown.find("#name-droupdown").slideToggle();
    });

    $(document).on("click", function (e) {
        if (!droupdown.is(e.target) && droupdown.has(e.target).length === 0) {
            droupdown.removeClass("active");
            droupdown.find("#name-droupdown").slideUp();
        }
    });


    // 미니홈피 타이틀 변경
    $(".rightMenu").on("click", "#titleBtn", function () {
        const btn = $(this);

        if (btn.val() === '수정') {
            const title = $("#mainTitle");
            const currentTitle = title.text();

            const input = $("<input>", {
                type: "text",
                id: "mainTitleInput",
                value: currentTitle
            });
            title.replaceWith(input);
            btn.val("저장");
            btn.addClass("save-mode");
            input.focus();
        } else {
            const newTitle = $("#mainTitleInput").val();

            // AJAX 요청으로 서버에 업데이트 요청
            $.ajax({
                type: "POST",
                url: "/mini-hompi/updateTitle", // 타이틀 업데이트를 처리하는 서버 URL
                data: {title: newTitle},
                success: function (response) {
                    console.log("업데이트 성공:", response);

                    // 서버 응답 처리
                    if (response.status === "success") {
                        alert(response.message); // 성공 메시지 출력

                        // 새로운 타이틀로 업데이트
                        const $span = $("<span>", {
                            id: "mainTitle",
                            text: newTitle
                        });
                        $("#mainTitleInput").replaceWith($span);
                        btn.val("수정");
                        btn.removeClass("save-mode");
                    } else {
                        alert(response.message); // 실패 메시지 출력
                    }
                },
                error: function (xhr) {
                    const errorResponse = JSON.parse(xhr.responseText);
                    console.error("업데이트 실패:", errorResponse.message);
                    alert("업데이트 실패: " + errorResponse.message);
                }
            });
        }
    });


// JSON 데이터를 가져오는 함수
    function getminihompiDataList() {
        const hompiId = 0; // 홈피 ID
        const hompSub_url = `/mini-hompi/api/${hompiId}`;

        $.ajax({
            type: "GET",
            url: hompSub_url,
            dataType: "json",
            success: function (response) {
                console.log("JSON 데이터 로딩 성공:", response);

                // JSON 데이터를 화면에 렌더링
                renderminihompi(response);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("JSON 로딩 실패:", errorThrown);
            }
        });
    }

// JSON 데이터를 화면에 렌더링하는 함수
    function renderminihompi(data) {
        const minihompi = data.minihompi;
        console.log("myHompi" + data.myHompi);
        console.log("minihompi" + data.minihompi);
        const myHompi = data.myHompi;

        // 화면에 데이터 삽입
        $("#mainTitle").text(minihompi.hompiTitle);
        $("#total").text(minihompi.totalCnt);
        $("#today").text(minihompi.todayCnt);
        $("#hompiUrl").text(minihompi.hompiUrl);
        $(".introduction").text(minihompi.introduction);
        $('#mood').val(minihompi.mood).prop('selected', true);

        //권한에 따라 관리 버튼 숨김
        if (myHompi == 1 || myHompi == 2) {
            $("#moveSetting").hide();
            $(".editImg").hide();
            $("#editBtn").hide();
            $("#titleBtn").hide();
            $("#mood select").prop("disabled", true);
        }
    }

});

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

/** 홈 화면으로 이동, js 중복실행 방지 **/
$(document).on("click", "#moveHome", function (e) {
    e.preventDefault();

    if (window.ajaxCheck) return;
    window.ajaxCheck = true;

    $.ajax({
        type: "GET",
        url: "/mini-hompi/hompiMain",
        dataType: "html",
        success: function (data) {
            executeScriptsFromHTML(data);

            //`minihompiMain.js`가 항상 다시 로드되도록 설정
            $.getScript("/static/js/minihompiMain.js")
                .done(() => {
                    console.log("minihompiMain.js 로드 완료");
                    delete window.isminihompiMainLoaded;  // 다시 로드 가능하도록 초기화
                })
                .fail((jqxhr, settings, exception) => console.error("minihompiMain.js 로드 실패:", exception));

            setTimeout(() => {
                window.ajaxCheck = false;
            }, 500);
        },
        error: function (xhr, status, error) {
            alert("페이지 로딩에 실패했습니다.\n오류내용: " + error);
            window.ajaxCheck = false;
        }
    });
});

window.executeScriptsFromHTML = function (html) {
    const $html = $("<div>").append($.parseHTML(html));
    $("#mainWrapBackground").children().remove().end().append($html);

    // src 없는 인라인 스크립트만 실행 (eval)
    $html.find("script").each(function () {
        const scriptSrc = $(this).attr("src");
        if (!scriptSrc) {
            eval($(this).text());
        }
    });
};

/** 기분 저장하기 **/
$(document).on("change", "#mood", function () {
    const selectMood = $(this).val();
    const hompiId = 0;
    const url = `/mini-hompi/api/mood/save/${hompiId}`
    $.ajax({
        type: "POST",
        url: url,
        dataType: "TEXT",
        data: selectMood,
        success: function () {
        },
        error: function () {
        }
    });
});

