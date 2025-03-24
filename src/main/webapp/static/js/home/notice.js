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

// select 선택에 따라 limit 변경 및 main 높이 설정
document.addEventListener("DOMContentLoaded", function () {
    const select = document.getElementById("data-limit");
    const mainDiv = document.getElementById("main");

    // 현재 선택된 값 기준 class 설정
    function applyMainClass(limit) {
        mainDiv.classList.remove("default-style", "compact-style", "mini-style");

        if (limit == 10) mainDiv.classList.add("default-style");
        else if (limit == 30) mainDiv.classList.add("compact-style");
        else if (limit == 50) mainDiv.classList.add("mini-style");
    }

    // 페이지 로드시 초기 class 설정
    applyMainClass(select.value);

    // limit 변경 시 class 갱신 + 페이지 이동
    select.addEventListener("change", function () {
        const selectedLimit = this.value;
        applyMainClass(selectedLimit);

        // 페이지 리로드
        const url = new URL(window.location.href);
        url.searchParams.set("limit", selectedLimit);
        url.searchParams.set("offset", 0);
        window.location.href = url.toString();
    });
});


// select 연동하기
document.addEventListener("DOMContentLoaded", function () {
    // 모든 .sync-select 클래스를 가진 select 요소들을 선택
    const selects = document.querySelectorAll(".filterSelect");

    // 양방향 연동 함수
    function syncSelect(fromSelect, toSelect) {
        toSelect.value = fromSelect.value;
    }

    // 각 select에 대해 이벤트 리스너를 추가하여 서로 동기화
    selects.forEach(select => {
        select.addEventListener("change", function () {
            // 변경된 select의 값을 다른 모든 select에 동기화
            selects.forEach(otherSelect => {
                if (otherSelect !== select) {
                    syncSelect(select, otherSelect);
                }
            });
        });
    });
});

// 검색 기능
document.addEventListener("DOMContentLoaded", function () {
    const select = document.getElementById("data-limit");
    const mainDiv = document.getElementById("main");

    function applyMainClass(limit) {
        mainDiv.classList.remove("default-style", "compact-style", "mini-style");
        if (limit == 10) mainDiv.classList.add("default-style");
        else if (limit == 30) mainDiv.classList.add("compact-style");
        else if (limit == 50) mainDiv.classList.add("mini-style");
    }

    // 초기 스타일 적용
    applyMainClass(select.value);

    // limit 변경 시 스타일 및 페이지 이동
    select.addEventListener("change", function () {
        const selectedLimit = this.value;
        applyMainClass(selectedLimit);

        const url = new URL(window.location.href);
        url.searchParams.set("limit", selectedLimit);
        url.searchParams.set("offset", 0);
        window.location.href = url.toString();
    });

    // 공통 검색 실행 함수
    function executeSearch() {
        const type = document.getElementById("filter-type").value;
        const field = document.getElementById("filter-field").value;
        const keyword = document.getElementById("search-keyword").value;
        const limit = document.getElementById("data-limit").value;

        let url = "/notice?";
        if (type) url += `noticeType=${type}&`;
        if (field) url += `field=${field}&`;
        if (keyword) url += `keyword=${encodeURIComponent(keyword)}&`;
        url += `limit=${limit}&offset=0`;

        window.location.href = url;
    }

    // 검색 버튼 클릭
    document.getElementById("search-btn").addEventListener("click", executeSearch);

    // 검색 input에서 Enter 입력
    document.getElementById("search-keyword").addEventListener("keypress", function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            executeSearch();
        }
    });
});


