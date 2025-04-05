$(document).ready(function () {
    let friendOn = $("#friendOn")
    let friendOnCntDisplay = $("#friendOnCntDisplay")
    let modal = $(".modal-layer")
    let nowFriendDisplay = $("#now-friend-display")
    let allFriendDisplay = $("#all-friend-display")
    let sideTabNowLongFriends = $("#side-tab-now-login-friends")

    nowLoginFriendCnt(function (nowLoginFriends) {
        friendOnCntDisplay.text(nowLoginFriends);
    });

    $(friendOn).on("click", function () {
        modal.removeClass("hidden");
    });

    nowLoginFriendCnt(function (nowLoginFriends) {
        nowFriendDisplay.text(`${nowLoginFriends} 명 접속 중`);
        sideTabNowLongFriends.text(`${nowLoginFriends}`);
    });
    allFriendCnt(function (allFriends) {
        allFriendDisplay.text(`전체 ${allFriends} 명`);
    });

});

$(document).on("click", "#friend-modal-layer", function(e) {
    if (e.target === this) {
        modalClose();
    }
});

function modalClose() {
    $("#friend-modal-layer").addClass("hidden");
}

function nowLoginFriendCnt(nowLoginFriends) {
    $.ajax({
        type:"GET",
        url:"/api/friend/logged/num",
        contentType: "application/json",
        success: function(response){
            nowLoginFriends(response);
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