$(document).ready(function () {
    let userId = 0;
    let currentPage = 1;
    let pageSize = 9; // 페이지당 메시지 개수
    let totalPages = 0;
    let totalMessage = 0;

    // 유저 정보 가져오기
    $.ajax({
        type: "GET",
        url: "../userInfo",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            userId = response.userId;

            if (userId) {
                loadMessages(currentPage);
            }
        },
        error: function () {
            alert("비정상적인 접근입니다.");
        }
    });

    $(".receiveMsgbox>a").css({"color": "#ff8000"});

    $(".navClick").click(function () {
        let className = $(this).attr("class").substr(9);

        $("a.aTag").css({"color": "#333333"});
        $("a." + className).css({"color": "#ff8000"});

        if (className === "sendMsgFrm") {
            $("#popupMessageMain").load("/popupMessage/SendMessage");
        }
        if (className === "receiveMsgbox") {
            loadMessages(currentPage);
        }
        if (className === "sendMsgBox") {
            $("#popupMessageMain").load("/popupMessage/SendMessageBox");
        }
    });

    /** 쪽지 리스트 로드 **/
    function loadMessages(page) {
        let offset = (page - 1) * pageSize;

        $("#popupMessageMain").load(`/popupMessage/MessageList?userId=${userId}&offset=${offset}&pageSize=${pageSize}`, function () {
            totalMessage = parseInt($("#popMsgListContainer").attr("data-totalunreadmsg"));
            if (totalMessage === 0) {
                /*console.log("안읽은메시지 없음");*/
                $(".reciveMsgCount").removeAttr("class","circle");
            } else {
                $(".reciveMsgCount").text(totalMessage);
            }

            // 서버에서 totalPages를 받아와서 업데이트
            totalPages = parseInt($("#popMsgListContainer").attr("data-totalPages"), 10) || 0;
            renderPagination(totalPages, currentPage);
        });
    }

    /** 페이지네이션 렌더링 **/
    function renderPagination(totalPages, currentPage) {

        // 페이지 번호 버튼 생성
        let paginationHtml = `<button id="prevPage" ${currentPage === 1 ? 'disabled' : ''}>&lt;&lt;</button>`;

        // 1부터 totalPages까지 페이지 번호 버튼 생성
        for (let i = 1; i <= totalPages; i++) {
            paginationHtml += `<button class="pageNumber" ${i === currentPage ? 'disabled' : ''} data-page="${i}">${i}</button>`;
        }

        paginationHtml += `<button id="nextPage" ${currentPage === totalPages ? 'disabled' : ''}>&gt;&gt;</button>`;

        $("#pagination").html(paginationHtml);

    }

    //  페이지 번호 클릭
    $(document).on("click", ".pageNumber", function () {
        let selectedPage = $(this).data("page");
        currentPage = selectedPage;
        loadMessages(currentPage);
    });

    //  이전 페이지 클릭
    $(document).on("click", "#prevPage", function () {
        if (currentPage > 1) {
            currentPage--;
            loadMessages(currentPage);
        }
    });

    //  다음 페이지 클릭
    $(document).on("click", "#nextPage", function () {
        if (currentPage < totalPages) {
            currentPage++;
            loadMessages(currentPage);
        }
    });


});

/**  쪽지 팝업창 설정 **/
function openPopupMessage() {
    var popupW = 700;
    var popupH = 700;
    var left = Math.ceil((window.screen.width - popupW) / 2);
    var top = Math.ceil((window.screen.height - popupH) / 2);

    window.open('/popupMessage/main', '쪽지 보내기',
        'width=' + popupW + ',height=' + popupH + ',left=' + left + ',top=' + top);
}

function fncMsgView(messageId, element) {
    console.log("이 메세지를 볼꺼에요 : " + messageId);
    $("#popupMessageMain").load(`/popupMessage/ReciveMessageView?messageId=` + messageId);
    var chk = $(element).parent().attr("class");
    if (chk === "unread"){
        var msgCount = $("span.reciveMsgCount").text();
        $("span.reciveMsgCount").text(msgCount-1);
    }

}

function fncBackPage(element){
    let pageName = $(element).attr("data-pageName");
    console.log("pageName : " + pageName);
    if (pageName === "recive") {
        $("a.receiveMsgbox").click();
    }
    if (pageName === "test"){
        console.log("test");
    }

}