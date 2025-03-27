$(document).ready(function () {
    getminihompiDataList(); // JSON 데이터 가져오기
    openminihompi(); // HTML 데이터 가져오기
});
const hompMain_url = '/mini-hompi/hompiMain';

// HTML 데이터를 가져오는 함수
function openminihompi() {
    $.ajax({
        type: "GET",
        url: hompMain_url,
        dataType: "html",
        success: function (data) {
            // 기존 콘텐츠 제거 후 새로운 HTML 삽입
            $("#mainWrapBackground").children().remove();
            $("#mainWrapBackground").html(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

// json 데이터를 가져오는 함수
function getminihompiDataList() {
    const url = window.location.pathname;
    const hompiId = url.split('/').pop();
    const hompiDataUrl = `/api/minihompi/${hompiId}`;
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
    const myHompi = data.myHompi;

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


    //권한에 따라 관리 버튼 숨김
    if (myHompi != 0) {
        $("#moveSetting").hide();
        $(".editImg").hide();
        $("#editBtn").hide();
        $("#titleBtn").hide();
        $("select#mood").prop("disabled", true);
    }
}

