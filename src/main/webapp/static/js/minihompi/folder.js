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
            alert('기존 폴더이름과 동일합니다!');
            return;
        }
        updateFolderName();
    })

    $(document).on('click','#showDeleteBtn',function(){
        if($('.folderName').length === 1){
            alert('삭제할 수 있는 폴더가 없습니다');
            return;
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
             alert("페이지 로딩에 실패했습니다.\n오류내용: " + error);
         }
    });
}

//폴더 추가 로직
function addFolder(availStatus,folderInput){
    $.ajax({
        type: 'POST',
        url: "/api/folder/save/" + folderContentType + '/' + folderInput +'/' + availStatus,
        success: function(response){
            alert('저장했습니다');
            $('.statusSelect').hide();
            $('.folderNameWrap').hide();
            $('.folderInput').val('');
            if($('.folderName').length > 0){
               $('.folderName').remove();
            }
            getFolder();
        },
        error: function (xhr, status, error) {
            alert("페이지 로딩에 실패했습니다.\n오류내용: " + error);
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
                         + '"><img src="/static/images/common/folder.png">'
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
            alert('폴더 이름 변경 완료');
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
        alert('기본 폴더는 삭제할 수 없습니다');
        return;
    }
    $.ajax({
        type: 'DELETE',
        url: '/api/folder/delete/' + hompiId + '/' + folderId + '/' + folderContentType,
        success: function(response){
            if(!response){
                alert('삭제 실패');
                return;
            }
            alert('삭제 성공');
            getFolder();
        },
        error: function(error){
            console.error(error);
        }
    });
}