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

    let nowFriendDisplay = $("#now-friend-display");
    let allFriendDisplay = $("#all-friend-display");

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

    // 모달 내부
    friendOnNumFunc(function (nowLoginFriends) {
        nowFriendDisplay.text(`${nowLoginFriends} 명 접속 중`);
        sideLoggedFriends.text(`${nowLoginFriends}`);
    });
    allFriendCnt(function (allFriends) {
        allFriendDisplay.text(`전체 ${allFriends} 명`);
    });
    friendRequestNumFunc(function (requestNum) {
        sideFriendRequest.text(requestNum);
    });

    LoadFriends();
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
$(document).on("click", "#friend-on", function () {
    let modal = $("#friend-modal-layer");

    let sideFriendListText = $("#side-list-text");


    modal.removeClass("hidden");
    sideFriendListText.css("color", "#FF8000");

});

// 일촌 신청 모달 ( 기본적으로 받은 일촌신청으로 연결 )
$(document).on("click", "#friend-request", function () {
    let modal = $("#friend-modal-layer");

    let sideRequestText = $("#side-request-text");

    modal.removeClass("hidden");
    sideRequestText.css("color", "#FF8000");
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
})
// 일촌 삭제
$(document).on("click", ".friend-dropbox-delete", function () {
    let friendId = $(this).data("hidden-value");
    console.log("일촌 삭제", friendId);
})


// 일촌 미니홈피 열기
$(document).on("click", ".friend-home-icon", function () {
    let hompiId = $(this).data("hidden-value");
    console.log("일촌 미니홈피 열기", hompiId);
    openMinihompiPop(hompiId);
})
// 일촌 미니홈피 열기
$(document).on("click", ".friend-send-message", function () {
    let friendId = $(this).data("hidden-value");
    console.log("쪽지 보내기", friendId);
})




function modalClose() {
    $("#friend-modal-layer").addClass("hidden");
    $("#side-list-text").css("color", "black");
    $("#side-request-text").css("color", "black");
}

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

function allFriendCnt(allFriends) {
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

function LoadFriends() {
    for (let i = 0; i<10; i++) {
        let friendData = {
            minimiSrc: "/static/images/common/minimi/은모.png",
            name: "김김김",
            mood: "화가남",
            loginStatus: "접속중",
            friendId: i,
            hompiId: i
        };
        addFriendItem(friendData)
    }
}

function addFriendItem(friendData) {
    let friendItem = `
    <div class="friend-item">
        <div class="friend-content-container">
            <div class="friend-minimi-container">
                <img class="friend-minimi" src=${friendData.minimiSrc} alt="minimi">
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
    $("#friends-container").append(friendItem)
}


// 미니홈피 팝업 오픈 함수
function openMinihompiPop(hompiId) {
    const specs = `width=${HOMPI_WIDTH},height=${HOMPI_HEIGHT},left=${HOMPI_LEFT},top=${HOMPI_TOP}`;
    window.open(`/mini-hompi/main/${hompiId}`, 'mini-hompi', specs);
}