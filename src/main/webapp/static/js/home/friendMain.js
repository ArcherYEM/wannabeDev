let friendListStart = 0;
let friendListSize = 10;

let friendRequestStart = 0;
let friendRequestSize = 10;

$(document).ready(function () {
    // 일촌 모달
    readyFriendModal();
});

// 모달 닫기
$(document).on("click", "#friend-modal-layer, #friend-modal-close", function(e) {
    if (e.target === this) {
        modalClose();
    }
});

/*
 * 일촌 모달 열기
 */
// 일촌 목록 모달
$(document).on("click", "#friend-on, #side-list-text", function () {
    // 공통
    $("body").css("overflow", "hidden");
    let modal = $("#friend-modal-layer");
    let sideFriendListText = $("#side-list-text");

    modal.removeClass("hidden");

    if (modal.hasClass("selected-friend-list")) { return ; }

    friendListModalClear();
    friendRequestModalClear();

    modal.addClass("selected-friend-list");

    sideFriendListText.css("color", "#FF8000");

    // 일촌 목록 모달 페이지 생성
    makeFriendList();
});

// 일촌 신청 모달 ( 기본적으로 받은 일촌신청으로 연결 )
$(document).on("click", "#friend-request, #side-request-text", function () {
    // 공통
    $("body").css("overflow", "hidden");
    let modal = $("#friend-modal-layer");
    let sideRequestText = $("#side-request-text");
    modal.removeClass("hidden");
    friendListModalClear();
    friendRequestModalClear();

    friendListModalClear();
    friendRequestModalClear();

    sideRequestText.css("color", "#FF8000");

    // 받은 일촌신청
    makeFriendReceive();
});
// 받은 일촌신청
$(document).on("click", "#side-friend-received", function () {
    friendListModalClear();
    friendRequestModalClear();
    $("#side-request-text").css("color", "#FF8000");

    makeFriendReceive();

});
// 보낸 일촌신청
$(document).on("click", "#side-friend-send", function () {
    friendListModalClear();
    friendRequestModalClear();

    $("#side-request-text").css("color", "#FF8000");


    makeFriendSend();

});


/*
 * 일촌 모달 기능
 */
// 일촌 수정 드롭박스 토글
$(document).on("click", ".friend-setting-icon", function () {
    $(this).closest(".friend-edit-dropbox").find(".friend-dropbox-menu").toggleClass("hidden");
})
// 일촌 삭제
$(document).on("click", ".friend-dropbox-delete", function () {
    let friendId = $(this).data("hidden-value");
    $.ajax({
        type:"DELETE",
        url:`/api/friend/my/${friendId}`,
        contentType: "application/json",
        success: function(response){
            friendListModalClear();
            makeFriendList();
        },
        error: function(error) {
            console.log(error)
        }
    });
});
// 일촌 미니홈피 열기
$(document).on("click", ".friend-home-icon", function () {
    let friendHompiId = $(this).data("hidden-value");
    openMinihompiPop(friendHompiId);
});
// 일촌에게 쪽지 보내기
$(document).on("click", ".friend-send-message", function () {
    $.ajax({
        type:"GET",
        url:`/userInfo`,
        success: function(response){
            let userId = response.userId;
            let friendId = $(".friend-send-message").data("hidden-value");
            openMessage(userId, friendId);
        },
        error: function(error) {
            console.log("t", error)
        }
    });
});

// 일촌 요청 허용
$(document).on("click", ".friend-receive-accept", function () {
    let friendId = $(this).data("hidden-value");
    $.ajax({
        type:"POST",
        url:`/api/friend/accept/${friendId}`,
        success: function(response){
            friendReceiveModalClear();
            makeFriendReceive();
        },
        error: function(error) {
            console.log(error)
        }
    });
});
// 일촌 요청 거절
$(document).on("click", ".friend-receive-deny", function () {
    let friendId = $(this).data("hidden-value");
    $.ajax({
        type:"POST",
        url:`/api/friend/reject/${friendId}`,
        success: function(response){
            friendReceiveModalClear();
            makeFriendReceive();
        },
        error: function(error) {
            console.log(error)
        }
    });
});

