//contentType:다이어리: "01", 사진첩: "02", 게시판: "03"
$(document).ready(function(){
    $(document).on('click', '#gnb li',function(){
        folderContentIndex = $(this).index() - 1;
        if(folderContentIndex === -1 || folderContentIndex === 0 || folderContentIndex === 2 ||
         folderContentIndex === 5 || folderContentIndex === 6){
            return;
        }
        if(folderContentIndex === 1){
            folderContentIndex = 0;
        }else if(folderContentIndex === 3){
            folderContentIndex = 1;
        }else{
            folderContentIndex = 2;
        }

        folderContentType = folderContentList[folderContentIndex];
        moveFolder();
        getFolder();
    })
    $(document).on('click','.folderAddBtn',function(){
        $('.folderNameWrap').toggle();
        $('.statusSelect').toggle();
    });

    $(document).on('keyup','.folderInput',function(e){
        const text = $('.folderInput').val().trim();
        const availStatus = $('.statusSelect').val();
        if(e.keyCode == 13 && text !== ""){
            addFolder(availStatus,text);
        }
    });

    $(document).on('click','.folderInputBtn',function(){
        const text = $('.folderInput').val().trim();
        const availStatus = $('.statusSelect').val();
        if(text !== ""){
            addFolder(availStatus,text);
        }
    })

    $(document).on('click', '.folderName button', function(){
        const appendHere = $(this).closest('.folderName');
        const folderId = $(this).val();
        if($(this).hasClass('folderOn')){
            $(this).removeClass('folderOn');
            $(this).next('.folderContentWrap').remove();
            return;
        }
        $('.folderContentWrap').remove();
        $('.folderName button').removeClass('folderOn');
        $(this).addClass('folderOn');
        getFolderContents(folderId, appendHere);
    });

    $(document).on('click','.folderContentWrap p',function(){
        const diaryId = $(this).data('id');
        getDiaryContent(diaryId);
        $(this).css('background-color','gainsboro');
        $('.folderContentWrap p').not($(this)).css('background-color','white');
    });

    $(document).on('click', '.folderBottomWrap button',function(){
        $('.editFolderMenu').toggleClass('hidden');
    })

    $(document).on('click','#folderEditBtn', function(){
        $('#folderEditModal').show();
        let content ='';
        $('.folderName button').each(function(index,element){
            content += `<option value="${$(this).val()}">${$(this).text()}</option>`
        })
        $('.selectModalFolder').empty().append(content);
        $('.folderNameInput').val($('.selectModalFolder option:selected').text().trim());
    });

    $(document).on('change','.selectModalFolder',function(){
        const text = $('.selectModalFolder option:selected').text().trim();
        $('.folderNameInput').val(text);
    })

    $(document).on('click','#updateFolderNameBtn',function(){
        if($('.selectModalFolder option:selected').text().trim() === $('.folderNameInput').val().trim()){
            return Swal.fire({
                   title: "폴더 이름변경 실패",
                   text: "기존 폴더 이름과 동일합니다!",
                   icon: 'warning'
            });
        }
        updateFolderName();
    })

    $(document).on('click','#showDeleteBtn',function(){
        if($('.folderName').length === 1){
            return Swal.fire({
                    title: "삭제 실패",
                    text: "삭제가 가능한 폴더가 없습니다",
                    icon: 'warning'
                });
        }
        $('.folderDelBtn').show();
    })

    $(document).on('click','.folderDelBtn',function(){
        const folderId = $(this).data('id');
        if(confirm('정막 삭제하시겠습니까'))
        deleteFolder(folderId);
    })

    $(document).on('click', '#folderModalExit', function(){
        $('#folderEditModal').hide();
    })

});
let folderTitleList = ["다이어리","사진첩","게시판"];
let folderContentList = ["01","02","03"];
let folderContentIndex;
let folderContentType;
const path = window.location.pathname.split('/');
const hompiId = path[3];


function moveFolder() {
     $.ajax({
         type: "GET",
         url: "/api/folder/leftWrap",
         dataType: "html",
         success: function (data) {
             $("#leftWrap").children().remove();
             $("#leftWrap").html(data);
             const folderTitle = folderTitleList[folderContentIndex];
             $('#folderTitle').text(folderTitle);
         },
         error: function (xhr, status, error) {
             Swal.fire({
                   title: "폴더 가져오기 실패",
                   text: "폴더 정보를 불러오지 못헀습니다",
                   icon: 'warning'
            });
         }
    });
}

