//contentType:다이어리: "01", 사진첩: "02", 게시판: "03" , 관리: "04"
let userId = sessionStorage.getItem('userId');
let currentPage = 1;
let pageSize = 9;
$(document).ready(function () {
    
    // 게시판 이동 버튼 클릭 시 초기 페이지 로딩
    $(document).on('click', '#moveBoard', function () {
        /*const userId = sessionStorage.getItem('userId');*/
        console.log("userId : " + userId);
        console.log("hompiId : " + hompiId);
        currentPage = 1;
        boardAllList(currentPage, pageSize);
    });
    
    /* 게시판 리스트 내체크박스 이벤트*/
    $(document).on("click", ".miniHP-ListTitleChkbox", function () {
        let ListTitleChkbox = $(".miniHP-ListTitleChkbox").prop("checked");
        if (ListTitleChkbox) {
            $(".miniHP-ListChkbox").prop("checked", true);
        } else {
            $(".miniHP-ListChkbox").prop("checked", false);
        }
    });
    
    $(document).on("click", ".miniHP-ListChkbox", function () {
        let listChkBoxCount = $(".miniHP-ListChkbox").length;
        let listChkBox = $(".miniHP-ListChkbox:checked").length;
        
        if (listChkBoxCount === listChkBox) {
            $(".miniHP-ListTitleChkbox").prop("checked", true);
        } else {
            $(".miniHP-ListTitleChkbox").prop("checked", false);

        }
        
    });
    
    // 페이지 번호 클릭
    $(document).on("click", ".pageNumber", function () {
        let selectedPage = $(this).data("page");
        currentPage = selectedPage;
        boardAllList(currentPage, pageSize);
    });

    // 이전 페이지
    $(document).on("click", "#prevPage", function () {
        if (currentPage > 1) {
            currentPage -= 1;
            boardAllList(currentPage, pageSize);
        }
    });

    // 다음 페이지
    $(document).on("click", "#nextPage", function () {
        currentPage += 1;
        boardAllList(currentPage, pageSize);
    });
    
    // 상세보기 내 삭제
    $(document).on("click", ".viewDeleteBtn", function () {
        console.log("삭제버튼");
    });
    // 상세보기 내 목록
    $(document).on("click", ".viewToListBtn", function () {
        console.log("목록버튼");
        $("#moveBoard").click();
    });
    // 상세보기 내 수정
    $(document).on("click", ".viewUpdateBtn", function () {
        console.log("수정버튼");
    });
    
    
});

function boardAllList(page, pageSize) {
    const offset = (page - 1) * pageSize;
    $.ajax({
        type: "GET",
        url: "/mini-hompi/board/All-BoardList",
        data: {
            hompiId: hompiId,
            offset: offset,
            pageSize: pageSize
        },
        dataType: "json",
        success: function (data) {
            let boardList = data.boardList;
            let boardCount = data.boardCount;

            let allBoardListHtml = `
                <div class="miniHP-PostTitle dFlex" data-boardCount="${boardCount}">
                    <input type="checkbox" class="miniHP-ListTitleChkbox"/>
                    <span class="miniHP-PostTitleName">제목</span>
                    <span class="miniHP-PostedBy">작성자</span>
                    <span class="miniHP-PostDate">작성일</span>
                    <!--<span class="miniHP-PostViewCount">조회수</span>-->
                </div>
            `;

            for (let i = 0; i < boardList.length; i++) {
                let hompiBoardId = boardList[i].hompiBoardId;
                let title = boardList[i].hompiBoardTitle;
                let insertDT = formatDate(boardList[i].insertDT);
                let writer = boardList[i].name;
                title = title.length > 20 ? title.substring(0, 20) + "..." : title;

                allBoardListHtml += `
                    <div class="miniHP-PostArea dFlex" data-boardId="${hompiBoardId}"">
                        <input type="checkbox" class="miniHP-ListChkbox" data-boardId="${hompiBoardId}"/>
                        <span class="miniHP-PostTitleName" onclick="fncBoardView(${hompiBoardId})">${title}</span>
                        <span class="miniHP-PostedBy">${writer}</span>
                        <span class="miniHP-PostDate">${insertDT}</span>
                        <!--<span class="miniHP-PostViewCount">100</span>-->
                    </div>
                `;
            }

            $(".miniHP-ListContainer").html(allBoardListHtml);

            let totalPages = Math.ceil(boardCount / pageSize);
            renderPagination(totalPages);
        },
        error: function () {
            alert("게시판 데이터를 불러오는 데 실패했습니다.");
        }
    });
}

function renderPagination(totalPages) {
    let paginationHtml = `<div class="btnTopArea dFlex">`
    paginationHtml += `<button class="chkDeleteBtn">선택삭제</button>`;
    paginationHtml += `<button class="WriterBoard">글쓰기</button>`;
    paginationHtml += `</div>`;
    paginationHtml += `<div class="buttonWrap"><button id="prevPage" ${currentPage === 1 ? 'disabled' : ''}>&lt;&lt;</button>`;
    console.log("totalPages:", totalPages, "currentPage:", currentPage);
    for (let i = 1; i <= totalPages; i++) {
        paginationHtml += `<button class="pageNumber" ${i === currentPage ? 'style=background-color:#dddddd; font-weight: bold; outline-color: black;' : ''} data-page="${i}">${i}</button>`;
    }

    paginationHtml += `<button id="nextPage" ${currentPage === totalPages ? 'disabled' : ''}>&gt;&gt;</button></div>`;

    $(".miniHP-Wrap > #pagination").html(paginationHtml);
}

function formatDate(dt) {
    const date = new Date(dt);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

function formatDetailDate(dt) {
    const date = new Date(dt);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const HH = String(date.getHours()).padStart(2, '0');
    const MM = String(date.getMinutes()).padStart(2, '0');
    
    return `${yyyy}.${mm}.${dd} ${HH}:${MM}`;
}

function fncBoardView(boardViewId) {
    console.log("boardViewId : " + boardViewId);
    $.ajax({
        type: "GET",
        url: "/mini-hompi/board/BoardView",
        contentType: "application/json",
        data: {
            "hompiBoardId": boardViewId
        },
        dataType: "json",
        success: function (response) {
            let $rsp = response[0];
            let folderId = $rsp.folderId;
            let hompiBoardId = $rsp.hompiBoardId;
            let hompiBoardTitle = $rsp.hompiBoardTitle;
            let hompiBoardContent = $rsp.hompiBoardContent;
            let postByName = $rsp.name;
            let insertDT = formatDetailDate($rsp.insertDT);
            
            let viewHtml = `
                <div class="miniHP-boardView">
                    <span class="boardView-Title">${hompiBoardTitle}</span>
                    <div class="boardView-header dFlex">
                        <span class="boardView-byName">${postByName}</span>
                        <span class="boardView-insertDT">${insertDT}</span>
                    </div>
                    <div class="boardView-ContentArea">
                        ${hompiBoardContent}
                    </div>
                    <div class="boardView-btnArea">
                        <button class="viewDeleteBtn">삭제</button>
                        <button class="viewToListBtn">목록</button>
                        <button class="viewUpdateBtn">수정</button>
                    </div>
                </div>
            `;
            $(".miniHP-Wrap").html(viewHtml);
            console.log(response);
        },
        error: function (error) {
            alert("게시판 데이터를 불러오는 데 실패했습니다.");
        }
    });
}