$(document).ready(function () {
    let userId = 0;
   /* let currentPage = 1;*/
    let currentReceivePage = 1;
    let currentSendPage = 1;
    let messageType = "receive"; // 현재 어떤 타입인지 추적용
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
                loadMessages(currentReceivePage, "receive");
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
            currentReceivePage = 1;
            messageType = "receive";
            loadMessages(currentReceivePage, "receive");
        }
        if (className === "sendMsgBox") {
            currentSendPage = 1;
            messageType = "send";
            loadMessages(currentSendPage, "send");
        }
    });

    /** 쪽지 리스트 로드 **/
    function loadMessages(page, type = "receive") {
        messageType = type; // 현재 타입 업데이트
        let offset = (page - 1) * pageSize;
        let url = "";

        if (type === "receive") {
            currentReceivePage = page; // 현재 페이지 상태 저장
            url = `/popupMessage/ReceiveMessageList?userId=${userId}&offset=${offset}&pageSize=${pageSize}`;
        } else if (type === "send") {
            currentSendPage = page;
            url = `/popupMessage/SendMessageList?userId=${userId}&offset=${offset}&pageSize=${pageSize}`;
        }

        $("#popupMessageMain").load(url, function () {
            if (type === "receive") {
                totalMessage = parseInt($("#popMsgListContainer").attr("data-totalunreadmsg"));
                if (totalMessage === 0) {
                    $(".receiveMsgCount").removeAttr("class", "circle");
                } else {
                    $(".receiveMsgCount").text(totalMessage);
                }
            }

            totalPages = parseInt($("#popMsgListContainer").attr("data-totalPages"), 10) || 0;
            renderPagination(totalPages, page);
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
        if (messageType === "receive") {
            loadMessages(selectedPage, "receive");
        } else {
            loadMessages(selectedPage, "send");
        }
    });

    //  이전 페이지 클릭
    $(document).on("click", "#prevPage", function () {
        if (messageType === "receive" && currentReceivePage > 1) {
            loadMessages(currentReceivePage - 1, "receive");
        }
        if (messageType === "send" && currentSendPage > 1) {
            loadMessages(currentSendPage - 1, "send");
        }
    });

    //  다음 페이지 클릭
    $(document).on("click", "#nextPage", function () {
        if (messageType === "receive" && currentReceivePage < totalPages) {
            loadMessages(currentReceivePage + 1, "receive");
        }
        if (messageType === "send" && currentSendPage < totalPages) {
            loadMessages(currentSendPage + 1, "send");
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

function fncMsgView(messageId, element, type) {
    console.log("이 메세지를 볼꺼에요 : " + messageId);
    $("#popupMessageMain").load(`/popupMessage/MessageView?messageId=${messageId}&type=${type}`);

    if (type === "receive") {
        const chk = $(element).parent().attr("class");
        if (chk === "unread") {
            let msgCount = $("span.receiveMsgCount").text();
            $("span.receiveMsgCount").text(msgCount - 1);
        }
    }
}

function fncBackPage(element) {
    let pageName = $(element).attr("data-pageName");
    console.log("pageName : " + pageName);
    if (pageName === "receive") {
        $("a.receiveMsgbox").click(); // 받은쪽함수
        console.log("receive pageName : " + pageName);
    } else if (pageName === "send") {
        $("a.sendMsgBox").click(); // 보낸쪽함수
        console.log("send pageName : " + pageName);
    } else {
        console.warn("정의되지 않은 pageName: " + pageName);
    }
}

function fncMsgDelPage(element) {
    let pageName = $(element).attr("data-pageName");
    console.log("pageName : " + pageName);
}