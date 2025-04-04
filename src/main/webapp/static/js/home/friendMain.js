$(document).ready(function () {
    let friendOn = $("#friendOn")
    let friendOnCntDisplay = $("#friendOnCntDisplay")

    loginCntDisplay(function (displayNum) {
        friendOnCntDisplay.text(displayNum);
    });



});

function loginCntDisplay(displayNum) {
    $.ajax({
        type:"GET",
        url:"/api/friend/logged/num",
        contentType: "application/json",
        success: function(response){
            displayNum(response);
        },
        error: function(error) {
            console.log(error)
        }
    });
}

