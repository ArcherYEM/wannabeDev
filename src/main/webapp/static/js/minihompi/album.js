let albumImg  = null;
const url = window.location.pathname;
const hompiIdAlbum = url.split('/').pop();
let albumId;

$(document).ready(function(){
    // 사진첩 눌렀을 때 사진첩 창 뜨게하기
    $(document).on('click','#movePhoto1', function(){
        $('#gnb li').removeClass();
        $(this).addClass('on');
        displayAlbum();
        displayAlbumFolder();
        getAlbumContent(1);
        checkStatus();
    });

    // (폴더등록) 폴더 이름 쓰고 엔터 쳤을 때
    $(document).on('keydown', '.albumFolderInput', function(e){
        const folderName = $('.albumFolderInput').val().trim();
        const availStatus = $('#availStatus').val();
        if(e.keyCode == 13 && folderName !== ""){
            addAlbumFolder(availStatus,folderName);
        }
    });

    // (폴더등록) 등록 버튼을 클릭했을 때
    $(document).on('click', '.albumFolderInputBtn', function(){
        const folderName = $('.albumFolderInput').val().trim();
        const availStatus = $('#availStatus').val();
        console.log('folderName: ' + folderName);
        console.log('availStatus: ' + availStatus);
        if(folderName !== ""){
            addAlbumFolder(availStatus,folderName);
        }
    });

    // (폴더등록) 등록 버튼을 눌렀을 때
    $(document).on('click','#albumFolderAddBtn',function(){
        $('#albumFolderNameWrap').toggle();
        $('#albumStatusSelect').toggle();
    });

    // (창 갈아끼우기) 게시글 등록 버튼 눌렀을 때
    $(document).on('click','#regBtn',function(){
        let content = ``;
        $('.albumFolderName button').each(function(element){
            content += `<option value="${$(this).data('id')}">${$(this).text()}</option>`;
        });
        $('#albumFolderId').append(content);
        $('.display-img').css('display', 'none');
        $('.display-text').css('display', 'none');
        $('.display-album').css('display', 'none');
        $('.upload-album').css('display', 'grid');
        $('.upload-img').css('display', 'block');
        $('.upload-text').css('display', 'block');
        $('.upload-content').css('display', 'block');
    });

    // (폴더를 눌렀을때)
    $(document).on('click', '.albumFolderName button', function(){
        const btn = $(this);
        const folderId = btn.data('id');
        if(btn.hasClass('folderOn')){
            btn.removeClass('folderOn');
            btn.next('.albumFolderContentWrap').remove();
            return;
        }
        $('.albumFolderContentWrap').remove();
        $('.albumFolderName button').removeClass('folderOn');
        btn.addClass('folderOn');
        getAlbumFolderContents(folderId, btn);
    });

    // 변경하기 버튼 눌렀을 때
    $(document).on('click','#uploadPhoto', function(){
        $('#albumImage').click();
    });

    // 이미지 변경
    $(document).on('change', '#albumImage', function(){
        const fileInput = $('#albumImage')[0];
        const file = fileInput.files[0];

        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();

            reader.onload = function(e){
                $('#previewImg').attr('src', e.target.result); // 미리보기 업데이트
            };

            reader.readAsDataURL(file);
            albumImg = file;
        } else {
            alert('이미지 파일만 선택 가능합니다.');
        }
    });

    // (게시글 등록) 밑에 있는 등록버튼 눌렀을 때
    $(document).on('click', '#saveBtn', function(){
        console.log('click');
        const folderId = $('#albumFolderId').val();
        const albumTitle = $('#albumTitle').val();
        const albumAvailStatus = $('#albumAvailStatus').val();
        const albumContent = $('#albumText').val();

        if(!folderId || !albumTitle || !albumAvailStatus || !albumContent ){
            alert('글 작성을 마치지 못했습니다.');
            return;
        } else if (!albumImg){
            alert('이미지를 선택하세요.');
            return;
        }

        const formData = new FormData();
        formData.append('albumImg', albumImg);
        formData.append('albumFolderId', folderId);
        formData.append('albumTitle', albumTitle);
        formData.append('albumAvailStatus', albumAvailStatus);
        formData.append('albumContent', albumContent);

        saveAlbum(formData);
    });

    // 폴더 이름 클릭했을 때
    $(document).on('click', '.albumFolderContentWrap p',function(){
        const clickAlbumId = $(this).data('id');
        albumId = clickAlbumId;
        getAlbumContent(clickAlbumId);
    });

    $(document).on('click', '#deleteAlbumBtn', function(){
        if($('.album-content').length === 0){
            alert('사진첩이 존재하지 않습니다.');
            return;
        }
        console.log('albumId: ' + albumId);
        console.log("hompiIdAlbum: " + hompiIdAlbum);
        if(confirm("삭제하시겠습니까?")){
        } else {
            alert("삭제 취소!");
            return;
        }
        deleteAlbum(albumId,hompiIdAlbum);
        displayAlbum();
        displayAlbumFolder();
        getAlbumContent(1);
    });
});

