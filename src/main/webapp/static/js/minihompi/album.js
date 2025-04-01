const url = window.location.pathname;
const hompiIdAlbum = url.split('/').pop();
let albumImg = null;
let isEditMode = false;
let isSaveMode = false;
let isCommentEditMode = false;

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
            Swal.fire({
                icon: 'error ',
                title: '이미지 변경 실패!',
                text: '이미지 파일만 올려주세요.'
           });
        }
    });

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
            $('#editAlbumBtn').text("수정");
        } else {
            const folderId = $('#albumFolderId').val();
            const albumTitle = $('#albumTitle').val();
            const albumAvailStatus = $('#albumAvailStatus').val();
            const albumContent = $('#albumText').val();

            if(!folderId || !albumTitle || !albumAvailStatus || !albumContent ){
                Swal.fire({
                    icon: 'error',
                    title: '실패!',
                    text: '사진첩의 제목과 설명은 필수입니다.'
                });
                alert('사진첩의 제목과 설명은 필수입니다.');
                return;
            } else if (!albumImg){
                Swal.fire({
                    icon: 'error ',
                    title: '실패!',
                    text: '사진첩의 이미지 업로드는 필수입니다.'
                });
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
            $('#editAlbumBtn').text("등록");
        } else {
            const folderId = $('#albumFolderId').val();
            const albumTitle = $('#albumTitle').val();
            const albumAvailStatus = $('#albumAvailStatus').val();
            const albumContent = $('#albumText').val();
            const albumId = $('.folderContentWrap p').data('id');


            if(!folderId || !albumTitle || !albumAvailStatus || !albumContent ){
                Swal.fire({
                    icon: 'error',
                    title: '실패!',
                    text: '사진첩의 제목과 설명은 필수입니다.'
                });

                return;
            } else if (!albumImg){
                Swal.fire({
                    icon: 'error ',
                    title: '실패!',
                    text: '사진첩의 이미지 업로드는 필수입니다.'
                });
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
        if(folderContentType !== '02'){
                return;
        }
        const clickAlbumId = $(this).data('id');
        albumId = clickAlbumId;
        getAlbumContent(albumId);
    });

    // (게시글 삭제)
    $(document).on('click', '#deleteAlbumBtn', function(){
        if($('.album-content').length === 0){
            Swal.fire({
                icon: 'error ',
                title: '삭제 실패!',
                text: '사진첩이 존재하지 않습니다.'
            });
            return;
        }
        console.log('albumId: ' + albumId);
        console.log("hompiIdAlbum: " + hompiIdAlbum);
        Swal.fire({
            title: '삭제하시겠습니까?',
            text: '이 작업은 되돌릴 수 없습니다.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '삭제',
            cancelButtonText: '취소',
            reverseButtons: false
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: 'success',
                    title: '삭제 완료!',
                    text: '사진첩이 성공적으로 삭제되었습니다.'
                });
            } else {
                Swal.fire({
                    icon: 'info',
                    title: '삭제 취소',
                    text: '사진첩 삭제가 취소되었습니다.'
                });
            }
        });
        deleteAlbum(albumId,hompiIdAlbum);
        moveFolder();
        getFolder();
        getAlbumContent(1);
    });

    // 댓글 등록
    $(document).on('click', '#saveCommentBtn', function(){
        console.log('click');
        const albumId = $('#contentAlbum').data('albumid');
        const availStatus = $('#contentAlbum').data('avail');
        const commentContent = $('#commentContent').val();
        console.log('albumId: ' + albumId);
        console.log('availStatus: ' + availStatus);
        console.log('commentContent: ' + commentContent);
        if ((availStatus === null || availStatus === undefined || availStatus === "") ||
            (commentContent === null || commentContent === undefined || commentContent === "")){
            Swal.fire({
                icon: 'error ',
                title: '댓글 등록 실패!',
                text: '게시글을 선택해주세요.'
            });
            $('#commentContent').val('');
            return;
        }

        saveComment(hompiIdAlbum, albumId, availStatus, commentContent);
    });

    // 댓글 삭제
    $(document).on('click', '.deleteCommentBtn', function(){
        const albumId = $('.comment-display-content').data('albumid');
        const commentId = $('.comment-display-content').data('commentid');
        console.log('albumId: ' + albumId);
        console.log('commentId:  ' + commentId);

        deleteComment(albumId, commentId, hompiIdAlbum);
    });

    // 댓글 수정
   $(document).on('click', '.editCommentBtn', function(){
       const commentInfo = $(this).closest('.comment-info');  // 클릭된 댓글의 부모 요소만 선택
       const commentEditContainer = commentInfo.find('.comment-edit-container');  // 그 안의 수정창만 선택
       const commentDisplayContent = commentInfo.find('.comment-display-content');  // 그 안의 댓글 내용만 선택
       const commentContentEdit = commentInfo.find('.commentContentEdit');  // 수정창의 입력 필드 선택

       if (!isCommentEditMode) {
           commentEditContainer.css('display', 'block');
           commentDisplayContent.css('display', 'none');
           isCommentEditMode = true;
           $(this).text('저장');
       } else {
           const commentId = commentDisplayContent.data('commentid');
           const albumId = commentDisplayContent.data('albumid');
           const commentContent = commentContentEdit.val();

           console.log('albumId: ' + albumId);
           console.log('commentId: ' + commentId);
           console.log('commentContent: ' + commentContent);

           if (commentContent === '') {
               Swal.fire({
                   icon: 'error ',
                   title: '댓글 수정 실패!',
                   text: '댓글을 입력해주세요.'
               });
               return;
           }

           updateComment(hompiIdAlbum, commentId, commentContent, albumId);
           isCommentEditMode = false;
           $(this).text('수정');

           commentEditContainer.css('display', 'none');
           commentDisplayContent.css('display', 'block');
           commentDisplayContent.text(commentContent);
       }
   });

    $(document).on('click', '#backAlbumBtn', function(){
        const albumId = $('.folderContentWrap p').data('id');
        getAlbumContent(albumId);
    });

    $(document).on('click', '.backCommentBtn', function(){
        const albumId = $('.folderContentWrap p').data('id');
        resetComment();
        getAlbumContent(albumId);
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
             Swal.fire({
                 icon: 'error ',
                 title: '실패!',
                 text: '다시 시도해주세요.'
             });
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
            Swal.fire({
                icon: 'success ',
                title: '게시글 등록 성공!',
                text: '게시글이 등록되었습니다.'
            });
            console.log(response);
            resetUploadForm();
            getAlbumContent(1);
            getFolder();
        },
        error: function(error){
            Swal.fire({
                icon: 'error ',
                title: '게시글 저장 실패!',
                text: '다시 시도해주세요.'
            });
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
            Swal.fire({
                icon: 'success ',
                title: '게시글 수정 성공!',
                text: '게시글이 수정되었습니다.'
            });
            console.log(response);
            getAlbumContent(1);
            getFolder();
        },
        error: function(error){
            Swal.fire({
                icon: 'error ',
                title: '게시글 수정 실패!',
                text: '다시 시도해주세요.'
            });
            console.error(error);
            getAlbumContent(1);
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
    });
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
            resetComment();
            getAlbumComment(albumId, hompiIdAlbum);
            $('#editAlbumBtn').text('수정');
            $('#saveBtn').text('등록');
            isEditMode = false;
            isSaveMode = false;
            isCommentEditMode = false;

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
                <div class = "album-photo">
                    <img src="${response.albumImage}" class= "album-image" alt="앨범 이미지" style="height: 100px; width: 100px;">
                </div>
            `);

            $('.display-text').append(`
                <div data-albumid="${response.albumId}" data-avail="${response.availStatus}" class = "album-content" id="contentAlbum">${response.albumContent}</div>
            `);
            $('.display-album').append(`
                <div data-id="${response.albumId}" class = "album-content" id="titleAlbum">${response.albumTitle}</div>
            `);
        },
        error: function(error){
            console.log('요청 URL: ' + '/api/minihompi/getAlbum/' + albumId + '/' + hompiIdAlbum);
            console.log('error: ' + error);
        }
    });
}

// 게시글 삭제
function deleteAlbum(albumId,hompiIdAlbum){
    $.ajax({
        type: "POST",
        url: "/api/minihompi/deleteAlbum",
        contentType: "application/json",
        data: JSON.stringify({
            albumId: albumId,
            hompiId: hompiIdAlbum
        }),
        success: function (response){
            console.log("response: " + response);
            getAlbumContent(1);
        },
        error: function(response){
            console.log("response: " + response);
        }
    });
}

// 댓글 저장
function saveComment(hompiIdAlbum, albumId, availStatus, commentContent) {
    $.ajax({
        type: "POST",
        url: "/api/minihompi/saveComment?availStatus=" + availStatus,
        contentType: "application/json",
        data: JSON.stringify({
            hompiId: hompiIdAlbum,
            albumId: albumId,
            commentContent: commentContent
        }),
        success: function (response){
            console.log("response: " + response);
            Swal.fire({
                icon: 'success ',
                title: '댓글 등록 성공!!',
                text: '댓글이 등록되었습니다.'
            });
            $('#commentContent').val('');
            getAlbumContent(albumId);
        },
        error: function(response){
            console.log("response: " + response);
            Swal.fire({
                icon: 'error ',
                title: '댓글 등록 실패!',
                text: '다시 시도해주세요.'
            });
            $('#commentContent').val('');
            getAlbumContent(albumId);
        }
    });
}

// 댓글 조회
function getAlbumComment(hompiIdAlbum, albumId){
     $.ajax({
        type: 'GET',
        url: '/api/minihompi/getComment/' + hompiIdAlbum + '/' + albumId,
        dataType: 'json',
        success: function(response){
            console.log(response);

            if(!response){
                console.log("댓글이 없습니다.");
                return;
            }

            response.forEach(function(comment){
                const commentHTML = `
                    <div class="comment-info">
                        <div class="comment-user-content">
                            <div class="comment-user-name">${comment.userName} : </div>
                            <div data-albumId="${comment.albumId}" data-commentId="${comment.commentId}"
                                 class="comment-display-content">${comment.commentContent}</div>
                            <div class="comment-edit-container" style="display: none;">
                                <input type="text" class="commentContentEdit"/>
                            </div>
                        </div>
                        <div class="comment-date-btn">
                            <div class="comment-date">
                                <div class="comment-insert-date">${comment.insertDt}</div>
                            </div>
                            <div class="comment-btn-container">
                                <button class="editCommentBtn album-btn">수정</button>
                                <button class="deleteCommentBtn album-btn">삭제</button>
                                <button class="backCommentBtn album-btn">돌아가기</button>
                            </div>
                        </div>
                        <hr/>
                    </div>

                `;
                $('.comment-container').append(commentHTML);
            });
        },
        error: function(error){
            console.error(error);
        }
    });
}

// 댓글창 초기화
function resetComment() {
    $('.comment-info').remove();
}

// 댓글 삭제
function deleteComment(hompiIdAlbum, commentId, albumId) {
     $.ajax({
        type: "POST",
        url: "/api/minihompi/deleteComment",
        contentType: "application/json",
        data: JSON.stringify({
            hompiId: hompiIdAlbum,
            commentId: commentId,
        }),
        success: function (response){
            console.log("response: " + response);
            Swal.fire({
                icon: 'success ',
                title: '댓글 삭제 성공!',
                text: '댓글이 삭제되었습니다.'
            });
            getAlbumContent(albumId);
        },
        error: function(response){
            console.log("response: " + response);
            Swal.fire({
                icon: 'error ',
                title: '댓글 삭제 실패!',
                text: '다시 시도해주세요.'
            });
            getAlbumContent(albumId);
        }
    });
}

// 댓글 수정
function updateComment(hompiIdAlbum, commentId, commentContent, albumId){
    $.ajax({
        type: "POST",
        url: "/api/minihompi/updateComment",
        contentType: "application/json",
        data: JSON.stringify({
            hompiId: hompiIdAlbum,
            commentId: commentId,
            comment: commentContent
        }),
        success: function (response){
            console.log("response: " + response);
            Swal.fire({
                 icon: 'success',
                 title: '댓글 수정 성공!',
                 text: '댓글이 수정되었습니다.'
             });
            getAlbumContent(albumId);
        },
        error: function(response){
            console.log("response: " + response);
            Swal.fire({
                icon: 'error ',
                title: '댓글 수정 실패!',
                text: '다시 시도해주세요.'
            });
            getAlbumContent(albumId);
        }
    });
}
