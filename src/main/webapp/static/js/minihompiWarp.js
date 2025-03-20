$(document).ready(function () {
    getMinihompiDataList(); // JSON 데이터 가져오기
    openMinihompi(); // HTML 데이터 가져오기
});

const hompiId = 1; // 홈피 ID
const hompMain_url = '/mini-hompi/hompiMain'; // 메인 URL
const hompSub_url = `/mini-hompi/api/${hompiId}`; // 서브 URL

console.log("Sub URL:", hompSub_url);

// HTML 데이터를 가져오는 함수
function openMinihompi() {
    $.ajax({
        type: "GET",
        url: hompMain_url,
        dataType: "html",
        success: function (data) {
            console.log("HTML 데이터 로딩 성공");
            alert("mihompiWrap openMinihompi호출");

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
function getMinihompiDataList() {
    $.ajax({
        type: "GET",
        url: hompSub_url,
        dataType: "json",
        success: function (response) {
            console.log("JSON 데이터 로딩 성공:", response);

            // JSON 데이터를 화면에 렌더링
            renderMiniHompi(response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("JSON 로딩 실패:", errorThrown);
        }
    });
}

// JSON 데이터를 화면에 렌더링하는 함수
function renderMiniHompi(data) {
    const miniHompi = data.miniHompi;
    console.log("myHompi" + data.myHompi);
    const myHompi = data.myHompi;

    // 화면에 데이터 삽입
    $("#mainTitle").text(miniHompi.hompiTitle);
    $("#total").text(miniHompi.totalCnt);
    $("#today").text(miniHompi.todayCnt);
    $("#hompiUrl").text(miniHompi.hompiUrl);

    if (myHompi == 1 || myHompi == 2) {
        $("#moveSetting").hide();
        $(".editImg").hide();
        $("#editBtn").hide();
        $("#titleBtn").hide();
    }

}