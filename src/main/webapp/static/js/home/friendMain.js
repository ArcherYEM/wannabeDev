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
    friendOn.on("click", function () {
        modal.removeClass("hidden");
        sideFriendListText.css("color", "#FF8000");
    });
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

});
// 모달 닫기
$(document).on("click", "#friend-modal-layer, #friend-modal-close", function(e) {
    if (e.target === this) {
        modalClose();
    }
});

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