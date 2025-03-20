$(document).ready(function () {
    getminihompiDataList(); // JSON 데이터 가져오기
    openminihompi(); // HTML 데이터 가져오기
});

const hompiId = 0; // 홈피 ID
const hompMain_url = '/mini-hompi/hompiMain'; // 메인 URL
const hompSub_url = `/mini-hompi/api/${hompiId}`; // 서브 URL

console.log("Sub URL:", hompSub_url);

// HTML 데이터를 가져오는 함수
function openminihompi() {
    $.ajax({
        type: "GET",
        url: hompMain_url,
        dataType: "html",
        success: function (data) {
            console.log("HTML 데이터 로딩 성공");
            // 기존 콘텐츠 제거 후 새로운 HTML 삽입
            $("#mainWrapBackground").children().remove();
            $("#mainWrapBackground").html(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("화면 로딩 실패:", errorThrown);
        }
    });
}

// JSON 데이터를 가져오는 함수
function getminihompiDataList() {
    $.ajax({
        type: "GET",
        url: hompSub_url,
        dataType: "json",
        success: function (response) {
            console.log("JSON 데이터 로딩 성공:", response);

            // JSON 데이터를 화면에 렌더링
            renderminihompi(response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("JSON 로딩 실패:", errorThrown);
        }
    });
}

// JSON 데이터를 화면에 렌더링하는 함수
function renderminihompi(data) {
    const minihompi = data.minihompi;
    console.log("myHompi" + data.myHompi);
    const myHompi = data.myHompi;

    // 화면에 데이터 삽입
    $("#mainTitle").text(minihompi.hompiTitle);
    $("#total").text(minihompi.totalCnt);
    $("#today").text(minihompi.todayCnt);
    $("#hompiUrl").text(minihompi.hompiUrl);

    if (myHompi == 1 || myHompi == 2) {
        $("#moveSetting").hide();
        $(".editImg").hide();
        $("#editBtn").hide();
        $("#titleBtn").hide();
    }

}