function reset() {
//모든 value 초기화 및 display 초기화
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
             getAlbumFolder();
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
             $("#rightWrap .rightMainWrap").empty();
             $("#rightWrap .rightMainWrap").html(data);
             //checkStatus();
         },
         error: function (xhr, status, error) {
             alert("사진첩 띄우기 실패!\n오류내용: " + error);
         }
    });
}

// 폴더 추가 함수
function addAlbumFolder(availStatus, folderName){
    console.log('availStatus: ' + availStatus);
    console.log('folderName: ' + folderName);
    $.ajax({
        type: 'POST',
        url: "/api/folder/save/02/" + folderName + '/' + availStatus,
        success: function(response){
            alert('폴더를 저장했습니다.');

            if($('.albumFolderName').length > 0){
                $('.albumFolderName ').remove();
            }
            getAlbumFolder();
        },
        error: function(xhr, status, error) {
            alert("폴더 저장에 실패하였습니다.\n오류내용: " + error);
        }
    });
}

// 폴더 보여주기 함수
function getAlbumFolder(){
    $.ajax({
        type: 'GET',
        url: "/api/folder/read/" + hompiIdAlbum + "/02",
        dataType: 'json',
        success: function(folderList){
            let code = '<div class="albumFolderWrap">';
            folderList.forEach(function(folderDTO,index){
                code += '<div class= "albumFolderName"><button data-id="'+folderDTO.folderId
                         + '"><img src="/static/images/common/folder.png">'
                         + " " +folderDTO.folderName + '</button></div>';
            })
            code += "</div>";
            $('#albumFolderWrap').append(code);
        },
        error: function(error){
            console.error(error);
        }
    });
}

// 폴더 안 컨텐츠 보여주기
function getAlbumFolderContents(folderId ,btn){
    $.ajax({
        type: 'GET',
        url: '/api/folder/read/'+ hompiIdAlbum +'/02/'+ folderId,
        dataType: 'json',
        success: function(response){
            let code = '<div class="albumFolderContentWrap">';
            response.forEach(function(folderDTO){
                    code += `<p data-id="${folderDTO.folderId}">${folderDTO.folderName}</p>`
                })
                code += '</div>'
                btn.after(code);
            },
            error: function(error){
                console.error(error);
        }
    });
}

// 사진첩 게시글 저장
function saveAlbum(formData){
    console.log("formData: " + formData);
    $.ajax({
        type: "POST",
        url: "/api/minihompi/saveAlbum/" + hompiIdAlbum,
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){
            alert('게시글이 성공적으로 저장되었습니다.');
            console.log(response);
            resetUploadForm();
            getAlbumContent(1);
        },
        error: function(error){
            alert('게시글 저장 실패.');
            console.error(error);
        }
    });
}
function resetUploadForm(){
    $('#album-title').css('display','none');
    $('#album-avail-status-select').css('display','none');
    $('#album-folder-select').css('display','none');
    $('#albumTitle').val('');
    $('#albumAvailStatus').val('31');
    $('#albumFolderId').val('폴더선택');
    $('#previewImg').attr('src', '/static/images/common/loding.jpg');
    $('#albumImage').val('');
    $('#albumText').val('');
}

