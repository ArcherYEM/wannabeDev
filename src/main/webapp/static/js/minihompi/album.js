$(document).ready(function(){
    $(document).on('click','#movePhoto', function(){
        clickMenu(this);
        displayAlbum();
        displayAlbumFolder();
    });

    $(document).on('click', '#saveBtn',function(){
        console.log('click');
        let url = `/api/minihompi/saveAlbum/${hompiId1}`;
        let albumData = {
            "albumTitle" : '몰라',
            "availStatus" : 32,
            "contents" : '이렇게하면되겠지제발돼라얍'
        }
        $.ajax({
             type: "POST",
             url: url,
             contentType: "application/json",
             data: JSON.stringify(albumData),
             success: function(response){
             },
             error: function(error){
             }
        });
    });
});

// saveBtn ajax 안 먹으면 이거 위로 땡기기 (--------------------------------------------------------)
const url = window.location.pathname;
const hompiId1 = url.split('/').pop();

// 사진첩 띄우는 함수
function displayAlbum() {
    $.ajax({
        type: "GET",
        url: "/mini-hompi/album",
        dataType: "html",
        success: function (data) {
             $("#rightWrap .rightMainWrap").empty();
             $("#rightWrap .rightMainWrap").html(data);
         },
         error: function (xhr, status, error) {
             alert("페이지 로딩에 실패했습니다1.\n오류내용: " + error);
         }
    });
}

// 사진첩 폴더 띄우는 함수
function displayAlbumFolder() {
    $.ajax({
        type: "GET",
        url: "/mini-hompi/album/leftWrap",
        dataType: "html",
        success: function (data) {
         $("#leftWrap").children().remove();
         $("#leftWrap").html(data);
        },
        error: function (xhr, status, error) {
         alert("페이지 로딩에 실패했습니다2.\n오류내용: " + error);
        }
    });
}

function clickMenu(li){
    const clickLi = li;
    $(clickLi).addClass('on');
    $('#mainWrapBackground li').not(li).removeClass('on');
}



//function saveAlbum(albumName, availStatus){
//    let albumData = {
//        "albumName": albumName.val().trim(),
//        "availStatus": availStatus.val().trim()
//    }
//
//    $.ajax({
//    })
//}