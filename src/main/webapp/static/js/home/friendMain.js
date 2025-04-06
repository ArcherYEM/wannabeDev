let friendListStart = 0;
let friendListSize = 10;

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
            LoadFriendPage(friendListStart, friendListSize);
            friendListStart = friendListStart + friendListSize;
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
    friendSendModalClear();
    $("#side-request-text").css("color", "#FF8000");

    makeFriendReceive();

});
// 보낸 일촌신청
$(document).on("click", "#side-friend-send", function () {
    friendListModalClear();
    friendReceiveModalClear();

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
    console.log("일촌 삭제", friendId);
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
    LoadFriendPage(friendListStart, friendListSize);
    friendListStart = friendListStart + friendListSize;
}


// 받은 일촌 신청 모달 생성
function makeFriendReceive() {
    $("#side-friend-received").css("color", "#FF8000");
}

// 보낸 일촌 신청 모달 생성
function makeFriendSend() {
    $("#side-friend-send").css("color", "#FF8000");
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
    $("#friends-container").empty();
    friendListStart = 0;
    friendListSize = 10;
    $("#now-friend-status").empty();
    $("#friend-modal-layer").removeClass("selected-friend-list");
    $("#side-list-text").css("color", "black");
}
// 일촌 요청 모달 닫기
function friendRequestModalClear() {
    $("#side-request-text").css("color", "black");
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

function LoadFriendPage(start, size) {
    $.ajax({
        type:"GET",
        url:`/api/friend/info/${start}/${size}`,
        contentType: "application/json",
        success: function(response){
            if (!response) { return; }
            response.forEach(friend => {
                if (friend.mood === null) {friend.mood = "";}
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


function createFriendItem(friendData) {
    return `
    <div class="friend-item">
        <div class="friend-content-container">
            <div class="friend-minimi-container">
                <img class="friend-minimi" src=${friendData.minimi} alt="minimi">
            </div>
            <div class="friend-content">
                <div class="friend-item-head">
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
                <div class="friend-item-body">
                    <span class="friend-title">일촌명</span>
                    <div class="friend-title-container">
                        <span class="friend-name">${friendData.name}</span>
                        <span class="friend-mood">${friendData.mood}</span>
                    </div>
                </div>
                <div class="friend-item-foot">
                    <div class="friend-send-message" data-hidden-value=${friendData.friendId}>쪽지 보내기</div>
                    <span class="friend-login-status">${friendData.loginStatus}</span>
                </div>
            </div>
        </div>
    </div>
    `
}


// 미니홈피 팝업 오픈 함수
function openMinihompiPop(hompiId) {
    const specs = `width=${HOMPI_WIDTH},height=${HOMPI_HEIGHT},left=${HOMPI_LEFT},top=${HOMPI_TOP}`;
    window.open(`/mini-hompi/main/${hompiId}`, 'mini-hompi', specs);
}