// 내 홈피가 아닐 때 등록/수정 버튼 안 보이게
function checkStatus(){
    $.ajax({
        type: 'GET',
        url: '/api/minihompi/checkStatus/' + hompiOwnerId,
        dataType: 'json',
        success: function(response){
            if(response === false){
                $('#registerBtn').remove();
                $('.actions-container').remove();
            }
        },
        error: function(error){
            console.error(error);
        }
    })
}

// 사진첩 데이터 띄우기
function getAlbumContent(albumId){
    $.ajax({
        type:'GET',
        url:'/api/minihompi/getAlbum/' + albumId + '/' + hompiIdAlbum,
        dataType: "json",
        success: function(response){
            console.log('response: ' + response);
            console.log('사진첩 데이터 불러오기 성공!');

            $('.display-img').empty();
            $('.display-text').empty();
            $('.display-album').empty();
            $('.upload-img').css('display', 'none');
            $('.upload-text').css('display', 'none');
            $('.upload-album').css('display', 'none');
            $('.display-img').css('display', 'block');
            $('.display-text').css('display', 'block');
            $('.display-album').css('display', 'block');
            $('.display-img').append(`
                <div data-avail="${response.availStatus}" class = "album-photo">
                    <img src="${response.albumImage}" class= "album-image" alt="앨범 이미지" style="height: 100px; width: 100px;">
                </div>
            `);

            $('.display-text').append(`
                <div data-avail="${response.availStatus}" class = "album-content">${response.albumContent}</div>
            `);
            $('.display-album').append(`
                <div data-avail="${response.albumTitle}" class = "album-content">${response.albumTitle}</div>
            `);
        },
        error: function(error){
            console.log('요청 URL: ' + '/api/minihompi/getAlbum/' + albumId + '/' + hompiIdAlbum);
            console.log('error: ' + error);
            alert('글');
        }
    })
}

function deleteAlbum(albumId,hompiIdAlbum){
    $.ajax({
        type: "POST",
        url: "/api/minihompi/deleteAlbum",
        data: JSON.stringify({
            albumId: albumId,
            hompiId: hompiIdAlbum
        }),
        contentType: "application/json",
        dataType: "json",
        success: function (response){
            console.log("response: " + response);
            alert('삭제 성공!');
        },
        error: function(response){
            console.log("response: " + response);
            alert('삭제 실패!');
        }
    });
}
//function resetDisplay(){
//    $('.display-img').empty();
//    $('.display-text').empty();
//    $('.display-album').empty();
//}

//function switchToUpload(){
//    let content = ``;
//    $('.albumFolderName button').each(function(element){
//        content += `<option value="${$(this).data('id')}">${$(this).text()}</option>`;
//    });
//    $('#albumFolderId').append(content);
//    $('.upload-album').css('display', 'grid');
//    $('.upload-content').css('display', 'block');
//    $('.display-album').css('display','none');
//    $('.display-content').css('display', 'none');
//    $('.display-img').css('display', 'none');
//}

//function switchToDisplay(){
//    $('.display-album').empty();
//    $('.display-content').empty();
//    $('.display-img').empty();
//    $('.upload-album').empty();
//    $('.upload-content').empty();
//    $('.upload-img').empty();
//    $('.upload-album').css('display', 'none');
//    $('.upload-content').css('display', 'none');
//    $('.upload-img').css('display', 'none');
//    $('.display-album').css('display','block');
//    $('.display-content').css('display', 'block');
//    $('.display-img').css('display', 'block');
//}