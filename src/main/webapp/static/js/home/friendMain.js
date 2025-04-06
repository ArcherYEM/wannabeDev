let friendListStart = 0;
let friendListSize = 10;

let friendReceiveStart = 0;
let friendReceiveSize = 10;

$(document).ready(function () {
    let friendOn = $("#friend-on");
    let friendOnNum = $("#friend-on-num");
    let friendRequest = $("#friend-request");
    let friendRequestNum = $("#friend-request-num");
    let modal = $("#friend-modal-layer");

    // 모달 사이드바
    let sideFriendListText = $("#side-list-text")
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

    // 일촌 목록 무한 스크롤
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


        }
    });

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
// 일촌명 변경
$(document).on("click", ".friend-dropbox-name", function () {
    let friendId = $(this).data("hidden-value");
    console.log("일촌명 변경", friendId);
});
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
    let hompiId = $(this).data("hidden-value");
    openMinihompiPop(hompiId);
});
// 일촌 미니홈피 열기
$(document).on("click", ".friend-send-message", function () {
    let friendId = $(this).data("hidden-value");
    console.log("쪽지 보내기", friendId);
});


/*     함수     */
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
    $("#friends-container").addClass("friend-request-container");

    $("#side-friend-received").css("color", "#FF8000");

    let friendReceive = {
        friendNickname: "김김김",
        friendName: "김김이",
        userNickname: "박박박",
        userName: "박박이",
        friendRequestDT: "2015.04.04 15:42",
        friendId: 2,
        friendHompiId: 2,
        minimi: "/static/images/common/minimi/예진.png"
    }
    let friendReceiveItem = createFriendReceive(friendReceive);

    // 일촌 신청 모달 생성
    for (let i=0; i < 10; i++) {
        $("#friends-container").append(friendReceiveItem);
    }
    LoadFriendRequestListPage(friendReceiveStart, friendReceiveSize);
    friendReceiveStart = friendReceiveStart + friendReceiveSize;

}

// 보낸 일촌 신청 모달 생성
function makeFriendSend() {
    $("#friends-container").addClass("friend-request-container");

    $("#side-friend-send").css("color", "#FF8000");

    let friendSend = {
        friendNickname: "김김김",
        friendName: "김김이",
        userNickname: "박박박",
        userName: "박박이",
        friendRequestDT: "2015.04.04 15:42",
        friendId: 2,
        friendHompiId: 2,
        minimi: "/static/images/common/minimi/예진.png"
    }
    let friendSendItem = createFriendSend(friendSend);
    $("#friends-container").append(`
        <div>대기중인 신청만 표시됩니다.</div>
    `);

    // 일촌 요청 모달 생성
    for (let i=0; i < 10; i++) {
        $("#friends-container").append(friendSendItem);
    }

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
    friendReceiveStart = 0;
    friendReceiveSize = 10;
    $("#side-request-text").css("color", "black");
    $("#friends-container").removeClass("friend-request-container").empty();
    friendSendModalClear();
    friendReceiveModalClear();
}
// 받은 일촌 목록 모달 닫기
function friendReceiveModalClear() {
    $("#friends-container").empty();
    $("#side-friend-received").css("color", "black");
}
// 보낸 일촌 목록 모달 닫기
function friendSendModalClear() {
    $("#friends-container").empty();
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
                if (friend.mood === null) { friend.mood = ""; }
                let friendItem = $(createFriendItem(friend));
                if (friend.loginStatus === "LOGOUT") {
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

function LoadFriendRequestListPage(start, size) {
    $.ajax({

    });
}

function createFriendItem(friendData) {
    return `
    <div class="friend-list-item">
        <div class="friend-content-container">
            <div class="friend-minimi-container">
                <img class="friend-minimi" src=${friendData.minimi} alt="minimi">
            </div>
            <div class="friend-content">
                <div class="friend-list-item-head">
                    <div class="friend-edit-dropbox">
                        <div class="friend-edit-container">
                            <img class="friend-setting-icon" src="/static/images/common/icon/icon_setting.svg" alt="일촌수정">
                        </div>
                        <div class="friend-dropbox-menu hidden">
                            <div class="friend-dropbox-item friend-dropbox-name" data-hidden-value=${friendData.friendId}>일촌명 변경</div>
                            <div class="friend-dropbox-line"></div>
                            <div class="friend-dropbox-item friend-dropbox-delete" data-hidden-value=${friendData.friendId}>일촌 삭제</div>
                        </div>
                    </div>
                    <img class="friend-home-icon" src="/static/images/common/icon/icon_home.svg" alt="미니홈피" data-hidden-value=${friendData.hompiId}>
                </div>
                <div class="friend-list-item-body">
                    <span class="friend-title">일촌명</span>
                    <div class="friend-title-container">
                        <span class="friend-name">${friendData.name}</span>
                        <span class="friend-mood">${friendData.mood}</span>
                    </div>
                </div>
                <div class="friend-list-item-foot">
                    <div class="friend-send-message" data-hidden-value=${friendData.friendId}>쪽지 보내기</div>
                    <span class="friend-login-status">${friendData.loginStatus}</span>
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
                    <img class="friend-minimi" src="${friendRequest.minimi}" alt="minimi">
                </div>
                
                <div class="friend-content">
                    <div class="friend-request-item-head">
                        <div class="friend-request-title">
                            <div class="friend-request-hompi">
                                <img class="friend-home-icon" src="/static/images/common/icon/icon_home.svg" alt="미니홈피"
                                    data-hidden-value=${friendRequest.friendHompiId}
                                />
                            </div>
                            <div class="friend-request-name">${friendRequest.friendNickname}</div>
                            <div class="request-head-text">님의 일촌신청</div>
                        </div>
                        <div class="friend-request-datetime" data-hidden-value=${friendRequest.friendRequestDT}></div>
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
                        <p class="friend-request-msg">
                            일촌하자 일촌하자 일촌하자 일촌하자 일촌하자 일촌하자 일촌하자 일촌하자 일촌하자 일촌하자
                        </p>
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
                    <img class="friend-minimi" src="${friendSend.minimi}" alt="minimi">
                </div>
                
                <div class="friend-content">
                    <div class="friend-request-item-head">
                        <div class="friend-request-title">
                            <div class="friend-request-hompi">
                                <img class="friend-home-icon" src="/static/images/common/icon/icon_home.svg" alt="미니홈피"
                                    data-hidden-value=${friendSend.friendHompiId}
                                />
                            </div>
                            <div class="friend-request-name">${friendSend.friendNickname}</div>
                            <div class="request-head-text">님의 일촌신청</div>
                        </div>
                        <div class="friend-request-datetime" data-hidden-value=${friendSend.friendRequestDT}></div>
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
                        <p class="friend-request-msg">
                            일촌하자 일촌하자 일촌하자 일촌하자 일촌하자 일촌하자 일촌하자 일촌하자 일촌하자 일촌하자
                        </p>
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