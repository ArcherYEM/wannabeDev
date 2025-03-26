// DOM이 로드된 후 실행
document.addEventListener("DOMContentLoaded", function () {
    const selectAll = document.getElementById("selectAll");

    // 전체 선택 체크박스 클릭 시
    selectAll.addEventListener("change", function () {
        const isChecked = this.checked;
        const rowCheckboxes = document.querySelectorAll(".rowCheckbox");

        rowCheckboxes.forEach(function (checkbox) {
            checkbox.checked = isChecked;

            const row = checkbox.closest("tr");
            if (isChecked) {
                row.classList.add("selected-row");
            } else {
                row.classList.remove("selected-row");
            }
        });
    });

    // 개별 체크박스 클릭 시 해당 행 강조 처리
    document.querySelectorAll(".rowCheckbox").forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {
            const row = this.closest("tr");
            if (this.checked) {
                row.classList.add("selected-row");
            } else {
                row.classList.remove("selected-row");
            }
        });
    });
});

// select 선택에 따라 limit 변경
document.addEventListener("DOMContentLoaded", function () {
    const select = document.getElementById("data-limit");

    // 페이지 로드시 limit 값으로 페이지 리로드
    select.addEventListener("change", function () {
        const selectedLimit = this.value;

        // 페이지 리로드
        const url = new URL(window.location.href);
        url.searchParams.set("limit", selectedLimit);
        url.searchParams.set("offset", 0);  // 페이지 번호를 1로 초기화
        window.location.href = url.toString();
    });
});

//검색 기능
document.addEventListener("DOMContentLoaded", function () {
    const filterType = document.getElementById("filter-type");  // filter-type select
    const changeFilter = document.getElementById("change-filter");  // change-filter select
    const searchKeyword = document.getElementById("search-keyword");  // 검색어 input
    const selectLimit = document.getElementById("data-limit");  // limit select

    // URL에서 `type` 값을 가져와서 filter-type과 change-filter의 값을 동기화
    const urlParams = new URLSearchParams(window.location.search);
    const typeFromUrl = urlParams.get("Type");

    if (typeFromUrl) {
        filterType.value = typeFromUrl;
        changeFilter.value = typeFromUrl;  // change-filter의 값도 `type`에 맞게 설정
    }

    // filter-type 값 변경 시 change-filter 값 동기화
    filterType.addEventListener("change", function () {
        changeFilter.value = this.value;  // filter-type의 값을 change-filter로 설정
        executeSearch();  // 자동으로 검색 실행
    });

    // change-filter 값 변경 시 filter-type 값 동기화 및 자동 검색
    changeFilter.addEventListener("change", function () {
        filterType.value = this.value;  // change-filter의 값을 filter-type으로 설정
        executeSearch();  // 자동으로 검색 실행
    });

    // 공통 검색 실행 함수
    function executeSearch() {
        const type = document.getElementById("filter-type").value;  // filter-type의 value 값
        const field = document.getElementById("filter-field").value;  // filter-field의 value 값
        const keyword = document.getElementById("search-keyword").value;  // 검색어
        const limit = document.getElementById("data-limit").value;  // limit 값

        let url = "/notice?";
        url += `limit=${limit}&offset=0&`;  // offset은 기본적으로 0으로 설정 (첫 페이지)
        if (field) url += `field=${field}&`;  // field가 있으면 추가
        if (type) url += `Type=${type}&`;  // type이 있으면 추가
        if (keyword) url += `keyword=${encodeURIComponent(keyword)}`;  // keyword가 있으면 추가

        window.location.href = url;
    }

    // 검색 버튼 클릭 시 executeSearch 함수 실행
    document.getElementById("search-btn").addEventListener("click", executeSearch);

    // 검색 input에서 Enter 입력 시 executeSearch 함수 실행
    document.getElementById("search-keyword").addEventListener("keypress", function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();  // Enter 키 기본 동작 방지
            executeSearch();  // 검색 실행
        }
    });

});

document.addEventListener("DOMContentLoaded", function () {
    const fieldSelect = document.getElementById("filter-field");
    const urlParams = new URLSearchParams(window.location.search);
    const fieldFromUrl = urlParams.get("field");

    if (fieldFromUrl) {
        fieldSelect.value = fieldFromUrl;  // URL에서 가져온 값을 filter-field에 설정
    } else {
        fieldSelect.value = 'all';  // URL에 값이 없으면 기본값을 'all'로 설정
    }
});