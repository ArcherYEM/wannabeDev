//contentType:다이어리: "01", 사진첩: "02", 게시판: "03" , 관리: "04"
let userId = sessionStorage.getItem('userId');
let currentPage = 1;
let pageSize = 9;
$(document).ready(function () {

    // 게시판 이동 버튼 클릭 시 초기 페이지 로딩
    $(document).on('click', '#moveBoard', function () {
        /*const userId = sessionStorage.getItem('userId');*/
        setTimeout(function (){
            $('.smallFolderWrap').find("button").first().addClass('folderOn');
            let folderId = $("button.folderOn").attr("value");
            console.log("folderId : " + folderId);
            console.log("userId : " + userId);
            console.log("hompiId : " + hompiId);
            currentPage = 1;
            $(".miniHP-Wrap").prepend(`<span class="boardFolderName">`+ $("button.folderOn").text().trim() +`</span>`);
            boardList(folderId, currentPage, pageSize);
        }, 100);




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
        let folderId = $("button.folderOn").attr("value");
        currentPage = selectedPage;
        boardList(folderId, currentPage, pageSize);
    });

    // 이전 페이지
    $(document).on("click", "#prevPage", function () {
        let folderId = $("button.folderOn").attr("value");
        if (currentPage > 1) {
            currentPage -= 1;

            boardList(folderId, currentPage, pageSize);
        }
    });

    // 다음 페이지
    $(document).on("click", "#nextPage", function () {
        let folderId = $("button.folderOn").attr("value");
        currentPage += 1;
        boardList(folderId, currentPage, pageSize);
    });

    // 선택삭제
    $(document).on("click", ".chkDeleteBtn", function () {
        console.log("선택삭제버튼");
        let boardId = [];
        $(".miniHP-ListChkbox:checked").each(function () {
            let boardIdList = $(this).attr("data-boardid");
            boardId.push(boardIdList);
        });
        console.log("선택된삭제버튼 : " + boardId);
        fncDeleteBoardPost(boardId);

    });

    // 상세보기 내 삭제
    $(document).on("click", ".viewDeleteBtn", function () {
        let boardId = [];
            boardId.push($(this).attr("data-boardid"));
        console.log("단일삭제버튼");
        fncDeleteBoardPost(boardId);
    });
    // 상세보기 내 목록
    $(document).on("click", ".viewToListBtn", function () {

        console.log("목록버튼");
        $("button.folderOn").click();
    });
    // 상세보기 내 수정
    $(document).on("click", ".viewUpdateBtn", function () {
        console.log("수정버튼");
        fncUpdateBoard();
    });


});

