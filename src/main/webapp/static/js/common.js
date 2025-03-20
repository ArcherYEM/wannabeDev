$(function (){

});

/** 미니홈피 팝업창 설정 **/
function openPop() {
    const popupW = 1280;
    const popupH = 720;
    const left = Math.ceil((window.screen.width - popupW) / 2);
    const top = Math.ceil((window.screen.height - popupH) / 2);

    const hompiId = 0;

    window.open(`/mini-hompi/main/${hompiId}`,
        'mini-hompi',
        'width=' + popupW + ',height=' + popupH + ',left=' + left + ',top=' + top);
}