$(document).ready(function(){
    $(document).on('click','#moveDairy1',function(e){
        $('#gnb li').removeClass();
        $(this).addClass('on');
        moveDiary();
        getDiaryContent(0);
        moveDiaryLeft();
        getDiaryFolder();
        checkCommentUser();
        // 가장 오래된 CONTENT 가져오기
    });

    $(document).on('click', '#day td',function(){
        const day = $(this).text();
        getDiaryByDay(day);
    });

    //다이어리 생성 함수: textarea 없으면 textarea 생성
    $(document).on('click','#registerBtn',function(){
        if($('#diaryStatus').is('.updateContent')){
            alert('수정 버튼을 클릭해주세요.');
            return;
        }
        diaryText = $('#diary textarea');
        if(diaryText.length === 0){
            $('.diaryContent').empty();
            let content = `<div class="diarySelectWrap">댓글 허용: <select id="diaryStatus" class="addContent">
                <option value="33">전체 허용</option>
                <option value="32">일촌 허용</option>
                <option value="31">전체 비허용</option>
            </select><span class="folderSpan">선택 폴더: </span>
            <select id="selectFolder">`;
                $('.hompiFolderWrap button').each(function(element){
                    content += `<option value="${$(this).val()}">${$(this).text()}</option>`
                });
                content += `</select></div><textarea></textarea>`;
                $('#diary').append(content);
                return;
        }
        if(diaryText.val().trim().length === 0){
            alert('글을 작성해주세요!');
            return;
        }
        const folderId = $('#selectFolder').val();
        addDiaryContent(folderId,diaryText.val());
    });

    $(document).on('click','.diaryFolderAddBtn',function(){
        $('.diaryFolderNameWrap').toggle();
        $('.diaryStatusSelect').toggle();
    });

    $(document).on('keydown','.diaryFolderInput',function(e){
        const text = $('.diaryFolderInput').val().trim();
        const availStatus = $('.diaryStatusSelect').val();
        if(e.keyCode == 13 && text !== ""){
            addDiaryFolder(availStatus,text);
        }
    });

    $(document).on('click','.diaryFolderInputBtn',function(){
        const text = $('.diaryFolderInput').val().trim();
        const availStatus = $('.diaryStatusSelect').val();
        if(text !== ""){
            addDiaryFolder(availStatus,text);
        }
    })
    $(document).on('click','#folderName',function(){
        const folderId = $(this).data('id');

    });

    $(document).on('click', '.hompiFolderName button', function(){
        const btn = $(this);
        const folderId = btn.val();
        if(btn.hasClass('folderOn')){
            btn.removeClass('folderOn');
            btn.next('.folderContentWrap').remove();
            return;
        }
        $('.folderContentWrap').remove();
        $('.hompiFolderName button').removeClass('folderOn');
        btn.addClass('folderOn');
        getFolderContents(folderId, btn);
    });

    $(document).on('click', '.folderContentWrap p' ,function(){
        const clickP = $(this);
        const clickDiaryId = clickP.data('id');
        if($('.diaryContent').length > 0){
            $('.diaryContent').remove();
        }
        getDiaryContent(clickDiaryId);
    });

    $(document).on('click','.edit-btn',function(){
        const editBtn = $(this);
        if($('.diaryContent').length === 0){
            alert('다리어리가 존재하지 않습니다.')
            return;
        }
        const text = $('.diaryContent').text();
        diaryText = $('#diary textarea');
        if(diaryText.length === 0){
            $('.diaryContent').empty();
            $('#diary').append(`
            <select id="diaryStatus" class="updateContent">
                <option value="33">전체 공개</option>
                <option value="32">일촌 공개</option>
                <option value="31">비공개</option>
            </select><textarea>${text}</textarea>`)
            return;
        }
        if($('#diaryStatus').is('.addContent')){
            alert('등록 버튼을 클릭해주세요.');
            return;
        }
        if(diaryText.val().trim().length === 0){
            alert('글을 작성해주세요!');
            return;
        }
        const diaryId = $('.diaryContent').data('id');
        updateDiary(diaryId,diaryText.val());
    })

    $(document).on('click','.delete-btn',function(){
    if($('.diaryContent').length === 0){
        alert('다리어리가 존재하지 않습니다.')
        return;
    }
        const deleteBtn = $(this);
        const diaryId = $('.diaryContent').data('id');
        if(confirm('정말 삭제하시겠습니까?'))
        deleteDiary(diaryId);
    })

    $(document).on('click','#diaryCommentBtn',function(){
        const comment = $('#diaryComment');
        if(comment.val().trim().length === 0){
            alert('댓글을 작성해주세요');
            return;
        }
        addDiaryComment(comment.val());
    })

    $(document).on('click','.diaryCommentDelBtn', function(){
        const commentId = $(this).closest('li').attr('value');
        if(confirm('정말 삭제하기겠습니까'))
        deleteDiaryComment(commentId);
    })
});

let commentStatus;
let today;
let diaryText;
let month;
let dayName = ['SUN','MON','TUE','WED','THU','FRI','SAT'];

