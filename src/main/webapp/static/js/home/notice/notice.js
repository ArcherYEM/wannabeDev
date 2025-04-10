$(document).ready(function () {
    console.log("✅ notice.js loaded");
    initCheckbox();
    initLimitSelect();
    initSearch();
    initFieldFromUrl();
    initEditor();
    initInsertPage();
    initSetTodayCheckbox();
    initEndDateSelect();
    initNextPrevPage();
});

//(공지사항 select 및 delete 부분)
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

// 공지사항 삭제
$(document).on('click', '#delete_btn', function () {
    const selectedIds = [];

    $('#rowCheckbox').each(function () {
        const id = $(this).data("id");
        console.log(id)
        if (id) selectedIds.push(id);
        console.log(selectedIds);
    });

    if (selectedIds.length === 0) {
        Swal.fire("알림", "삭제할 공지를 선택해주세요.", "warning");
        return;
    }

    Swal.fire({
        title: '삭제 확인',
        text: '선택한 공지를 삭제하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '삭제',
        cancelButtonText: '취소'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: '/notice/delete',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(selectedIds),
                success: function (res) {
                    Swal.fire('삭제 완료', res, 'success').then(() => {
                        location.reload();
                    });
                },
                error: function (err) {
                    Swal.fire('오류 발생', '삭제 실패: ' + err.statusText, 'error');
                }
            });
        }
    });
});

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


//공지사항 등록(insert 및 update)부분
// 공지사항 화면(insert update)으로 이동
function initInsertPage() {
    $('#insert_page_btn').on('click', function () {
        window.location.href = '/notice/insert_page';
    });

    $('#update_page_btn').on('click', function () {
        const id = $(this).data("id");
        console.log(id);
        window.location.href = `/notice/update/${id}`;
    });

    $('#view_page_btn').on('click', function () {
        const noticeId = $(this).data("id")
        window.location.href = `/notice/view/${noticeId}`;
    });


    $('#list_page_btn').on('click', function () {
        window.location.href = `/notice`;
    });


}

// Toast UI Editor 초기화
function initEditor() {
    const editorElement = document.querySelector('#editor');
    if (editorElement) {
        const content = editorElement.dataset.contents || '';
        const editor = new toastui.Editor({
            el: editorElement,
            height: '400px',
            initialEditType: 'wysiwyg',
            previewStyle: 'vertical',
            initialValue: content
        });

        window.noticeEditor = editor;
    }
}


// 공지사항 등록
function insert_notice() {
    const type          = $('#i_type').val();
    const title         = $('#i_title').val().trim();
    let contents        = window.noticeEditor
                        ? window.noticeEditor.getHTML()
                        : '';
    const startDateTemp = $('#i_start_date').val().trim();
    let endDateTemp   = $('#i_end_date').val().trim();

    const endDateValue = $('#end_date_selector').val().trim();
    // 무기한이면 날짜 지정
    if (endDateValue === '무기한') {
        endDateTemp = '9999-12-31T23:59';
    }

    // 유효성 검사
    if (!type) {
        Swal.fire('등록실패', '분류를 선택해주세요.', 'warning');
        return;
    }

    if (!title) {
        Swal.fire('등록실패', '제목을 입력해주세요.', 'warning');
        return;
    }

    if (!contents || contents === '<p><br></p>') { // Toast UI Editor 비어있을 때
        Swal.fire('등록실패', '내용을 입력해주세요.', 'warning');
        return;
    }

    if (!startDateTemp) {
        Swal.fire('등록실패', '시작일을 입력해주세요.', 'warning');
        return;
    }


    if (!endDateTemp) {
        Swal.fire('등록실패', '종료일을 입력해주세요.', 'warning');
        return;
    }

    const noticeData = {
        noticeType      : type,
        noticeTitle     : title,
        noticeContents  : contents,
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
                Swal.fire('공지사항 등록 성공', `[${title}] 공지가 등록되었습니다`, 'success')
                    .then(() => { location.href = '/notice'; });
            } else {
                Swal.fire('등록실패', '공지 등록 권한이 없습니다.', 'error')
                    .then(() => { location.href = '/notice'; });
            }
        },
        error       : function(error){
            Swal.fire('등록실패', `서버 오류 발생: ${error.status} - ${error.statusText}`, 'error');
        }
    });
}

// 공지사항 업데이트
function update_notice() {
    const noticeId = $('#update_btn').data("id");
    const type          = $('#i_type').val();
    const title         = $('#i_title').val().trim();
    let contents        = window.noticeEditor
    ? window.noticeEditor.getHTML()
    : '';
    const startDateTemp = $('#i_start_date').val().trim();
    let endDateTemp   = $('#i_end_date').val().trim();

    const endDateValue = $('#end_date_selector').val().trim();
    // 무기한이면 날짜 지정
    if (endDateValue === '무기한') {
        endDateTemp = '9999-12-31T23:59';
    }

    // 유효성 검사
    if (!type) {
        Swal.fire('등록실패', '분류를 선택해주세요.', 'warning');
        return;
    }

    if (!title) {
        Swal.fire('등록실패', '제목을 입력해주세요.', 'warning');
        return;
    }

    if (!contents || contents === '<p><br></p>') { // Toast UI Editor 비어있을 때
        Swal.fire('등록실패', '내용을 입력해주세요.', 'warning');
        return;
    }

    if (!startDateTemp) {
        Swal.fire('등록실패', '시작일을 입력해주세요.', 'warning');
        return;
    }

    if (!endDateTemp) {
        Swal.fire('등록실패', '종료일을 입력해주세요.', 'warning');
        return;
    }


    const noticeData = {
        noticeId        : noticeId,
        noticeType      : type,
        noticeTitle     : title,
        noticeContents  : contents,
        startDateTime   : startDateTemp,
        endDateTime     : endDateTemp
    }

    $.ajax({
        url         : `/api/notice/update/${noticeId}`,
        method      : 'post',
        contentType : 'application/json',
        data        : JSON.stringify(noticeData),
        success     : function(result){
            if(result){
                Swal.fire('공지사항 등록 성공', `[${title}] 공지가 변경되었습니다`, 'success')
                    .then(() => { location.href = `/notice/view/${noticeId}`; });
            } else {
                Swal.fire('등록실패', '공지 등록 권한이 없습니다.', 'error')
                    .then(() => { location.href = '/notice'; });
            }
        },
        error       : function(error){
            Swal.fire('등록실패', `서버 오류 발생: ${error.status} - ${error.statusText}`, 'error');
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

    if (!select || !input) return;

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

//공지사항 view 페이지
function initNextPrevPage() {
    $('#next_notice').on('click', function () {
        const id = $(this).data("id");
        if (id) {
            window.location.href = `/notice/view/${id}`;
        }
    });

    $('#prev_notice').on('click', function () {
        const id = $(this).data("id");
        if (id) {
            window.location.href = `/notice/view/${id}`;
        }
    });

}