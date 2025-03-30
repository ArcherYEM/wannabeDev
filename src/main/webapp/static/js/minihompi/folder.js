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

    $(document).on('keydown','.folderInput',function(e){
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
    $(document).on('click','#folderName',function(){
        const folderId = $(this).data('id');

    });

    $(document).on('click', '.folderName button', function(){
        const btn = $(this);
        const folderId = btn.val();
        if(btn.hasClass('folderOn')){
            btn.removeClass('folderOn');
            btn.next('.folderContentWrap').remove();
            return;
        }
        $('.folderContentWrap').remove();
        $('.folderName button').removeClass('folderOn');
        btn.addClass('folderOn');
        getFolderContents(folderId, btn);
    });

});

let folderTitleList = ["다이어리","사진첩","게시판"];
let folderContentList = ["01","02","03","04","05"];
let folderContentIndex;
let folderContentType;

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
        url: '/api/folder/read/' + hompiOwnerId + '/' + folderContentType,  //01바꾸기
        dataType: 'json',
        success: function(folderList){
            $('.folderWrap').remove();
            let code = '<div class="folderWrap">';
            folderList.forEach(function(folderDTO,index){
                code += '<div class= "folderName"><button value="'+folderDTO.folderId
                         + '"><img src="/static/images/common/folder.png">'
                         + " " +folderDTO.folderName + '</button></div>';
            })
            code += "</div>";
            $('#folderWrap').append(code);
            if(hompiAuth === "0"){
                $('.folderAddBtn').show();
            }
        },
        error: function(error){
            console.error(error);
        }
    });
}

function getFolderContents(folderId ,btn){
    $.ajax({
        type: 'GET',
        url: '/api/folder/read/'+ hompiOwnerId +'/' + folderContentType + '/' + folderId,  //01 바꾸기
        dataType: 'json',
        success: function(response){
            let code = '<div class="folderContentWrap">';
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