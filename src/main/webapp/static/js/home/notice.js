$(document).ready(function () {
    initCheckbox();
    initLimitSelect();
    initSearch();
    initFieldFromUrl();
    initEditor();
    initInsertPage();
});

// 전체 선택/해제 및 개별 선택 처리
function initCheckbox() {
    $('#selectAll').on('change', function () {
        const isChecked = $(this).is(':checked');
        $('.rowCheckbox').prop('checked', isChecked);
        $('.rowCheckbox').closest('tr').toggleClass('selected-row', isChecked);
    });

    $('.rowCheckbox').on('change', function () {
        $(this).closest('tr').toggleClass('selected-row', $(this).is(':checked'));
    });
}

// 데이터 수 제한 변경 시 페이지 리로드
function initLimitSelect() {
    $('#data-limit').on('change', function () {
        const selectedLimit = $(this).val();
        const url = new URL(window.location.href);
        url.searchParams.set('limit', selectedLimit);
        url.searchParams.set('offset', 0);
        window.location.href = url.toString();
    });
}

// 검색 필터 관련 동기화 및 자동 검색
function initSearch() {
    const urlParams = new URLSearchParams(window.location.search);
    const typeFromUrl = urlParams.get("Type");
    if (typeFromUrl) {
        $('#filter-type').val(typeFromUrl);
        $('#change-filter').val(typeFromUrl);
    }

    $('#filter-type').on('change', function () {
        $('#change-filter').val($(this).val());
        executeSearch();
    });

    $('#change-filter').on('change', function () {
        $('#filter-type').val($(this).val());
        executeSearch();
    });

    $('#search-btn').on('click', executeSearch);

    $('#search-keyword').on('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            executeSearch();
        }
    });

    function executeSearch() {
        const type = $('#filter-type').val();
        const field = $('#filter-field').val();
        const keyword = $('#search-keyword').val();
        const limit = $('#data-limit').val();

        let url = "/notice?";
        url += `limit=${limit}&offset=0&`;
        if (field) url += `field=${field}&`;
        if (type) url += `Type=${type}&`;
        if (keyword) url += `keyword=${encodeURIComponent(keyword)}`;

        window.location.href = url;
    }
}

// URL에서 field 동기화
function initFieldFromUrl() {
    const fieldFromUrl = new URLSearchParams(window.location.search).get("field");
    $('#filter-field').val(fieldFromUrl || 'all');
}

// 공지등록화면으로 이동
function initInsertPage() {
    $('#insert_page_btn').on('click', function () {
        window.location.href = '/notice/insert_page';
    });
}

// Toast UI Editor 초기화
function initEditor() {
    const editorElement = document.querySelector('#editor');
    if (editorElement) {
        const editor = new toastui.Editor({
            el: editorElement,
            height: '400px',
            initialEditType: 'wysiwyg',
            previewStyle: 'vertical'
        });

        window.noticeEditor = editor;
    }
}

// 공지사항 등록
function insert_notice() {
    const category = $('#i_category').val();
    const title = $('#i_title').val().trim();
    const startDate = $('#i_start_date').val().trim();
    const endDate = $('#i_end_date').val().trim();
    const content = window.noticeEditor ? window.noticeEditor.getHTML() : '';

    console.log("분류:", category);
    console.log("제목:", title);
    console.log("시작일시:", startDate);
    console.log("종료일시:", endDate);
    console.log("내용:", content);
}
