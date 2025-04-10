/** 쪽지 팝업창 설정 **/
function openMessage(userId, friendId) {

    let popupW = 700;
    let popupH = 700;
    let left = Math.ceil((window.screen.width - popupW) / 2);
    let top = Math.ceil((window.screen.height - popupH) / 2);
    if (userId === 'null') {
        alert("로그인 후 이용해주세요.");
        return;
    } else if (userId === friendId) {
        alert("자신에게는 쪽지를 보낼 수 없습니다.");
        return;
    }
    window.open(`/mini-hompi/newMessage?userId=${userId}&recipient=${friendId}`,
        '쪽지 보내기',
        'width=' + popupW + ',height=' + popupH + ',left=' + left + ',top=' + top);
}