// 일촌 신청 취소
$(document).on("click", ".friend-send-reject", function () {
    let friendId = $(this).data("hidden-value");
    $.ajax({
        type:"DELETE",
        url:`/api/friend/send/${friendId}`,
        contentType: "application/json",
        success: function(response){
            friendSendModalClear();
            makeFriendSend();
        },
        error: function(error) {
            console.log(error)
        }
    });
});





/*     함수     */
function readyFriendModal() {
    let friendOnNum = $("#friend-on-num");
    let friendRequest = $("#friend-request");
    let friendRequestNum = $("#friend-request-num");
    let modal = $("#friend-modal-layer");

    // 모달 사이드바
    let sideRequestText = $("#side-request-text")

    let sideLoggedFriends = $("#side-logged-friends");
    let sideFriendRequest = $("#side-friend-request");

    // 유저 패널
    friendOnNumFunc(function (nowLoginFriends) {
        friendOnNum.text(nowLoginFriends);
    });
    friendRequestNumFunc(function (requestNum) {
        friendRequestNum.text(requestNum);
    });

    // 모달 열기
    friendRequest.on("click", function () {
        modal.removeClass("hidden");
        sideRequestText.css("color", "#FF8000");
    });

    // 모달 공용 데이터
    friendOnNumFunc(function (nowLoginFriends) {
        sideLoggedFriends.text(`${nowLoginFriends}`);
    });
    friendRequestNumFunc(function (requestNum) {
        sideFriendRequest.text(requestNum);
    });
    friendListInfinity();
}

// 일촌 목록 무한 스크롤
function friendListInfinity() {
    let friendsNum;
    friendAllNumFunc(function (allFriends) {
        friendsNum = allFriends;
    });
    $("#friends-container").on("scroll", function () {
        if ($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight && friendListStart < friendsNum) {
            if ($(this).is(".friend-list-container")) {
                LoadFriendListPage(friendListStart, friendListSize);
                friendListStart = friendListStart + friendListSize;
            }
            if ($(this).is(".friend-request-receive")) {
                LoadFriendReceiveListPage(friendRequestStart, friendRequestSize);
                friendRequestStart = friendRequestStart + friendRequestSize;
            }
            if ($(this).is(".friend-request-send")) {
                LoadFriendSendListPage(friendRequestStart, friendRequestSize);
                friendRequestStart = friendRequestStart + friendRequestSize;
            }
        }
    });
}


// 일촌 목록 모달 생성
function makeFriendList() {
    friendOnNumFunc(function (nowLoginFriends) {
        friendAllNumFunc(function (allFriends) {
            $("#now-friend-status").append(`
                <div id="now-friend-display">${nowLoginFriends} 명 접속 중</div>
                <span>/</span>
                <div id="all-friend-display">전체 ${allFriends} 명</div>
            `);
        });
    });

    // 일촌 목록 생성
    $("#friends-container").addClass("friend-list-container");
    LoadFriendListPage(friendListStart, friendListSize);
    friendListStart = friendListStart + friendListSize;
}


// 받은 일촌 신청 모달 생성
function makeFriendReceive() {
    $("#friends-container").addClass("friend-request-container").addClass("friend-request-receive");

    $("#side-friend-received").css("color", "#FF8000");

    LoadFriendReceiveListPage(friendRequestStart, friendRequestSize);
    friendRequestStart = friendRequestStart + friendRequestSize;
}

// 보낸 일촌 신청 모달 생성
function makeFriendSend() {
    $("#friends-container").addClass("friend-request-container").addClass("friend-request-send");

    $("#side-friend-send").css("color", "#FF8000");

    LoadFriendSendListPage(friendRequestStart, friendRequestSize);
    friendRequestStart = friendRequestStart + friendRequestSize;
}