function boardList(folderId, currentPage, pageSize) {
    const offset = (currentPage - 1) * pageSize;
    $.ajax({
        type: "GET",
        url: "/mini-hompi/board/All-BoardList",
        data: {
            hompiId: hompiId,
            folderId: folderId,
            offset: offset,
            pageSize: pageSize
        },
        dataType: "json",
        success: function (data) {
            let boardList = data.boardList;
            let boardCount = data.boardCount;
            let allBoardListHtml = "";

            if (`${boardCount}` === "0") {
                allBoardListHtml = `
                <span class="boardFolderName">`+$("button.folderOn").text().trim()+`</span>
                <div class="miniHP-ListContainer">
                    <div class="miniHP-PostTitles dFlex" data-boardCount="${boardCount}">
                            <span>게시물이 없습니다.</span>
                    </div>
                </div>
                
            `;

            } else {
                allBoardListHtml = `
                    <span class="boardFolderName">`+$("button.folderOn").text().trim()+`</span>
                        <div class="miniHP-ListContainer">
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
            }
            let totalPages = Math.ceil(boardCount / pageSize);
            allBoardListHtml += `
                            </div>
                                <div id="pagination">`+renderPagination(totalPages)+`</div>
            `;
            $(".miniHP-Wrap").html(allBoardListHtml);


        },
        error: function () {
            alert("게시판 데이터를 불러오는 데 실패했습니다.");
        }
    });
}

function renderPagination(totalPages) {
    let paginationHtml =``;
    if (hompiId === userId){
        paginationHtml = `<div class="btnTopArea dFlex">`
        paginationHtml += `<button class="chkDeleteBtn">선택삭제</button>`;
        paginationHtml += `<button class="WriterBoard" onclick="fncWriteBoard()">글쓰기</button>`;
        paginationHtml += `</div>`;
    }
    paginationHtml += `<div class="buttonWrap"><button id="prevPage" ${currentPage === 1 ? 'disabled' : ''}>&lt;&lt;</button>`;
    console.log("totalPages:", totalPages, "currentPage:", currentPage);
    for (let i = 1; i <= totalPages; i++) {
        paginationHtml += `<button class="pageNumber" ${i === currentPage ? 'style=background-color:#dddddd; font-weight: bold; outline-color: black;' : ''} data-page="${i}">${i}</button>`;
    }

    paginationHtml += `<button id="nextPage" ${currentPage === totalPages ? 'disabled' : ''}>&gt;&gt;</button></div>`;
    return paginationHtml;
    /*$(".miniHP-Wrap > #pagination").html(paginationHtml);*/
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
                        <button class="viewDeleteBtn" data-BoardId="${hompiBoardId}">삭제</button>
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

function fncClickfolder(folderId) {
    currentPage = 1;
    pageSize = 9;

    /*console.log("hompiId : " + hompiId);
    console.log("folderId : "+ folderId);
    console.log("offset : " + offset);
    console.log("pageSize : " + pageSize);*/

    boardList(folderId, currentPage, pageSize);
}

function fncDeleteBoardPost(delBoardPostId){
    console.log("delBoardPostId : " + delBoardPostId);
    let params = new URLSearchParams();
    delBoardPostId.forEach(function (id) {
        params.append("boardId", id); // boardId=12&boardId=13 이런 식으로 여러 개 붙음
    });
    if (confirm("게시물을 삭제 하시겠습니까?")) {
        $.ajax({
            type: "GET",
            url: "/mini-hompi/board/deleteBoardPost?" + params.toString(),
            success: function (response) {
                alert(response);
                $("button.folderOn").click();
            },
            error: function () {
                alert("비정상적인 접근입니다.");
            }
        });
    }
}

function fncWriteBoard(){
    console.log("게시판 글쓰기 fnc");
    $.ajax({
        type:"GET",
        url: "/minihompi/board/writeBoardFrom",
        success: function (response) {
            $(".miniHP-Wrap").html(response);
            
            setTimeout(function () {
                response.append(loadCKEditer());
            }, 50);
            
        },
        error: function () {
            alert("비정상적인 접근입니다.");
        }
        
    });
}
function fncUpdateBoard(){
    console.log("게시판 글 수정 fnc");
}

function loadCKEditer() {
    const {
        ClassicEditor,
        Autoformat,
        AutoImage,
        Autosave,
        BlockQuote,
        Bold,
        CKBox,
        CKBoxImageEdit,
        CloudServices,
        Emoji,
        Essentials,
        Heading,
        ImageBlock,
        ImageCaption,
        ImageInline,
        ImageInsert,
        ImageInsertViaUrl,
        ImageResize,
        ImageStyle,
        ImageTextAlternative,
        ImageToolbar,
        ImageUpload,
        Indent,
        IndentBlock,
        Italic,
        Link,
        LinkImage,
        List,
        ListProperties,
        MediaEmbed,
        Mention,
        Paragraph,
        PasteFromOffice,
        PictureEditing,
        Table,
        TableCaption,
        TableCellProperties,
        TableColumnResize,
        TableProperties,
        TableToolbar,
        TextTransformation,
        TodoList,
        Underline
    } = window.CKEDITOR;

    const LICENSE_KEY =
        'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDU5NzExOTksImp0aSI6IjFmYTYzZGM0LThkZjUtNGFkYi1hZmE2LTEzODZjN2RhNmEyMCIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImMwNDEyY2M0In0.iYEzFowD3xor88KYsibatLkT-azxjGQNVIT8qXAOcOvKDxgxHTLA3huNoL46y7-EaktGFP2y0FYyl732mLE8Tw';

    const CLOUD_SERVICES_TOKEN_URL =
        'https://1dxhn4uvos7i.cke-cs.com/token/dev/3ce840bebcf15ef918395e01def1854276f31ea034b2046e5cab6376b7c2?limit=10';

    const editorConfig = {
        toolbar: {
            items: [
                'heading',
                '|',
                'bold',
                'italic',
                'underline',
                '|',
                'emoji',
                'link',
                'insertImage',
                'ckbox',
                'mediaEmbed',
                'insertTable',
                'blockQuote',
                '|',
                'bulletedList',
                'numberedList',
                'todoList',
                'outdent',
                'indent'
            ],
            shouldNotGroupWhenFull: false
        },
        plugins: [
            Autoformat,
            AutoImage,
            Autosave,
            BlockQuote,
            Bold,
            CKBox,
            CKBoxImageEdit,
            CloudServices,
            Emoji,
            Essentials,
            Heading,
            ImageBlock,
            ImageCaption,
            ImageInline,
            ImageInsert,
            ImageInsertViaUrl,
            ImageResize,
            ImageStyle,
            ImageTextAlternative,
            ImageToolbar,
            ImageUpload,
            Indent,
            IndentBlock,
            Italic,
            Link,
            LinkImage,
            List,
            ListProperties,
            MediaEmbed,
            Mention,
            Paragraph,
            PasteFromOffice,
            PictureEditing,
            Table,
            TableCaption,
            TableCellProperties,
            TableColumnResize,
            TableProperties,
            TableToolbar,
            TextTransformation,
            TodoList,
            Underline
        ],
        cloudServices: {
            tokenUrl: CLOUD_SERVICES_TOKEN_URL
        },
        heading: {
            options: [
                {
                    model: 'paragraph',
                    title: 'Paragraph',
                    class: 'ck-heading_paragraph'
                },
                {
                    model: 'heading1',
                    view: 'h1',
                    title: 'Heading 1',
                    class: 'ck-heading_heading1'
                },
                {
                    model: 'heading2',
                    view: 'h2',
                    title: 'Heading 2',
                    class: 'ck-heading_heading2'
                },
                {
                    model: 'heading3',
                    view: 'h3',
                    title: 'Heading 3',
                    class: 'ck-heading_heading3'
                },
                {
                    model: 'heading4',
                    view: 'h4',
                    title: 'Heading 4',
                    class: 'ck-heading_heading4'
                },
                {
                    model: 'heading5',
                    view: 'h5',
                    title: 'Heading 5',
                    class: 'ck-heading_heading5'
                },
                {
                    model: 'heading6',
                    view: 'h6',
                    title: 'Heading 6',
                    class: 'ck-heading_heading6'
                }
            ]
        },
        image: {
            toolbar: [
                'toggleImageCaption',
                'imageTextAlternative',
                '|',
                'imageStyle:inline',
                'imageStyle:wrapText',
                'imageStyle:breakText',
                '|',
                'resizeImage',
                '|',
                'ckboxImageEdit'
            ]
        },
        initialData:
            '내용을 입력해 주세요 !.',
        language: 'ko',
        licenseKey: LICENSE_KEY,
        link: {
            addTargetToExternalLinks: true,
            defaultProtocol: 'https://',
            decorators: {
                toggleDownloadable: {
                    mode: 'manual',
                    label: 'Downloadable',
                    attributes: {
                        download: 'file'
                    }
                }
            }
        },
        list: {
            properties: {
                styles: true,
                startIndex: true,
                reversed: true
            }
        },
        mention: {
            feeds: [
                {
                    marker: '@',
                    feed: [
                        /* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
                    ]
                }
            ]
        },
        placeholder: 'Type or paste your content here!',
        table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
        }
    };

    configUpdateAlert(editorConfig);

    ClassicEditor.create(document.querySelector('#editor'), editorConfig);
    
    function configUpdateAlert(config) {
        if (configUpdateAlert.configUpdateAlertShown) {
            return;
        }

        const isModifiedByUser = (currentValue, forbiddenValue) => {
            if (currentValue === forbiddenValue) {
                return false;
            }

            if (currentValue === undefined) {
                return false;
            }

            return true;
        };

        const valuesToUpdate = [];

        configUpdateAlert.configUpdateAlertShown = true;

        if (!isModifiedByUser(config.cloudServices?.tokenUrl, '<YOUR_CLOUD_SERVICES_TOKEN_URL>')) {
            valuesToUpdate.push('CLOUD_SERVICES_TOKEN_URL');
        }

        if (valuesToUpdate.length) {
            window.alert(
                [
                    'Please update the following values in your editor config',
                    'to receive full access to Premium Features:',
                    '',
                    ...valuesToUpdate.map(value => ` - ${value}`)
                ].join('\n')
            );
        }
    }
}