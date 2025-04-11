//contentType:다이어리: "01", 사진첩: "02", 게시판: "03" , 관리: "04"
$(document).ready(function(){
    $(document).on('click','#moveBoard',function(){
        console.log("${hompiId} : " + `${hompiId}`);
        console.log("userId : " + sessionStorage.getItem('userId'));
        currentPage = 1;
        totalPages = 0;
        offset = 0;
        pageSize = 9;
        page = 1;
        let userId = sessionStorage.getItem('userId');
        /*$('#gnb li').removeClass();*/
        /*$(this).addClass('on');*/
        boardAllList(page);
        //console.log("ajax : " + boardAllList(hompiId));
    });
});

function boardAllList(page){
    offset = (page - 1) * pageSize;
    currentPage = page;

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
            let allBoardListHtml = "";
            let allBoardListTitle = `<div class="miniHP-PostTitle dFlex">`
            allBoardListTitle += `<input type="checkbox" class="miniHP-ListChkbox"/>`
            allBoardListTitle += `<span class="miniHP-PostTitleName">제목</span>`
            allBoardListTitle += `<span class="miniHP-PostedBy">작성자</span>`
            allBoardListTitle += `<span class="miniHP-PostDate">작성일</span>`
            allBoardListTitle += `<span class="miniHP-PostViewCount">조회수</span>`
            allBoardListTitle += `</div>`

            for (let i = 0; i < data.length; i++) {
                let title = data[i].hompiBoardTitle;
                let insertDT = formatDate(data[i].insertDT);
                title = title.length > 20 ? title.substring(0, 20) + "..." : title;

                allBoardListHtml += `<div class="miniHP-PostArea dFlex">`;
                allBoardListHtml += `<input type="checkbox" class="miniHP-ListChkbox"/>`
                allBoardListHtml += `<span class="miniHP-PostTitleName">${title}</span>`
                allBoardListHtml += `<span class="miniHP-PostedBy">${data[i].insertUserId}</span>`
                allBoardListHtml += `<span class="miniHP-PostDate">${insertDT}</span>`
                allBoardListHtml += `<span class="miniHP-PostViewCount">100</span>`
                allBoardListHtml += `</div>`
            }

            $(".miniHP-ListContainer").html(allBoardListTitle + allBoardListHtml);
            // 페이지 수 계산 로직 필요
            totalPages = 5; // 예시. 실제 total count를 기반으로 계산
            renderPagination(totalPages, currentPage);
        },
        error: function () {
            alert("페이지 로딩 실패");
        }
    });

    function formatDate(dt) {
        const date = new Date(dt);
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');  // 월은 0부터 시작
        const dd = String(date.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    }

    function loadMessages(page) {
        let offset = (page - 1) * pageSize;
        currentPage = page;

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
                let allBoardListHtml = "";
                let allBoardListTitle = `<div class="miniHP-PostTitle dFlex">`
                allBoardListTitle += `<input type="checkbox" class="miniHP-ListChkbox"/>`
                allBoardListTitle += `<span class="miniHP-PostTitleName">제목</span>`
                allBoardListTitle += `<span class="miniHP-PostedBy">작성자</span>`
                allBoardListTitle += `<span class="miniHP-PostDate">작성일</span>`
                allBoardListTitle += `<span class="miniHP-PostViewCount">조회수</span>`
                allBoardListTitle += `</div>`

                for (let i = 0; i < data.length; i++) {
                    let title = data[i].hompiBoardTitle;
                    let insertDT = formatDate(data[i].insertDT);
                    title = title.length > 20 ? title.substring(0, 20) + "..." : title;

                    allBoardListHtml += `<div class="miniHP-PostArea dFlex">`;
                    allBoardListHtml += `<input type="checkbox" class="miniHP-ListChkbox"/>`
                    allBoardListHtml += `<span class="miniHP-PostTitleName">${title}</span>`
                    allBoardListHtml += `<span class="miniHP-PostedBy">${data[i].insertUserId}</span>`
                    allBoardListHtml += `<span class="miniHP-PostDate">${insertDT}</span>`
                    allBoardListHtml += `<span class="miniHP-PostViewCount">100</span>`
                    allBoardListHtml += `</div>`
                }

                $(".miniHP-ListContainer").html(allBoardListTitle + allBoardListHtml);
                // 페이지 수 계산 로직 필요
                totalPages = 5; // 예시. 실제 total count를 기반으로 계산
                renderPagination(totalPages, currentPage);
            },
            error: function () {
                alert("페이지 로딩 실패");
            }
        });
    }

    function renderPagination(totalPages, currentPage) {
        let paginationHtml = `<button class="chkDeleteBtn">선택삭제</button>`;
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
        loadMessages(selectedPage);
    });

//  이전 페이지 클릭
    $(document).on("click", "#prevPage", function () {
        loadMessages(currentPage - 1);
    });

//  다음 페이지 클릭
    $(document).on("click", "#nextPage", function () {
        loadMessages(currentPage + 1);
    });

}

