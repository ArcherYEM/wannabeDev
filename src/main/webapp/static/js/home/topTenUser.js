// 미니홈피 팝업 스펙
const HOMPI_WIDTH   = 1280;
const HOMPI_HEIGHT  = 720;
const HOMPI_LEFT    = Math.ceil((window.screen.width - HOMPI_WIDTH) / 2);
const HOMPI_TOP     = Math.ceil((window.screen.height - HOMPI_HEIGHT) / 2);

$(document).ready(function(){
    getTopTenUser();

    $('.favoriteItem img').on('click',function(){
        const hompiId = $(this).data('id');
        if(!hompiId){
            return;
        }
        openPop(hompiId);
    })
});

// 미니홈피 팝업 오픈 함수
function openPop(hompiId) {
    const specs = `width=${HOMPI_WIDTH},height=${HOMPI_HEIGHT},left=${HOMPI_LEFT},top=${HOMPI_TOP}`;
    window.open(`/mini-hompi/main/${hompiId}`, 'mini-hompi', specs);
}

//인기 급상승 유저 조회
function getTopTenUser(){
    $.ajax({
        type: 'GET',
        url: '/api/popular-user/read',
        dataType: 'json',
        success: function(response){
            response.forEach(function(user,index){
                const favoriteItem = $('.favoriteItem').eq(index);
                favoriteItem.find('.name').text(user.name);
                favoriteItem.find('.todayNum').text(user.todayCnt);
                favoriteItem.find('img').attr('data-id',user.hompiId);
            })
            for(var i = response.length; i < 10; i++){
                const favoriteItem = $('.favoriteItem').eq(i);
                favoriteItem.find('.name').text('정보 없음');
                favoriteItem.find('.todayNum').text('0');
            }
        },
        error: function(error){
            console.error(error);
        }
    })
}