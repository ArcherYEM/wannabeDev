$(document).ready(function(){
    $(document).on('click','#gnb li',function(){
    //임시 왼쪽 구역 할당
        if(!$(this).is('#moveDairy1')){
            getLeftWrap();
            return;
        }
        clickMenu(this);
        moveDiary();
        moveDiaryLeft();
        getDiaryFolder();
        getDiaryContent(0);
        checkStatus();
        // 가장 오래된 CONTENT 가져오기
    });
    $(document).on('click', '#day td',function(){
        alert($(this).text());
    });
    //다이어리 생성 함수: textarea 없으면 textarea 생성
    $(document).on('click','#registerBtn',function(){
        const folderId = $('.folderOn').data('id');
        diaryText = $('#diary textarea');
            if(diaryText.length === 0){
                $('.diaryContent').empty();
                $('#diary').append(`<select id="diaryStatus">
                    <option value="33">전체 공개</option>
                    <option value="32">일촌 공개</option>
                    <option value="31">비공개</option>
                </select><textarea></textarea>`)
                return;
            }
        if(diaryText.val().trim().length === 0){
            alert('글을 작성해주세요!');
            return;
        }
        addDiaryContent(folderId,diaryText.val());
    });
    $(document).on('click','#folderAddBtn',function(){
        $('#folderNameWrap').toggle();
        $('#statusSelect').toggle();
    });
    $(document).on('keydown','.folderInput',function(e){
        const text = $('.folderInput').val().trim();
        const availStatus = $('#statusSelect').val();
        if(e.keyCode == 13 && text !== ""){
            addDiaryFolder(availStatus,text);
        }
    });
    $(document).on('click','.folderInputBtn',function(){
        const text = $('.folderInput').val().trim();
        const availStatus = $('#statusSelect').val();
        if(text !== ""){
            addDiaryFolder(availStatus,text);
        }
    })
    $(document).on('click','#folderName',function(){
        const folderId = $(this).data('id');

    });
    $(document).on('click', '.hompiFolderName button', function(){
        const btn = $(this);
        const folderId = btn.data('id');
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
});

let today;
let diaryText;
let month;
let dayName = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
function clickMenu(li){
    const clickLi = li;
    $(clickLi).addClass('on');
    $('#mainWrapBackground li').not(li).removeClass('on');
}

function moveDiary() {
     $.ajax({
         type: "GET",
         url: "/mini-hompi/diary",
         dataType: "html",
         success: function (data) {
             $("#rightWrap .rightMainWrap").empty();
             $("#rightWrap .rightMainWrap").html(data);
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
                rowHtml += `<td${style} data-id="">${day}</td>`;
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
            $('#statusSelect').hide();
            $('#folderNameWrap').hide();
            $('.folderInput').val('');
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
    $.ajax({
        type: 'GET',
        url: '/api/folder/read/' + hompiOwnerId + '/01',
        dataType: 'json',
        success: function(folderList){
            let code = '<div class="hompiFolderWrap">';
            folderList.forEach(function(folderDTO,index){
                code += '<div class= "hompiFolderName"><button data-id="'+folderDTO.folderId
                         + '"><img src="/static/images/common/folder.png">'
                         + " " +folderDTO.folderName + '</button></div>';
            })
            code += "</div>";
            $('#folderWrap').append(code);
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
    const availStatus = $('#diaryStatus').val();
    $.ajax({
        type: 'POST',
        url: '/api/minihompi/addDiary/' + folderId + '/' +hompiOwnerId,
        data: {availStatus: availStatus,diaryContent: diaryContent},
        dataType: 'json',
        success: function(response){
            alert('저장 완료');
            $('.post-container').children().remove();
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
        url: '/api/minihompi/getDiary/' + diaryId +'/' + hompiOwnerId,
        dataType: 'json',
        success: function(response){
            $('.post-container').append(`
                <div data-avail="${response.availStatus}" class="diaryContent">${response.diaryContent}</div>
            `)
        },
        error: function(error){
            alert('이 글을 볼 권한이 없습니다.')
        }
    })
}

function checkStatus(){
    $.ajax({
        type: 'GET',
        url: '/mini-hompi/diary/checkStatus/' + hompiOwnerId,
        dataType: 'json',
        success: function(response){
            if(response === false){
                $('#registerBtn').remove();
                $('.post-actions').remove();
            }
        },
            error: function(error){
                console.error(error);
            }
    })
}
