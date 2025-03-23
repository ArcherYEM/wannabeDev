$(document).ready(function(){

   $(document).on('click', '#moveJukebox1', function() {
            clickMenu(this);
            getBgmCount();
            moveJukebox();
        });
    $(document).on('click','.listenBtn',function(){
        audio.pause();
        $('#pauseBtn img').attr('src','/static/images/common/minimi/playBtn.png');
        if(jukebox){
            jukebox.pause();
            jukebox = null;
        }
        let jukeboxList =[];
        let jukeboxIndex = 0;
        $('.bgmTable tbody input[type="checkbox"]:checked').each(function(){
            const hiddenPath = $(this).closest('tr').find('input.pathInput').val();
            if(!hiddenPath){
                return true;
            }
            jukeboxList.push(hiddenPath);
        })
        if(jukeboxList.length > 0){
            jukebox = new Audio(jukeboxList[jukeboxIndex]);
            jukebox.play();

            jukebox.addEventListener('ended',function(){
                jukeboxIndex++;
                if(jukeboxIndex < jukeboxList.length){
                    jukebox = new Audio(jukeboxList[jukeboxIndex]);
                }else{
                    console.log('jukebox 재생이 끝났습니다');
                }
            });
        }
    });

    $(document).on('click','.backBgmBtn', function(){
        bgmIds = [];
        $('.bgmTable tbody input[type="checkbox"]:checked').each(function(){
        const hiddenPath = $(this).closest('tr').find('input.bgmId').val();
        if(!hiddenPath){
            return true;
        }
            bgmIds.push(hiddenPath);
        })
        if(bgmIds.length > 0){
            setBackGroundBgm(bgmIds);
        }
    });

    $(document).on('click','.pageNumber button',function(){
        pageNum = $('.pageNumber button').index(this);
        clickPage(pageNum);
    });
    $(document).on('click','.pagePrevBtn', function(){
       if(pageNum === 0){
            return;
       }
       pageNum--;
       clickPage(pageNum);
    });
    $(document).on('click','.pageNextBtn', function(){
        if(pageCount === pageNum + 1){
            return;
        }
        pageNum++;
        clickPage(pageNum);
    });
    $(document).on('click','.bgmAllCheck', function(){
        const checkboxes = $('.bgmTable input[type="checkbox"]');
        let checkedCount = 0;
        checkboxes.each(function(){
            if($(this).prop('checked')){
                checkedCount++;
            }
        });
        if(checkedCount + 1 === checkboxes.length){
            checkboxes.prop('checked',false);
        }else{
            checkboxes.prop('checked',true);
        }
    });
});

let bgmIds;
let jukebox;
let pageNum = 0;
let pageCount = 0;
//메뉴 바 색상 변경
function clickMenu(li){
    const clickLi = li;
    $(clickLi).addClass('on');
    $('#mainWrapBackground li').not(li).removeClass('on');
}

function moveJukebox() {
        $.ajax({
            type: "GET",
            url: "/mini-hompi/jukebox",
            dataType: "html",
            success: function (data) {
                $("#rightWrap .rightMainWrap").children().remove();
                $("#rightWrap .rightMainWrap").html(data);
                clickPage(pageNum);
            },
            error: function (xhr, status, error) {
                alert("페이지 로딩에 실패했습니다.\n오류내용: " + error);
            }
        });
    }

//bgmList는 bgm.js에서 선언한 배열
function setPageCount(bgmCount){
    pageCount = Math.ceil(bgmCount / 10);
    for(let i = 1; i <= pageCount; i++){
        const pageBtn = $('<button>' + i + '</button>');
        $('.pageNumber').append(pageBtn);
    };
    $('.pageNumber button').eq(0).css('color','red');
}

function getBgmCount(){
    $.ajax({
        type: "GET",
        url: "/mini-hompi/user-bgm/count/" + hompiOwnerId,
        contentType: "application/json",
        dataType: "json",
        success: function(response){
            setPageCount(response);
        },
        error: function(error){
            console.error(error);
        }
    });
}

function clickPage(pageNum){
    $('.bgmAllCheck input[type="checkbox"]').prop('checked',false);
    const clickBtn = $('.pageNumber button')[pageNum];
    const offset = pageNum * 10;
    $('.pageNumber button').not(clickBtn).css('color','#333');
    $(clickBtn).css('color','red');
        $.ajax({
             type: "GET",
             url: "/mini-hompi/user-bgm/" + hompiOwnerId,
             contentType: "application/json",
             data: {offset: offset},
             dataType: "json",
             success: function(response){
                setTableBgm(response);
             },
             error: function(error){
                  console.error(error);
             }
         });
}

function setTableBgm(data){
    $('.jukeboxTableBody').children().remove();
    if(data.length === 0){
    $('.jukeboxTableBody').append(`
        <tr>
            <td colspan="4" style="text-align: center;">저장 되어 있는 노래가 없습니다</td>
        </tr>
    `)
        return;
    }
    const pageIndex = pageNum * 10;
    data.forEach(function(bgmDTO, index){
        $('.jukeboxTableBody').append(`
            <tr>
                <td><input type="checkbox"></td>
                <td style="display :none;"><input type="hidden" class="bgmId" value="${bgmDTO.id}"></td>
                <td>${index + 1 + pageIndex}</td>
                <td>${bgmDTO.title}</td>
                <td>${bgmDTO.artist}</td>
                <td style="display :none;"><input type="hidden" class="pathInput" value="${bgmDTO.path}"></td>
            </tr>
        `);
    });
}

function setBackGroundBgm(bgmIds){
    $.ajax({
        type: "POST",
        url: "/mini-hompi/user-bgm/use-yn/" + hompiOwnerId,
        data: {bgmIds: bgmIds},
        dataType: 'json',
        traditional: true,
        success: function(response){
            if(response === false){
                alert('이미 등록 되어있는 BGM입니다');
                return;
            }
            alert('BGM 플레이어에 저장 되었습니다');
        },
        error: function(error){
            console.error(error);
        }
    });
}

