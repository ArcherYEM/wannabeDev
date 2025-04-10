$(document).ready(function () {
    let userId = 0;
    /* let currentPage = 1;*/
    let currentReceivePage = 1;
    let currentSendPage = 1;
    let messageType = "receive"; // 현재 어떤 타입인지 추적용
    let pageSize = 9; // 페이지당 메시지 개수
    let totalPages = 0;
    let totalMessage = 0;
    let totalChkBox = 0;

    // 유저 정보 가져오기
    $.ajax({
        type: "GET",
        url: "../userInfo",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            userId = response.userId;
            if (userId) {
                fncReceiveCount(userId);
                loadMessages(currentReceivePage, "receive");
            }
        },
        error: function () {
            alert("비정상적인 접근입니다.");
        }
    });


    $(".receiveMsgbox>span").css({"color": "#ff8000"});

    $(".navClick").click(function () {
        let className = $(this).attr("class").substr(9);

        $("span.aTag").css({"color": "#333333"});
        $("span." + className).css({"color": "#ff8000"});

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

        $(".receivemsgChkbox").click(function () {
            let receivemsgChkbox = $(".receivemsgChkbox").prop("checked");

            if (receivemsgChkbox) {
                $(".receivemsgChkbox").prop("checked", true)
                $(".msgChkbox").prop("checked", true);
                totalChkBox = $(".msgChkbox:checked").length;
            } else {
                $(".msgChkbox").prop("checked", false);
            }

        });
        $(".msgChkbox").click(function () {
            let msgChkbox = $(".msgChkbox:checked").length;

            if (msgChkbox === totalChkBox) {
                $(".receivemsgChkbox").prop("checked", true);
            } else {
                $(".receivemsgChkbox").prop("checked", false);
            }

        });

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
                    $(".receiveMsgCount").text();
                    $(".receiveMsgCount").removeAttr("class", "circle");
                } else {
                    $(".receiveMsgCount").text(totalMessage);
                    if (window.opener && !window.opener.closed) {
                        const unReadMsgCount = $(window.opener.document).find("span.unReadMsgCount");
                        unReadMsgCount.text(totalMessage);
                    }
                }
            }

            totalPages = parseInt($("#popMsgListContainer").attr("data-totalPages"), 10) || 0;
            renderPagination(totalPages, page, messageType);
        });
    }

    /** 페이지네이션 렌더링 **/
    function renderPagination(totalPages, currentPage, messageType) {
        
        let paginationHtml = `<button class="chkDeleteBtn" onclick="fncDeleteMsgBtn('${messageType}')">선택삭제</button>`;
        // 페이지 번호 버튼 생성
        paginationHtml += `<div class="buttonWrap"><button id="prevPage" ${currentPage === 1 ? 'disabled' : ''}>&lt;&lt;</button>`;

        // 1부터 totalPages까지 페이지 번호 버튼 생성
        for (let i = 1; i <= totalPages; i++) {
            paginationHtml += `<button class="pageNumber" ${i === currentPage ? 'style=background-color:greenyellow;' : ''} data-page="${i}">${i}</button>`;
        }

        paginationHtml += `<button id="nextPage" ${currentPage === totalPages ? 'disabled' : ''}>&gt;&gt;</button></div>`;

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

    // 메세지 글자수 제한
    $(document).on("input", "#sendTextArea", function () {
        const maxChars = 500;
        let text = $(this).val();
        if (text.length > maxChars) {
            text = text.substring(0, maxChars);
            $(this).val(text);
        }
        $("#textCountArea").text(`${text.length} / ${maxChars}`);
    })

    // 받는 사람 입력 시 검색
    $(document).on("change keyup paste", "#recipient", function () {
        const $recipient = $(this);
        const textValue = $recipient.val();

        $.ajax({
            type: "GET",
            url: "../userInfo",
            contentType: "application/json",
            dataType: "json",
            success: function (response) {
                const searchedId = response.userId;
                if (searchedId) {
                    fncSearchName(searchedId, textValue);
                }
            },
            error: function () {
                alert("비정상적인 접근입니다.");
            }
        });
    });

    // 받는사람 추가
    $(document).on("click", "span.addsendBtn", function () {
        const $recipient = $("#recipient");
        const recipient = $recipient.val().trim();

        if (!recipient) {
            alert("받는 사람을 추가해주세요.");
            return;
        }

        $recipient.val(recipient).attr("disabled", true);
        $(this).addClass("deactivate");
    });

    // 쪽지 전송
    $(document).on("click", "span.msgSendBtn", function () {
        const $recipient = $("#recipient");
        const $textArea = $("#sendTextArea");
        const addBtn = $("span.addsendBtn");
        let recipient = $recipient.val().trim();
        let textContent = $textArea.val();
        const isAdded = $recipient.is(":disabled");

        if (!recipient) {
            alert("받는 사람을 추가해주세요.");
            return;
        }

        if(!textContent) {
            alert("쪽지 내용을 작성해주세요.");
            return;
        }

        if (!isAdded) {
            alert("추가 버튼을 눌러 주세요.");
            return;
        }

        // '(이름)'값 제거
        const cut = recipient.indexOf("(");
        recipient = recipient.substring(0,cut-1);
        if (cut !== -1) {
            recipient = recipient.substring(0,cut-1);
        }

        if (!recipient) {
            alert("받는 사람 이름을 확인해주세요.");
            $recipient.removeAttr("disabled");
            addBtn.removeClass("deactivate");
            return;
        }

        const message = $textArea.val().replace(/\n/g, "<br>");

        $.ajax({
            type: "POST",
            url: "/popupMessage/SendMessageProc",
            data: {
                userId: userId,
                recipient: recipient,
                sendTextArea: message
            },
            success: function () {
                alert("쪽지가 정상적으로 전송되었습니다.");
                window.location.href = "/popupMessage/main";
            },
            error: function () {
                alert("쪽지 전송에 실패했습니다. 다시 시도해주세요.");
            }
        });
    });

    // 이름 검색
    function fncSearchName(userId, keyword) {
        $.ajax({
            type: "GET",
            url: "../popupMessage/SendSearchName",
            contentType: "application/json",
            dataType: "json",
            data: {
                userId: userId,
                recipient: keyword
            },
            success: function (data) {
                const $list = $("#selectUserName");
                $list.empty();
                data.forEach(friend => {
                    $list.append(
                        `<option data-friendUserId="${friend.friendUserId}" value="${friend.name} (${friend.friendUserNickName})"></option>`
                    );
                });
            },
            error: function () {
                alert("비정상적인 접근입니다.");
            }
        });
    }
});