function moveDiary() {
     $.ajax({
         type: "GET",
         url: "/mini-hompi/diary",
         dataType: "html",
         success: function (data) {
             $("#rightWrap .rightMainWrap").empty();
             $("#rightWrap .rightMainWrap").html(data);
             checkStatus();
             getMonthDate();
         },
         error: function (xhr, status, error) {
             alert("페이지 로딩에 실패했습니다.\n오류내용: " + error);
         }
    });
}

function moveDiaryLeft() {
     $.ajax({
         type: "GET",
         url: "/mini-hompi/diary/leftWrap",
         dataType: "html",
         success: function (data) {
             $("#leftWrap").children().remove();
             $("#leftWrap").html(data);
         },
         error: function (xhr, status, error) {
             alert("페이지 로딩에 실패했습니다.\n오류내용: " + error);
         }
    });
}

//왼쪽 구역 할당 임시로 만듬
function getLeftWrap(){
    $.ajax({
         type: "GET",
         url: "/mini-hompi/hompiMain",
         dataType: "html",
         success: function (data) {
             $("#leftWrap").empty();
             const dataLeft = $(data).find('#leftWrap').html();
             $("#leftWrap").html(dataLeft);
             getDiaryFolder();
         },
         error: function (xhr, status, error) {
             alert("페이지 로딩에 실패했습니다.\n오류내용: " + error);
         }
    });
}

function getMonthDate(){
    $.ajax({
        type: "GET",
        url: "/mini-hompi/diary/daysInfo",
        dataType: "json",
        success: function (response){
            const days = response.days;
            const dayOfWeeks = response.dayOfWeeks;
            let rowHtml = '<tr>';
            days.forEach(function(day, index){
                const weekDay = dayOfWeeks[index];
                let style = "";
                if(weekDay === "SATURDAY"){
                    style = " style='color: blue'";
                }
                if(weekDay === "SUNDAY"){
                    style = " style='color: red'";
                }
                rowHtml += `<td${style}>${day}</td>`;
                if(index === 15){
                    rowHtml += '</tr><tr>';
                }
            });
            rowHtml += '</tr>';
            $('#day').append(rowHtml);
            month = response.month;
            today = new Date();
            $('.post-register p').text(month + '.' + today.getDate() +'.' + dayName[today.getDay()]);
        }
    });
}

//폴더 추가 로직
function addDiaryFolder(availStatus,folderInput){
    $.ajax({
        type: 'POST',
        url: "/api/folder/save/01/" + folderInput +'/' + availStatus,
        success: function(response){
            alert('저장했습니다');
            $('.diaryStatusSelect').hide();
            $('.diaryFolderNameWrap').hide();
            $('.diaryFolderInput').val('');
            if($('.hompiFolderName').length > 0){
               $('.hompiFolderName').remove();
            }
            getDiaryFolder();
        },
        error: function (xhr, status, error) {
            alert("페이지 로딩에 실패했습니다.\n오류내용: " + error);
        }
    });
}