//폴더 추가 로직
function addFolder(availStatus,folderInput){
    $.ajax({
        type: 'POST',
        url: "/api/folder/save/" + folderContentType + '/' + folderInput +'/' + availStatus,
        success: function(response){
             Swal.fire({
                   title: "폴더 저장 성공",
                   text: "폴더를 성공적으로 저장하였습니다!",
                   icon: 'success'
            });
            $('.statusSelect').hide();
            $('.folderNameWrap').hide();
            $('.folderInput').val('');
            if($('.folderName').length > 0){
               $('.folderName').remove();
            }
            getFolder();
        },
        error: function (xhr, status, error) {
            return Swal.fire({
                   title: "폴더 추가하기 실패",
                   text: "폴더를 추가하지 못헀습니다. 다시 시도해 주세요!",
                   icon: 'warning'
            });
        }
    });
}

function getFolder(){
    const hompiAuth = sessionStorage.getItem('myHompiCheck');
    $.ajax({
        type: 'GET',
        url: '/api/folder/read/' + hompiId + '/' + folderContentType,
        dataType: 'json',
        success: function(folderList){
            $('.folderWrap').remove();
            let code = '<div class="folderWrap">';
            folderList.forEach(function(folderDTO,index){
                code += '<div class="smallFolderWrap"><div class="folderName"><button value="'+folderDTO.folderId
                         + '"><img src="/images/common/icon/folder.png">'
                         + " " +folderDTO.folderName + '</button>';
                         if(folderDTO.folderId !== 1){
                            code += '</div><button data-id="' + folderDTO.folderId +'"class="folderDelBtn">삭제</button></div>';
                         }else{
                            code += '</div></div>';
                         }
            })
            code += "</div>";
            if(hompiAuth === "0"){
                $('.folderAddBtn').show();
                $('.toggleBottomWrap').show();
            }
            $('#folderWrap').append(code);
        },
        error: function(error){
            console.error(error);
        }
    });
}

function getFolderContents(folderId ,appendHere){
    $.ajax({
        type: 'GET',
        url: '/api/folder/read/'+ hompiId +'/' + folderContentType + '/' + folderId,
        dataType: 'json',
        success: function(response){
            let code = '<div class="folderContentWrap">';
            response.forEach(function(folderDTO){
                    code += `<p data-id="${folderDTO.folderId}">${folderDTO.folderName}</p>`
                })
                code += '</div>';
                appendHere.append(code);
            },
            error: function(error){
                console.error(error);
        }
    });
}

function updateFolderName(){
    const folderId = $('.selectModalFolder').val();
    const updateFolderName = $('.folderNameInput').val();
    $.ajax({
        type: 'PUT',
        url: '/api/folder/update/' + hompiId + '/' + folderId + '/' + folderContentType + '/' + updateFolderName,
        success: function(){
             Swal.fire({
                   title: "폴더 이름변경 완료",
                   text: "폴더 이름이 변경되었습니다!",
                   icon: 'success'
            });
            getFolder();
            $('#folderEditModal').hide();
        },
        error: function(error){
            console.error(error);
        }
    });
}

function deleteFolder(folderId){
    if(folderId === 1){
        return Swal.fire({
            title: "폴더 삭제 실패",
            text: "기본 폴더는 삭제가 불가합니다!",
            icon: 'warning'
        });
    }
    $.ajax({
        type: 'DELETE',
        url: '/api/folder/delete/' + hompiId + '/' + folderId + '/' + folderContentType,
        success: function(response){
            if(!response){
            return Swal.fire({
                   title: "폴더 삭제 실패",
                   text: "폴더를 삭제하는데 실패했습니다!",
                   icon: 'warning'
            });
            }
             Swal.fire({
                   title: "폴더 삭제 성공",
                   text: "폴더를 성공적으로 삭제하셨습니다.",
                   icon: 'success'
            });
            getFolder();
        },
        error: function(error){
            console.error(error);
        }
    });
}