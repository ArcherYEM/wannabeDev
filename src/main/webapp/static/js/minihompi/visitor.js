// 방명록 접속
function reloadVisitorSection(hompiId, offset = 0) {
    $.ajax({
        url: `/mini-hompi/visitor/${hompiId}?offset=${offset}`, // 쿼리 파라미터로 offset 전달
        // Controller에서 defaultValue = "0"이 꼭 있어야 하고 만약 빠지면 400 Bad Request 발생함
        type: "GET",
        dataType: "html",
        success: function (html) {
            const $parsedHtml = $("<div>").append($.parseHTML(html));
            const newContent = $parsedHtml.find("#visit").html();

            $("#visit").html(newContent);

        },
        
        error: function () {
            alert("방명록을 불러오는 데 실패했습니다.");
        }
    });
}

// 페이지 이동
function reloadVisitorSection_POST(hompiId, offset = 0) {
    $.ajax({
        url: `/mini-hompi/visitor/page/${hompiId}`,
        type: "POST",
        data: { offset: offset }, // POST 본문에 offset 전송
        dataType: "html",
        success: function (html) {
            const $parsedHtml = $("<div>").append($.parseHTML(html));
            const newContent = $parsedHtml.find("#visit").html();
            $("#visit").html(newContent);
        },
        error: function () {
            alert("페이지 이동에 실패 했습니다.");
        }
    });
}


// 방명록 글자수 제한
$(document).on("input", "#visitor_content", function () {
    const maxChars = 500;
    let text = $(this).val();
    if (text.length > maxChars) {
        text = text.substring(0, maxChars);
        $(this).val(text);
        alert("글자수를 초과했습니다.")
    }
    $("#visitorTextCount").text(`${text.length} / ${maxChars}`);
})

// 등록
$(document).on("click", "#insert_btn", function (e) {
    e.preventDefault();

    const content = $("#visitor_content").val();
    const secret = $("#secret_check").is(":checked") ? "Y" : "N";

    if (!content.trim()) {
        alert("내용을 입력해주세요.");
        return;
    }

    $.ajax({
        type: "POST",
        url: `/mini-hompi/visitor/insert/${hompiId}`,
        data: {
            content: content,
            secret: secret
        },
        success: function () {
            alert("방명록 등록 성공");
            $("#visitor_content").val("");
            $("#secret_check").prop("checked", false);
            reloadVisitorSection(); // 새로고침
        },
        error: function () {
            alert("등록에 실패했습니다. 다시 시도해주세요.");
        }
    });
});



// 방명록 불러오기
function loadVisitorList() {
    $.ajax({
        type: "GET",
        url: `/mini-hompi/visitor/${hompiId}`,
        dataType: "json",
        success: function (data) {
            let html = "";
            const sessionUserId = sessionStorage.getItem("userId");

            data.forEach(visitor => {
                const isWriter = visitor.insertUserId == sessionUserId;
                const date = visitor.updateDt || visitor.insertDt;
                const content = visitor.secretCheck === "Y" ? "비밀글입니다." : visitor.guestBookContent;

                html += `
                    <div id="select">
                        <div class="profile_img">
                            <img src="/static/images/common/minimi/은철.png">
                        </div>
                        <div class="insert_body">
                            <div class="insert_user">
                                <p>${visitor.LoginId}</p>
                                <p>${new Date(date).toLocaleString()}</p>
                            </div>
                            <div class="visitor_content">
                                <textarea class="textarea" >${content}</textarea>
                            </div>
                        </div>
                        ${isWriter ? `
                        <div class="insert_bottom">
                            <button class ="update_btn" data-id="${visitor.guestBookId}">수정</button>
                            <button class ="delete_btn" data-id="${visitor.guestBookId}">삭제</button>
                        </div>` : ''}
                    </div>
                `;
            });

            $("#visitor_list").html(html);
        },
        error: function () {
            alert("방명록 불러오기 실패");
        }
    });
}


// 방명록 수정
$(document).on("click", ".update_btn", function () {
    const $btn = $(this);
    const $visitorItem = $btn.closest(".visitor_item");
    const $textarea = $visitorItem.find(".view-textarea");
    const $delete = $visitorItem.find(".delete_btn")
    const $textCount = $visitorItem.find(".textCount")
    console.log("현재 버튼 텍스트: " + $btn.text());

    if ($btn.text().trim() === "수정") {

        $textarea.data("backup", $textarea.val());
        $textarea.removeAttr("readonly").focus();

        $btn.text("저장");
        $delete.text("취소").addClass("cancel_btn").removeClass("delete_btn");
        $textCount.css("visibility", "visible");

        $textarea.on("input",function () {
            const maxChars = 500;
            let text = $(this).val();
            if (text.length > maxChars) {
                text = text.substring(0, maxChars);
                $(this).val(text);
                alert("글자수를 초과했습니다.")
            }
            $textCount.text(`${text.length} / ${maxChars}`);
        })


    } else if ($btn.text().trim() === "저장") {
        const updatedContent = $textarea.val();
        const guestBookId = $visitorItem.data("id");

        if (!updatedContent.trim()) {
            alert("내용을 입력해주세요.");
            return;
        }

        console.log("업데이트할 내용:", updatedContent);

        $.ajax({
            type: "POST",
            url: `/mini-hompi/visitor/update`,
            contentType: "application/json",
            data: JSON.stringify({
                guestBookId: guestBookId,
                content: updatedContent
            }),
            success: function () {
                alert("방명록이 수정되었습니다.");

                const hompiId = $("#visit").data("hompi-id");
                const offset = 0;
                reloadVisitorSection(hompiId, offset);
            },
            error: function () {
                alert("수정 실패");
            }
        });
    }
});

// 수정 취소
$(document).on("click", ".cancel_btn", function () {
    const $cancel = $(this);
    const $visitorItem = $cancel.closest(".visitor_item");
    const $textarea = $visitorItem.find(".view-textarea");
    const $updateBtn = $visitorItem.find(".update_btn");
    const $textCount = $visitorItem.find(".textCount");

    const originalText = $textarea.data("backup") || ""; // originalText로 data를 저장
    $textarea.val(originalText).prop("readonly", true); // readonly 읽기 전용으로 변경

    $updateBtn.text("수정");
    $cancel.text("삭제").removeClass("cancel_btn").addClass("delete_btn");

    $textCount.css("visibility", "hidden");
});




// 삭제
$(document).on("click", ".delete_btn", function () {
    const $btn = $(this);
    const $visitorItem = $btn.closest(".visitor_item");
    const guestBookId = $visitorItem.data("id");

    if (!confirm("정말 삭제하시겠습니까?")) {
        return;
    }

    $.ajax({
        type: "DELETE",
        url: `/mini-hompi/visitor/delete/${guestBookId}`,
        success: function () {
            alert("삭제 완료");

            reloadVisitorSection();
        },
        error: function () {
            alert("삭제 실패");
        }
    });
});