function getDiaryFolder(){
    const hompiAuth = sessionStorage.getItem('myHompiCheck');
    $.ajax({
        type: 'GET',
        url: '/api/folder/read/' + hompiOwnerId + '/01',
        dataType: 'json',
        success: function(folderList){
            $('.hompiFolderWrap').remove();
            let code = '<div class="hompiFolderWrap">';
            folderList.forEach(function(folderDTO,index){
                code += '<div class= "hompiFolderName"><button value="'+folderDTO.folderId
                         + '"><img src="/static/images/common/folder.png">'
                         + " " +folderDTO.folderName + '</button></div>';
            })
            code += "</div>";
            $('#folderWrap').append(code);
            if(hompiAuth === "0"){
                $('.diaryFolderAddBtn').show();
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
        url: '/api/folder/read/'+ hompiOwnerId +'/01/'+ folderId,
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

function addDiaryContent(folderId, diaryContent){
    if(!folderId){
        alert('폴더를 선택해주세요');
        return;
    }
    const availStatus = $('#diaryStatus').val();
    $.ajax({
        type: 'POST',
        url: '/api/minihompi/add/diary/' + folderId + '/' +hompiOwnerId,
        data: {availStatus: availStatus,diaryContent: diaryContent},
        success: function(response){
            if(!response){
                alert('이미 해당 폴더에 오늘 작성한 다이어리가 있습니다.');
                return;
            }
            alert('저장 완료');
            getDiaryContent(0);
        },
        error: function(error){
            console.error(error);
        }
    })
}

function getDiaryContent(diaryId){
    $.ajax({
        type: 'GET',
        url: '/api/minihompi/get/diary/' + diaryId +'/' + hompiOwnerId,
        success: function(response){
            $('#diary').children().remove();
            if(!response){ //다이어리가 없을 경우
                return;
            }
            $('#diary').children().remove();
            $('#diary').append(`
                <div data-id="${response.diaryId}" data-avail="${response.availStatus}"
                class="diaryContent">${response.diaryContent}</div>
            `)
            getDiaryComment();
        },
        error: function(error){
            console.error(error);
        }
    })
}

function getDiaryByDay(day){
    const folderId = $('.folderOn').val();
    if(!folderId){
        alert('폴더를 선택해주세요');
        return;
    }
    $.ajax({
        type: 'GET',
        url: '/api/minihompi/get/diary-day/'+ day + '/' + folderId + "/" + hompiOwnerId,
        success: function(response){
            if(!response){
                alert('해당 날짜에 다이어리가 존재하지 않습니다')
                return;
            }
            $('#diary').children().remove();
            $('#diary').append(`
                <div data-id="${response.diaryId}" data-avail="${response.availStatus}"
                class="diaryContent">${response.diaryContent}</div>
            `)
        },
            error: function(error){
                console.error(error);
            }
    })
}

function deleteDiary(diaryId){
    $.ajax({
        type: 'DELETE',
        url: '/api/minihompi/delete/diary/' + diaryId + '/' + hompiOwnerId,
        dataType: 'json',
        success: function(response){
            alert('삭제 성공')
            getDiaryContent(0);
            getDiaryFolder()
        },
        error: function(error){
            console.error(error);
            alert('삭제 실패.')
        }
    })
}

function updateDiary(diaryId, diaryContent){
    const availStatus = $('#diaryStatus').val();
    $.ajax({
        type: 'POST',
        url: '/api/minihompi/update/diary/' + diaryId +'/' + hompiOwnerId,
        data: {diaryContent: diaryContent, availStatus: availStatus},
        dataType: 'json',
        success: function(response){
            alert('수정 성공')
            getDiaryContent(response);
        },
        error: function(error){
            alert('수정 실패')
            console.error(error);
        }
    })
}

//function addDiaryComment(comment){
//    const diaryId = $('.diaryContent').data('id');
//    const availStatus = $('.diaryContent').data('avail');
//    $.ajax({
//        type: 'POST',
//        url: '/api/mini-hompi/diary-comment/save/' + diaryId + '/' + hompiOwnerId,
//        data: {comment: comment, availStatus: availStatus},
//        success: function(response){
//            alert('댓글 작성 성공');
//            getDiaryComment();
//            $('#diaryComment').val('');
//        },
//        error: function(error){
//            alert('댓글을 작성할 권한이 없습니다');
//            console.error(error);
//        }
//    })
//}
//
//function getDiaryComment(){
//    const diaryId = $('.diaryContent').data('id');
//    const viewUserId = sessionStorage.getItem('userId');
//    $.ajax({
//        type: 'GET',
//        url: '/api/mini-hompi/diary-comment/read/' + diaryId + '/' + hompiOwnerId,
//        success: function(response){
//            $('.commentList').children().remove();
//            response.forEach(function(commentDTO){
//                    const commentHtml = `
//                        <li value="${commentDTO.commentId}">${commentDTO.comment}
//                            <span class="writerName">(${commentDTO.userName})</span>
//                            ${(commentDTO.useYn == "Y")
//                                ? `<span class="insertDate">${commentDTO.insertDt}고정</span>`
//                                : `<span class="insertDate">${commentDTO.insertDt}</span>`}
//                            ${(commentDTO.userId == viewUserId || commentDTO.hompiId == hompiOwnerId)
//                            ? '<img src="/static/images/common/delete.png" class="diaryCommentDelBtn">' : ''}
//                        </li>`;
//                        if(commentDTO.useYn == "Y"){
//                            $('.commentList').prepend(commentHtml);
//                        }else{
//                            $('.commentList').append(commentHtml);
//                        }
//            })
//            const diaryContentStatus = $('.diaryContent').data('avail');
//            if(diaryContentStatus < commentStatus){
//                $('.diaryCommentTable').hide();
//                $('.diaryCommentNo').show();
//            }else{
//                $('.diaryCommentTable').show();
//                $('.diaryCommentNo').hide();
//            }
//        },
//        error: function(error){
//            console.error(error);
//        }
//    })
//}
//
//function deleteDiaryComment(commentId){
//    const viewUserId = sessionStorage.getItem('userId');
//    $.ajax({
//        type: 'DELETE',
//        url: '/api/mini-hompi/diary-comment/delete/' + commentId +'/' + viewUserId + '/' + hompiOwnerId,
//        success: function(response){
//            alert('삭제 성공')
//            getDiaryComment();
//        },
//        error: function(error){
//            console.error(error);
//        }
//    })
//}
//
//function checkCommentUser(){
//    $.ajax({
//        type: 'GET',
//        url: '/mini-hompi/diary/comment/check-status/' + hompiOwnerId,
//        success: function(response){
//            commentStatus = response;
//        },
//        error: function(error){
//            console.error(error);
//        }
//    })
//}

function checkStatus(){
    $.ajax({
        type: 'GET',
        url: '/mini-hompi/diary/check-status/' + hompiOwnerId,
        dataType: 'json',
        success: function(response){
            if(response === true){
                $('#registerBtn').show();
                $('.post-actions').show();
                $('.post-actions').css('display','flex');
            }
        },
            error: function(error){
                console.error(error);
            }
    })
}

