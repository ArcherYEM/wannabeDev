/** 이벤트 리스너 등록 **/
$(document).ready(function () {
    let hompiAuth = null;
    const popuoMain = $("#popupMain");

    const url = window.location.pathname;
    const hompiId = url.split('/').pop();

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
    const visitor_url = `/mini-hompi/visitor/${hompiId}`;
    const minihompiUp = "/mini-hompi/titleUpdate";

    const droupdown = $("#nameWrap");
    const dropbtn = droupdown.find(".name");

    const mainTitle = $("#titleBtn.save-mode");


    //오른쪽 사이드 메뉴 이동(색깔 변경)
    myHompiCheck();
    //0.내미니홈피 1.비로그인 2.남의미니홈피 3.일촌

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

    /** 권한 확인하기 **/
    function myHompiCheck() {
        const hompiDataUrl = `/api/minihompi/myHompiCheck/${hompiId}`

        $.ajax({
            type: "GET",
            url: hompiDataUrl,
            dataType: "json",
            success: function (data) {

                const hompiAuth = data.myHompiCheck;
                const userId = data.userId;

                sessionStorage.setItem('myHompiCheck', hompiAuth);
                sessionStorage.setItem('userId', userId);

                getMinihompiFriendCommentList();
                getMinihompiDataList();
                getMiniroomDataList();
            },
            error: function () {

            }
        });
    }

    // 프로필 이동
    function moveHomePageCgColor(e, url, menuName) {

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
        const url = window.location.pathname;

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
                url: `/api/minihompi/updateTitle/${hompiId}`, // 타이틀 업데이트를 처리하는 서버 URL
                data: {title: newTitle},
                success: function (response) {
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
                    alert("업데이트 실패: " + errorResponse.message);
                }
            });
        }
    });

    // json 데이터를 가져오는 함수
    function getMinihompiDataList() {
        const hompiDataUrl = `/api/minihompi/${hompiId}`
        $.ajax({
            type: "GET",
            url: hompiDataUrl,
            dataType: "json",
            success: function (data) {
                renderminihompi(data); // 화면 렌더링
            },
            error: function () {
                alert("미니홈피 데이터를 가져오는 데 실패했습니다.");
            }
        });
    }

    // JSON 데이터를 화면에 렌더링하는 함수
    function renderminihompi(data) {
        const minihompi = data.minihompi;
        $("#mainTitle").text(minihompi.hompiTitle ?? "제목이 없습니다.");
        $("#total").text(minihompi.totalCnt ?? "-");
        $("#today").text(minihompi.todayCnt ?? "-");
        $("#hompiUrl").text(minihompi.hompiUrl ?? "홈피 주소 없음");
        $(".introduction").text(minihompi.introduction ?? "자기소개가 작성되지 않았습니다.");
        $(".name").text(minihompi.name ?? "이름없음");
        $(".nameEmail").text(minihompi.email ?? "null@com");
        if (minihompi.mood != null) {
            $('#mood').val(minihompi.mood).prop('selected', true);
        } else {
            $('#mood').val("angry").prop('selected', true);
        }

        if (minihompi.profileImage) {
            $(".mainImg > img").attr("src", minihompi.profileImage);
        }
        if (minihompi.genderCode == "M") {
            $(".nameSymbol").text("♂");
        } else if (minihompi.genderCode == "F") {
            $(".nameSymbol").text("♀");
        } else {
            $(".nameSymbol").text("n");
        }

        const hompiAuth = sessionStorage.getItem('myHompiCheck');
        const container = $('#profileContainer');

        //권한에 따라 관리 버튼 없앰
        if (hompiAuth != 0) {
            $("#moveSetting").remove();
            $(".editImg").remove();
            $("#editBtn").remove();
            $("#titleBtn").remove();
            $("select#mood").prop("disabled", true);

        }
        if (hompiAuth == 0) {
            container.addClass('editing');
            $("#profileImg").addClass('editing');
        }
        if (hompiAuth != 3) {
            const row = $("p.fcWb").closest("tr");
            row.find("input").prop("readonly", true);
            row.find("button").prop("disabled", true);
        }
    }

    /** 쪽지 팝업창 설정 **/
    window.onpneMessage = function() {
        const userId = sessionStorage.getItem('userId');

        console.log("userId : " + userId);
        console.log("hompiId : " + hompiId);
        var popupW = 700;
        var popupH = 700;
        var left = Math.ceil((window.screen.width - popupW) / 2);
        var top = Math.ceil((window.screen.height - popupH) / 2);
        if (userId === 'null') {
            alert("로그인 후 이용해주세요.");
            return;
        } else if (userId === hompiId) {
            alert("자신에게는 쪽지를 보낼 수 없습니다.");
            return;
        }
       window.open(`/mini-hompi/newMessage?userId=${userId}&recipient=${hompiId}`,
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
                $.getScript("/static/js/minihompi/minihompiMain.js")
                    .done(() => {

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
        const moodUrl = `/api/minihompi/mood-save/${hompiId}`
        $.ajax({
            type: "POST",
            url: moodUrl,
            dataType: "TEXT",
            data: {mood: selectMood},
            success: function () {
            },
            error: function () {
                alert("기분 저장에 실패했습니다.")
            }
        });
    });

    /** 자기소개 변경 **/
    let originalIntro = ''; // 자기소개 롤백용

    $('#editBtn').on('click', function () {
        const container = $('#profileContainer');
        const editText = $(this).find('a');
        const introBox = $('.introText');
        const currentBtnText = editText.text().trim();

        const introElement = introBox.find('.introduction');
        originalIntro = introElement.text() ? introElement.text().trim() : '';
        const textarea = $(`<textarea class="introductionInput" rows="4" maxlength="300">${originalIntro}</textarea>`);
        introElement.replaceWith(textarea);

        originalImgSrc = $('#profileImg').attr('src') || '';
        newImageFile = null;

        container.addClass('editing');
        editText.text('저장');

        if (currentBtnText === '저장') {
            // --- 저장 요청
            const introInput = $('.introductionInput');
            const newIntro = (introInput.val() || '').trim();

            if (newIntro === '') {
                alert('자기소개를 입력해주세요.');
                introInput.focus();
                return;
            }
            $.ajax({
                type: 'POST',
                url: `/api/minihompi/updateIntro/${hompiId}`,
                data: {introduction: newIntro},
                success: function (res) {
                    const newP = $(`<p class="introduction">${newIntro}</p>`);
                    introInput.replaceWith(newP);
                    editText.text('EDIT');
                    container.removeClass('editing');
                },
                error: function () {
                    alert('자기소개 저장 실패');
                    const rollbackP = $(`<p class="introduction">${originalIntro}</p>`);
                    introInput.replaceWith(rollbackP);
                    $('#profileImg').attr('src', originalImgSrc);
                    editText.text('EDIT');
                    container.removeClass('editing');
                }
            });
        }
    });

    /** 프로필 사진 변경 **/
    let originalImgSrc = ''; // 이미지 롤백용
    let newImageFile = null; // 새 이미지 저장용

// 사진 변경 버튼 클릭 → 파일 input 열기
    $('#changePhotoBtn').on('click', function () {
        $('#profileImage').click();
    });

// 파일 선택 시 미리보기 + 자동 업로드
    $('#profileImage').on('change', function (e) {
        const file = e.target.files[0];

        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onload = function (e) {
                originalImgSrc = $('#profileImg').attr('src'); // 롤백용 저장
                $('#profileImg').attr('src', e.target.result); // 미리보기 반영
            };

            reader.readAsDataURL(file);
            newImageFile = file;

            updateProfileImage(); // 자동 업로드
        } else {
            alert('이미지 파일만 선택 가능합니다.');
            $('#profileImage').val('');
        }
    });

    // 서버로 이미지 전송
    function updateProfileImage() {
        const imageFormData = new FormData();
        imageFormData.append('profileImage', newImageFile);

        $.ajax({
            type: 'POST',
            ENCTYPE: 'MULTIPART/FORM-DATA',
            url: `/api/minihompi/updateProfileImage/${hompiId}`,
            data: imageFormData,
            processData: false,
            contentType: false,
            success: function (res) {
                alert('프로필 이미지 저장 성공');
            },
            error: function () {
                alert('프로필 이미지 저장 실패');
                $('#profileImg').attr('src', originalImgSrc); // 롤백
            }
        });
    }

    /** 일촌평 데이터 가져오기 **/
    function getMinihompiFriendCommentList() {
        const hompiDataUrl = `/api/minihompi/FriendComment/${hompiId}`;

        $.ajax({
            type: "GET",
            url: hompiDataUrl,
            dataType: "json",
            success: function (data) {
                renderMinihompiFriendCommentList(data);
            },
            error: function () {
                alert("일촌평 데이터를 가져오는 데 실패했습니다.");
            }
        });

        function renderMinihompiFriendCommentList(data) {
            const viewUserId = sessionStorage.getItem('userId');
            const hompiAuth = sessionStorage.getItem('myHompiCheck');
            let html = '';

            data.forEach(function (FriendCommentDTO) {
                html += `
                <li>
                    <span class="comment">${FriendCommentDTO.friendComments}</span>
                    <span class="star">(
                        <span class="nickName fcWb">${FriendCommentDTO.name}</span>
                        ${FriendCommentDTO.userNickname})
                        <span class="todayDate">${FriendCommentDTO.updateDt}</span>
                        <div id="fcWUser" style="display: none">${FriendCommentDTO.writeUserId}</div>
                        ${FriendCommentDTO.writeUserId == viewUserId || hompiAuth == "0" ?
                    '<div class="deleteImg">' +
                    '<img src="/images/common/icon/delete.png" class="deleteBtn"></div>'
                    : ''}
                    </span>
                </li>
            `;
            });

            $('.commentList').html(html);
        }
    }

    /** 일촌평 작성 **/
    $('#fcBtn').on('click', function () {
        let fcContent = $("#fcContent").val();
        const hompiDataUrl = `/api/minihompi/insertFriendComment/${hompiId}`;

        if (!fcContent.trim()) {
            alert("내용을 입력해주세요!");
            return;
        }

        $.ajax({
            type: "POST",
            url: hompiDataUrl,
            dataType: "json",
            data: {
                fcContent: fcContent
            },
            success: function () {
                alert("일촌평 작성 완료");
                getMinihompiFriendCommentList();
            },
            error: function () {
                alert("일촌평 작성 실패");
            }
        });
    });

    /** 일촌평 삭제 **/
    $(document).on("click", ".deleteBtn", function () {
        const commentId = $(this).closest("li").find("#fcWUser").text();
        const hompiDataUrl = `/mini-hompi/api/friendCommentDelete/${hompiId}/${commentId}`;

        if (!confirm("정말 삭제하시겠습니까?")) {
            return;
        }

        $.ajax({
            type: "DELETE",
            url: hompiDataUrl,
            success: function () {
                alert("일촌평이 삭제되었습니다.");
                getMinihompiFriendCommentList();
            },
            error: function (xhr, status, error) {
                console.log("삭제 실패", status, error);
                alert("일촌평 삭제에 실패했습니다.");
            }
        });
    });

    /* 미니룸 가져오기 */
    function getMiniroomDataList() {
        const hompiDataUrl = `/api/minihompi/miniroom/${hompiId}`
        $.ajax({
            type: "GET",
            url: hompiDataUrl,
            dataType: "json",
            success: function (data) {
                $(".miniRoom").css("background-image", `url('${data.FILE_PATH}')`);
            },
            error: function () {
                alert("미니룸 데이터를 가져오는 데 실패했습니다.");
            }
        });
    }

});
