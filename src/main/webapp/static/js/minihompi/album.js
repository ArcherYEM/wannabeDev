const url = window.location.pathname;
const hompiIdAlbum = url.split('/').pop();
let albumImg = null;
let isEditMode = false;
let isSaveMode = false;

$(document).ready(function(){
    // 사진첩 눌렀을 때 사진첩 창 뜨게하기
    $(document).on('click','#movePhoto1', function(){
        $('#gnb li').removeClass();
        $(this).addClass('on');
        displayAlbum();
        checkStatus();
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
//    // (창 갈아끼우기) 게시글 등록 버튼 눌렀을 때
//    $(document).on('click','#regBtn',function(){
//        $('#albumFolderId').empty();
//        let content = ``;
//        $('.folderName button').each(function(element){
//            content += `<option value="${$(this).val()}">${$(this).text()}</option>`;
//        });
//
//        $('#albumFolderId').append(content);
//        $('.display-img').css('display', 'none');
//        $('.display-text').css('display', 'none');
//        $('.display-album').css('display', 'none');
//        $('.upload-album').css('display', 'grid');
//        $('.upload-img').css('display', 'block');
//        $('.upload-text').css('display', 'block');
//        $('.upload-content').css('display', 'block');
//    });

    // (게시글 등록) 밑에 있는 등록버튼 눌렀을 때
    $(document).on('click', '#saveBtn', function(){
        if (!isSaveMode){
            $('#albumFolderId').empty();
            let content = ``;
            $('.folderName button').each(function(element){
                content += `<option value="${$(this).val()}">${$(this).text()}</option>`;
            });

            $('#albumFolderId').append(content);
            $('.display-img').css('display', 'none');
            $('.display-text').css('display', 'none');
            $('.display-album').css('display', 'none');
            $('.upload-album').css('display', 'grid');
            $('.upload-img').css('display', 'block');
            $('.upload-text').css('display', 'block');
            $('.upload-content').css('display', 'block');

            isSaveMode = true;
            $(this).text('저장');
        } else {
            const folderId = $('#albumFolderId').val();
            const albumTitle = $('#albumTitle').val();
            const albumAvailStatus = $('#albumAvailStatus').val();
            const albumContent = $('#albumText').val();

            if(!folderId || !albumTitle || !albumAvailStatus || !albumContent ){
                alert('사진첩의 제목과 설명은 필수입니다.');
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
            getFolder();
            resetUploadForm();
            isSaveMode = false;
            $('#saveBtn').text('등록');
        }
    });

    // (게시글 수정)
    $(document).on('click', '#editAlbumBtn', function(){
        if(!isEditMode){
            $('.upload-album').css('display', 'grid');
            $('.upload-img').css('display', 'block');
            $('.upload-text').css('display', 'block');
            $('.upload-content').css('display', 'block');
            $('#albumFolderId').empty();

            let content = ``;
            $('.folderName button').each(function(element){
                content += `<option value="${$(this).val()}">${$(this).text()}</option>`;
            });
            $('#albumFolderId').append(content);

            $('#albumAvailStatus').val('31');
            $('.display-album').css('display', 'none');
            $('.display-img').css('display', 'none');
            $('.display-text').css('display', 'none');
            $('.display-content').css('display', 'none');

            $('#albumTitle').val($('#titleAlbum').text());
            $('#previewImg').attr('src', $('.album-image').attr('src'));
            $('#albumText').val($('#contentAlbum').text());

            isEditMode = true;
            $(this).text('저장');
        } else {
            const folderId = $('#albumFolderId').val();
            const albumTitle = $('#albumTitle').val();
            const albumAvailStatus = $('#albumAvailStatus').val();
            const albumContent = $('#albumText').val();
            const albumId = $('.folderContentWrap p').data('id');


            if(!folderId || !albumTitle || !albumAvailStatus || !albumContent ){
                alert('사진첩의 제목과 설명은 필수입니다.');
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
            formData.append('albumId', albumId);
            //컨트롤러에서도 받는 처리 해주기
            updateAlbum(formData);
            resetUploadForm();
            isEditMode=false;
            $(this).text('수정');
        }
    });

    // 폴더 이름 클릭했을 때
    $(document).on('click', '.folderContentWrap p',function(){
        const clickAlbumId = $(this).data('id');
        albumId = clickAlbumId;
        getAlbumContent(albumId);
    });

    // (게시글 삭제)
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
        moveFolder();
        getFolder();
        getAlbumContent(1);
    });
});

// 사진첩 띄우는 함수
function displayAlbum() {
    $.ajax({
        type: "GET",
        url: "/mini-hompi/album",
        dataType: "html",
        success: function (data) {
             $("#rightWrap .rightMainWrap").empty();
             $("#rightWrap .rightMainWrap").html(data);
             checkStatus();
         },
         error: function (xhr, status, error) {
             alert("사진첩 띄우기 실패!\n오류내용: " + error);
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
            getFolder();
        },
        error: function(error){
            alert('게시글 저장 실패.');
            console.error(error);
        }
    });
}

// 앨범 수정
function updateAlbum(formData){
    console.log("formData: " + formData);
    $.ajax({
        type: "POST",
        url: "/api/minihompi/updateAlbum/" + hompiIdAlbum,
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){
            alert('게시글이 성공적으로 수정되었습니다.');
            console.log(response);
            getAlbumContent(1);
            getFolder();
        },
        error: function(error){
            alert('게시글 저장 실패.');
            console.error(error);
        }
    });
}

// 등록창 초기화
function resetUploadForm(){
    $('#album-title').css('display','none');
    $('#album-avail-status-select').css('display','none');
    $('#album-folder-select').css('display','none');
    $('#albumTitle').val('');
    $('#albumText').val('');
    $('#albumAvailStatus').val('31');
    $('#albumFolderId').val('1');
    $('#previewImg').attr('src', '/static/images/common/loding.jpg');
    $('#albumImage').val('');
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

             // 기존 내용 초기화하기
            $('.display-img').empty();
            $('.display-text').empty();
            $('.display-album').empty();

            $('#albumTitle').val('');
            $('#albumAvailStatus').val('31');
            $('#albumFolderId').val('기본 폴더');
            $('#previewImg').attr('src', '/static/images/common/loding.jpg');
            $('#albumImage').val('');

            $('.upload-img').hide();
            $('.upload-text').hide();
            $('.upload-album').hide();
            $('.display-content').show();
            $('.display-img').show();
            $('.display-text').show();
            $('.display-album').show();
            $('.display-img').append(`
                <div data-avail="${response.availStatus}" class = "album-photo">
                    <img src="${response.albumImage}" class= "album-image" alt="앨범 이미지" style="height: 100px; width: 100px;">
                </div>
            `);

            $('.display-text').append(`
                <div data-avail="${response.availStatus}" class = "album-content" id="contentAlbum">${response.albumContent}</div>
            `);
            $('.display-album').append(`
                <div data-id="${response.albumId}" class = "album-content" id="titleAlbum">${response.albumTitle}</div>
            `);
        },
        error: function(error){
            console.log('요청 URL: ' + '/api/minihompi/getAlbum/' + albumId + '/' + hompiIdAlbum);
            console.log('error: ' + error);
            alert('글');
        }
    })
}

// 게시글 삭제
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
            getAlbumContent(1);
        },
        error: function(response){
            console.log("response: " + response);
            alert('삭제 실패!');
        }
    });
}