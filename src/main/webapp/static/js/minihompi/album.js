$(document).ready(function(){
    // 사진첩 눌렀을 때 사진첩 창 뜨게하기
    $(document).on('click','#movePhoto1', function(){
        $('#gnb li').removeClass();
        $(this).addClass('on');
        displayAlbum();
        displayAlbumFolder();
        //getAlbumFolder();
    });

    // (등록) 폴더 이름 쓰고 엔터 쳤을 때
    $(document).on('keydown', '.folderInput', function(e){
        const folderName = $('.folderInput').val().trim();
        const availStatus = $('#availStatus').val();
        if(e.keyCode == 13 && folderName !== ""){
            addAlbumFolder(availStatus,folderName);
        }
    });

    //(등록) 등록 버튼을 클릭했을 때
    $(document).on('click', '.folderInputBtn', function(){
        const folderName = $('.folderInput').val().trim();
        const availStatus = $('#availStatus').val();
        console.log('folderName: ' + folderName);
        console.log('availStatus: ' + availStatus);
        if(folderName !== ""){
            addAlbumFolder(availStatus,folderName);
        }
    });

    $(document).on('click','#folderAddBtn',function(){
        $('#folderNameWrap').toggle();
        $('#statusSelect').toggle();
    });

    //TODO: function으로 분리해야함, 데이터 다시 실어야함
//    $(document).on('click', '#saveBtn',function(){
//       console.log('click');
//       let url = `/api/minihompi/saveAlbum/${hompiIdAlbum}`;
//       let albumData = {
//           "albumTitle" : '몰라',
//           "availStatus" : 32,
//           "contents" : '이렇게하면되겠지제발돼라얍'
//       }
//       $.ajax({
//            type: "POST",
//            url: url,
//            contentType: "application/json",
//            data: JSON.stringify(albumData),
//            success: function(response){
//            },
//            error: function(error){
//            }
//       });
//   });
});

// saveBtn ajax 안 먹으면 이거 위로 땡기기 (--------------------------------------------------------)
const url = window.location.pathname;
const hompiIdAlbum = url.split('/').pop();

// 사진첩 폴더 띄우는 함수
function displayAlbumFolder() {
    $.ajax({
        type: "GET",
        url: "/mini-hompi/album/leftWrap",
        dataType: "html",
        success: function (data) {
             $("#leftWrap").children().remove();
             $("#leftWrap").html(data);
             //getAlbumFolder();
        },
        error: function (xhr, status, error) {
         alert("폴더 띄우기 실패!\n오류내용: " + error);
        }
    });
}

// 사진첩 띄우는 함수
function displayAlbum() {
    $.ajax({
        type: "GET",
        url: "/mini-hompi/album",
        dataType: "html",
        success: function (data) {
        console.log("displayAlbum() 호출됨", data);
             $("#rightWrap .rightMainWrap").empty();
             $("#rightWrap .rightMainWrap").html(data);
             //checkStatus();
         },
         error: function (xhr, status, error) {
             alert("사진첩 띄우기 실패!\n오류내용: " + error);
         }
    });
}



// 폴더 추가 로직
function addAlbumFolder(availStatus, folderName){
    console.log('availStatus: ' + availStatus);
    console.log('folderName: ' + folderName);
    $.ajax({
        type: 'POST',
        url: "/api/folder/save/02/" + folderName + '/' + availStatus,
        success: function(response){
            alert('폴더를 저장했습니다.');
            $('#statusSelect').hide();
            $('#folderNameWrap').hide();
            $('.folderInput').val('');
            if($('.hompiFolderName').length > 0){
                $('.hompiFolderName').remove();
            }
            //getAlbumFolder();
        },
        error: function(xhr, status, error) {
            alert("폴더 저장에 실패하였습니다.\n오류내용: " + error);
        }
    });
}
//// 폴더 보여주기
//function getAlbumFolder(){
//    $.ajax({
//        type: 'POST',
//        url: "/api/folder/read/" + hompiIdAlbum + "/02",
//        dataType: 'json',
//        success: function(folderList){
//            let code = '<div class="hompiFolderWrap">';
//            folderList.forEach(function(folderDTO,index){
//                code += '<div class= "hompiFolderName"><button data-id="'+folderDTO.folderId
//                         + '"><img src="/static/images/common/folder.png">'
//                         + " " +folderDTO.folderName + '</button></div>';
//            })
//            code += "</div>";
//            $('#folderWrap').append(code);
//        },
//        error: function(error){
//            console.error(error);
//        }
//    });
//}