// 모달 종료
function modalClose() {
    $("#friend-modal-layer").addClass("hidden");
    $("#side-list-text").css("color", "black");
    $("#side-request-text").css("color", "black");
    $("body").css("overflow", "");
    friendListModalClear();
    friendRequestModalClear();
}
// 일촌 목록 모달 닫기
function friendListModalClear() {
    friendListStart = 0;
    friendListSize = 10;
    $("#now-friend-status").empty();
    $("#friend-modal-layer").removeClass("selected-friend-list");
    $("#friends-container").removeClass("friend-list-container").empty();
    $("#side-list-text").css("color", "black");
}
// 일촌 요청 모달 닫기
function friendRequestModalClear() {
    $("#side-request-text").css("color", "black");
    $("#friends-container").removeClass("friend-request-container").empty();
    friendSendModalClear();
    friendReceiveModalClear();
}
// 받은 일촌 목록 모달 닫기
function friendReceiveModalClear() {
    friendRequestStart = 0;
    friendRequestSize = 10;
    $("#friends-container").removeClass("friend-request-receive").empty();
    $("#side-friend-received").css("color", "black");
}
// 보낸 일촌 목록 모달 닫기
function friendSendModalClear() {
    friendRequestStart = 0;
    friendRequestSize = 10;
    $("#friends-container").removeClass("friend-request-send").empty();
    $("#side-friend-send").css("color", "black");
}




// 현재 로그인한 일촌 수
function friendOnNumFunc(onNum) {
    $.ajax({
        type:"GET",
        url:"/api/friend/logged/num",
        contentType: "application/json",
        success: function(response){
            onNum(response);
        },
        error: function(error) {
            console.log(error)
        }
    });
}
// 내 일촌 수
function friendAllNumFunc(allFriends) {
    $.ajax({
        type:"GET",
        url:"/api/friend/friends/num",
        contentType: "application/json",
        success: function(response){
            allFriends(response);
        },
        error: function(error) {
            console.log(error)
        }
    });
}

function friendRequestNumFunc(requestNum) {
    $.ajax({
        type:"GET",
        url:"/api/friend/request/num",
        contentType: "application/json",
        success: function(response){
            requestNum(response);
        },
        error: function(error) {
            console.log(error)
        }
    });
}

function LoadFriendListPage(start, size) {
    $.ajax({
        type:"GET",
        url:`/api/friend/info/${start}/${size}`,
        contentType: "application/json",
        success: function(response){
            if (!response) { return; }
            response.forEach(friend => {
                if (!friend.friendMood) { friend.friendMood = ""; }
                let friendItem = $(createFriendItem(friend));
                if (friend.friendLoginStatus === "LOGOUT") {
                    friendItem.css("filter", "grayscale(100%)");
                }
                $("#friends-container").append(friendItem)
            });
        },
        error: function(error) {
            console.log(error)
        }
    });
}


function LoadFriendReceiveListPage(start, size) {

    $.ajax({
        type:"GET",
        url:`/api/friend/receive/${start}/${size}`,
        contentType: "application/json",
        success: function(response){
            if (!response) { return; }
            response.forEach(friend => {
                if (!friend.friendRequestMessage) { friend.friendRequestMessage = ""; }
                let friendReceiveItem = createFriendReceive(friend);
                $("#friends-container").append(friendReceiveItem);
            });
        },
        error: function(error) {
            console.log(error)
        }
    });

}

function LoadFriendSendListPage(start, size) {
    $.ajax({
        type:"GET",
        url:`/api/friend/send/${start}/${size}`,
        contentType: "application/json",
        success: function(response){
            if (!response) { return; }
            response.forEach(friend => {
                if (!friend.friendRequestMessage) { friend.friendRequestMessage = ""; }
                let friendSendItem = createFriendSend(friend);
                $("#friends-container").append(friendSendItem);
            });
        },
        error: function(error) {
            console.log(error)
        }
    });
}

function createFriendItem(friendData) {
    return `
    <div class="friend-list-item">
        <div class="friend-content-container">
            <div class="friend-minimi-container">
                <img class="friend-minimi" src=${friendData.friendMinimi} alt="minimi">
            </div>
            <div class="friend-content">
                <div class="friend-list-item-head">
                    <div class="friend-edit-dropbox">
                        <div class="friend-edit-container">
                            <img class="friend-setting-icon" src="/static/images/common/icon/icon_setting.svg" alt="일촌수정">
                        </div>
                        <div class="friend-dropbox-menu hidden">
                            <div class="friend-dropbox-item friend-dropbox-delete" data-hidden-value=${friendData.friendId}>일촌 삭제</div>
                        </div>
                    </div>
                    <img class="friend-home-icon" src="/static/images/common/icon/icon_home.svg" alt="미니홈피" data-hidden-value=${friendData.friendHompiId}>
                </div>
                <div class="friend-list-item-body">
                    <span class="friend-title">일촌명</span>
                    <div class="friend-title-container">
                        <span class="friend-name">${friendData.friendName}</span>
                        <span class="friend-mood">${friendData.friendMood}</span>
                    </div>
                </div>
                <div class="friend-list-item-foot">
                    <div class="friend-send-message" data-hidden-value=${friendData.friendId}>쪽지 보내기</div>
                    <span class="friend-login-status">${friendData.friendLoginStatus}</span>
                </div>
            </div>
        </div>
    </div>
    `
}


