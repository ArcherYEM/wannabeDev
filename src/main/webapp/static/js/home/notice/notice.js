$(document).ready(function () {
    initCheckbox();
    initLimitSelect();
    initSearch();
    initFieldFromUrl();
    initEditor();
    initInsertPage();
    initSetTodayCheckbox();
    initEndDateSelect();
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
    const type          = $('#i_type').val();
    const title         = $('#i_title').val().trim();
    const contents      = window.noticeEditor
                        ? window.noticeEditor.getHTML()
                        : '';
    const startDateTemp = $('#i_start_date').val().trim();
    const endDateTemp   = $('#i_end_date').val().trim();

    const noticeData = {
        noticeType      : type,         // 분류
        noticeTitle     : title,        // 제목
        noticeContents  : contents,     // 내용
        startDateTime   : startDateTemp,
        endDateTime     : endDateTemp
    }

    $.ajax({
        url         : '/api/notice/insert_notice',
        method      : 'post',
        contentType : 'application/json',
        data        : JSON.stringify(noticeData),

        success     : function(result){
            if(result){
                Swal.fire('공지사항 등록 성공', `[${title}] 공지가 등록되었습니다`, 'success').then(() => {
                    location.href = '/notice';
                });
            } else {
                Swal.fire('등록실패', '공지 등록 권한이 없습니다.', 'error').then(() => {
                    location.href = '/notice';
                });
            }
        },
        error       : function(error){
            Swal.fire('등록실패', `서버 오류 발생: ${error.status} - ${error.statusText}`, 'error').then(() => {
                return;
            });
        }
    });
}

// 공지사항 시작 체크박스 체크시 오늘로 설정
function initSetTodayCheckbox() {
    const checkbox = document.getElementById('set_today_start');
    const input = document.getElementById('i_start_date');

    if (checkbox && input) {
        checkbox.addEventListener('change', function () {
            if (this.checked) {
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const day = String(now.getDate()).padStart(2, '0');
                const hour = String(now.getHours()).padStart(2, '0');
                const minute = String(now.getMinutes()).padStart(2, '0');
                const formatted = `${year}-${month}-${day}T${hour}:${minute}`;
                input.value = formatted;
            } else {
                input.value = ''; // 체크 해제 시 초기화할지 말지는 선택사항
            }
        });
    }
}

// 공지사항 종료 셀렉트 박스 체크 기능
function initEndDateSelect() {
    const select = document.getElementById('end_date_selector');
    const input = document.getElementById('i_end_date');

    select.addEventListener('change', function () {
        const value = this.value;
        const now = new Date();

        if (value === '직접입력') {
            input.disabled = false;
            input.value = '';
        } else if (value === '무기한') {
            input.disabled = true;
            input.value = '';
        } else {
            // 날짜 계산
            input.disabled = false;
            now.setDate(now.getDate() + parseInt(value));

            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hour = String(now.getHours()).padStart(2, '0');
            const minute = String(now.getMinutes()).padStart(2, '0');

            input.value = `${year}-${month}-${day}T${hour}:${minute}`;
        }
    });
}