/**  쪽지 팝업창 설정 **/
function openPopupMessage() {
    let popupW = 700;
    let popupH = 700;
    let left = Math.ceil((window.screen.width - popupW) / 2);
    let top = Math.ceil((window.screen.height - popupH) / 2);

    window.open('/popupMessage/main', '쪽지 보내기',
        'width=' + popupW + ',height=' + popupH + ',left=' + left + ',top=' + top);
}

function fncMsgView(messageId, element, type) {
    $("#popupMessageMain").load(`/popupMessage/MessageView?messageId=${messageId}&type=${type}`);

    if (type === "receive") {
        const chk = $(element).parent().attr("class");
        if (chk === "unread") {
            let receiveMsgCount = $("span.receiveMsgCount");
            let msgCount = receiveMsgCount.text();
            msgCount = msgCount-1;
            receiveMsgCount.text(msgCount);

            if (window.opener && !window.opener.closed) {
                const unReadMsgCount = $(window.opener.document).find("span.unReadMsgCount");
                const newIcon = $(window.opener.document).find(".messageBox > img")
                    unReadMsgCount.text(msgCount);
                if (msgCount <= "0") {
                    newIcon.remove();
                }

            }
            if (msgCount <= "0") {
                receiveMsgCount.text("");
                receiveMsgCount.attr("class","circle").remove();

            }


        }
    }
}

function fncBackPage(element) {
    let pageName = $(element).attr("data-pageName");
    if (pageName === "receive") {
        $("span.receiveMsgbox").click(); // 받은쪽함수
    } else if (pageName === "send") {
        $("span.sendMsgBox").click(); // 보낸쪽함수
    } else {
        console.warn("정의되지 않은 pageName: " + pageName);
    }
}

function fncMsgDelPage(element) {
    let type = $(element).attr("data-pageName");
    let messageId = $("pre#receiveMessagePre").attr("data-messageId");

    if (confirm("쪽지를 삭제 하시겠습니까?")) {

        $.ajax({
            type: "GET",
            url: "/popupMessage/DeleteMessage",
            data: {
                messageId: messageId,
                type: type
            },
            success: function (response) {
                alert(response);
                if (type === "send") {
                    $("a.sendMsgBox").click();
                } else {
                    $("a.receiveMsgbox").click();
                }

            },
            error: function () {
                alert("비정상적인 접근입니다.");
            }
        });

    } else {
        alert("삭제를 취소 하였습니다.");
    }
}

function fncMsgListAllChkBox() {

    let isChecked = $(".msgChkbox").prop("checked"); // 전체선택 체크박스 상태

    $(".msgChkboxList").prop("checked", isChecked); // 개별 체크박스 일괄 설정

    let totalChecked = $(".msgChkboxList:checked").length;
    
}

function fncMsgChkBox() {
    // 선택된 체크박스 개수
    let checkedCount = $(".msgChkboxList:checked").length;
    // 전체 체크박스 개수
    let totalCount = $(".msgChkboxList").length;

    // 모두 체크된 상태면 전체 체크박스도 체크
    if (checkedCount === totalCount) {
        $(".msgChkbox").prop("checked", true);
    } else {
        $(".msgChkbox").prop("checked", false);
    }
    
}

function fncDeleteMsgBtn(messageType) {
    messageType = messageType + "s"
    let chkMsgID = [];

    $(".msgChkboxList:checked").each(function () {
        let msgId = $(this).attr("data-messageId");
        chkMsgID.push(msgId);
    });

    if (chkMsgID.length === 0) {
        alert("삭제할 메시지를 선택해주세요.");
        return;
    }
    if (!confirm("선택한 쪽지를 삭제하시겠습니까?")) {
        return;
    }
    let params = new URLSearchParams();
    chkMsgID.forEach(function (id) {
        params.append("messageId", id); // messageId=12&messageId=13 이런 식으로 여러 개 붙음
    });
    params.append("type", messageType);

    $.ajax({
        type: "GET",
        url: "/popupMessage/DeleteMessage?" + params.toString(),

        success: function (response) {
            alert(response);

            if (messageType === "receives") {
                $("a.receiveMsgbox").click();
            } else {
                $("a.sendMsgBox").click();
            }
        },
        error: function () {
            alert("삭제 중 오류가 발생했습니다.");
        }
    });
}

/* 메인 쪽지*/
function fncReceiveCount(userId) {
        $.ajax({
            url: `/getUnreadMsg?userId=${userId}`,
            type: "GET",
            success: function (count) {
                if (count <= 0) {
                   $(".messageBox>img").remove();
                }
                $(".unReadMsgCount").text(count); // 받은 개수를 span 등에 넣어줌
            },
            error: function () {
                console.error("쪽지 개수 가져오기 실패");
            }
        });

}