function createFriendReceive(friendRequest) {
    return `
        <div class="friend-request-item">
            <div class="friend-content-container">
                <div class="friend-minimi-container">
                    <img class="friend-minimi" src="${friendRequest.friendMinimi}" alt="minimi">
                </div>
                
                <div class="friend-content">
                    <div class="friend-request-item-head">
                        <div class="friend-request-title">
                            <div class="friend-request-hompi">
                                <img class="friend-home-icon" src="/static/images/common/icon/icon_home.svg" alt="미니홈피"
                                    data-hidden-value=${friendRequest.friendHompiId}
                                />
                            </div>
                            <div class="friend-request-text">
                                <div class="friend-request-name">${friendRequest.friendNickname}</div>
                                <div class="request-head-text">님의 일촌신청</div>
                            </div>
                        </div>
                        <div class="friend-request-datetime">${friendRequest.friendRequestDT}</div>
                    </div>
                    <div class="friend-request-item-body">
                        <div class="friend-request-user">
                            <span class="friend-request-name">${friendRequest.friendNickname}</span>
                            <span class="friend-request-username">(${friendRequest.friendName})</span>
                            <span>-</span>
                            <span class="friend-receive-name">${friendRequest.userNickname}</span>
                            <span class="friend-receive-username">(${friendRequest.userName})</span>
                        </div>
                    </div>
                    <div class="friend-request-item-foot">
                        <p class="friend-request-msg">${friendRequest.friendRequestMessage}</p>
                        <div class="friend-request-btn">
                            <div class="friend-receive-accept" data-hidden-value=${friendRequest.friendId}>일촌맺기</div>
                            <div class="friend-receive-deny" data-hidden-value=${friendRequest.friendId}>거절하기</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
}

function createFriendSend(friendSend) {
    return `
        <div class="friend-request-item">
            <div class="friend-content-container">
                <div class="friend-minimi-container">
                    <img class="friend-minimi" src="${friendSend.friendMinimi}" alt="minimi">
                </div>
                <div class="friend-content">
                    <div class="friend-request-item-head">
                        <div class="friend-request-title">
                            <div class="friend-request-hompi">
                                <img class="friend-home-icon" src="/static/images/common/icon/icon_home.svg" alt="미니홈피"
                                    data-hidden-value=${friendSend.friendHompiId}
                                />
                            </div>
                            <div class="friend-request-text">
                                <div class="friend-request-name">${friendSend.friendNickname}</div>
                                <div class="request-head-text">님에게 일촌신청</div>
                            </div>
                        </div>
                        <div class="friend-request-datetime"/>${friendSend.friendRequestDT}</div>
                    </div>
                    <div class="friend-request-item-body">
                        <div class="friend-request-user">
                            <span class="friend-request-name">${friendSend.friendNickname}</span>
                            <span class="friend-request-username">(${friendSend.friendName})</span>
                            <span>-</span>
                            <span class="friend-receive-name">${friendSend.userNickname}</span>
                            <span class="friend-receive-username">(${friendSend.userName})</span>
                        </div>
                    </div>
                    <div class="friend-request-item-foot">
                        <p class="friend-request-msg">${friendSend.friendRequestMessage}</p>
                        <div class="friend-request-btn">
                            <div class="friend-send-reject" data-hidden-value=${friendSend.friendId}>취소</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
}


// 미니홈피 팝업 오픈 함수
function openMinihompiPop(hompiId) {
    const specs = `width=${HOMPI_WIDTH},height=${HOMPI_HEIGHT},left=${HOMPI_LEFT},top=${HOMPI_TOP}`;
    window.open(`/mini-hompi/main/${hompiId}`, 'mini-hompi', specs);
}