$(function (){

});

/** 미니홈피 팝업창 설정 **/
function openPop() {
    const popupW = 1280;
    const popupH = 720;
    const left = Math.ceil((window.screen.width - popupW) / 2);
    const top = Math.ceil((window.screen.height - popupH) / 2);

    $.ajax({
        type: "GET",
        url: "userInfo",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            hompiId = response.hompiId;
            window.open(`/mini-hompi/main/${hompiId}`,
                'mini-hompi',
                'width=' + popupW + ',height=' + popupH + ',left=' + left + ',top=' + top);
        },
        error: function (error) {
            Swal.fire(
                '미니홈피',
                '로그인 후 열어주세요',
                'error'
            ).then(() => {
                location.href = "/";
            });
        }
    });
}

// 스피너 on
function showLoadingSpinner() {
    $('.spinner-background').show();
    $('.loading-spinner-spin').show();
}

// 스피너 off
function hideLoadingSpinner() {
    $('.spinner-background').hide();
    $('.loading-spinner-spin').hide();
}