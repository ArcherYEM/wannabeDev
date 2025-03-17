$(document).ready(function(){
  const audio = $('#bgmPlayer')[0];
  bgmIndex = 0;

  playSong(bgmIndex);
  $('#pauseBtn img').on('click', function(){
    if(audio.paused){
      audio.play();
      $(this).attr('src','/static/images/common/minimi/pauseBtn.png');
      startRotation();
    } else {
      audio.pause();
      $('#recordImg').stop(true, true);
      $(this).attr('src','/static/images/common/minimi/playBtn.png');
    }
  });

  $('#bgmPlayer')[0].addEventListener('ended',function(){
    bgmIndex++;
    if(bgmIndex >= bgmList.length){
        bgmIndex = 0;
    }
    playSong(bgmIndex);
  });

  $('#prevBtn').on('click',function(){
    bgmIndex--;
    if(bgmIndex <= 0){
        bgmIndex = bgmList.length;
    }
    playSong(bgmIndex);
  });

  $('#nextBtn').on('click',function(){
    bgmIndex++;
    if(bgmIndex >= bgmList.length){
        bgmIndex = 0;
    }
    playSong(bgmIndex);
  });

  $('#stopBtn img').on('click', function(){
    audio.pause();
    audio.currentTime = 0;
    $('#recordImg').stop(true, true);
    $('#pauseBtn img').attr('src','/static/images/common/minimi/playBtn.png');
  });

  $('#volumeSlider').on('input change', function(){
    audio.volume = $(this).val();
    if(audio.volume === 0){
        $('#volumeBtn img').attr('src','/static/images/common/minimi/volume0.png')
    }else{
        $('#volumeBtn img').attr('src','/static/images/common/minimi/volume.png')
    }
  });

  let tmp = 0;  // 음소거 전 노래 음량
  $('#volumeBtn').on('click', function(){
     let vol = $('#volumeSlider').val();
     if(audio.volume === 0){
        $('#volumeSlider').val(tmp);
        audio.volume = tmp;
        $('#volumeBtn img').attr('src','/static/images/common/minimi/volume.png')
     } else {
        tmp = vol;
        $('#volumeSlider').val(0);
        $('#volumeBtn img').attr('src','/static/images/common/minimi/volume0.png')
        audio.volume = 0;
     }
  });
  $('#trackContainer').on('click', 'button', function(){
    var clickBtn = this;
    $(clickBtn).toggleClass('access');
    $('#trackContainer button').not(clickBtn).removeClass('access');

    if($(clickBtn).hasClass('access')){
        var code;
        if($(clickBtn).attr('id') === "lyricsBtn"){
            code = "<h1>노래 가사</h1>";
        } else if($(clickBtn).attr('id') === "listBtn"){
            code = "<h1>노래 리스트</h1>";
        }
        $('#trackListWrap').fadeIn(0);
        $('#trackListWrap h1').html(code);
    } else {
        $('#trackListWrap').fadeOut(0);
    }
  });
});

 var bgmList=[
      "/static/audio/검-뒤에서.mp3",
      "/static/audio/김팀원-SQLD_시험의_슬픔.mp3",
      "/static/audio/누군가-네이트_클럽.mp3",
      "/static/audio/사카린-화분.mp3",
      "/static/audio/아아-개발은_재밌어,_문서는_빼고.mp3",
      "/static/audio/오류-개되방_들여쓰기_빌런.mp3",
      "/static/audio/토끼-꿈꾸는_토끼.mp3"
    ];

function playSong(index){
    $("#bgmPlayer source").attr('src', bgmList[index]);
    const bgmPlayer = $('#bgmPlayer')[0];
    bgmPlayer.load();
    bgmPlayer.play();

    let bgmValue = bgmList[index];
    var startIndex = bgmValue.lastIndexOf("/") + 1;
    var endIndex = bgmValue.lastIndexOf(".mp3");
    $('#bgmTitle').text(bgmValue.substring(startIndex, endIndex));
}
    /*var fileNames = bgmList.map(function(path){
        var startIndex = path.lastIndexOf("/") + 1;
        var endIndex = path.lastIndexOf(".mp3");
        return path.substring(startIndex, endIndex);
    });*/

// 노래 재생시 recordImg 회전
function startRotation(){
  $({deg: 0}).animate({deg: 360}, {
    duration: 2000,
    step: function(now){
      $('#recordImg').css({
        transform: 'rotate(' + now + 'deg)'
      });
    },
    complete: function(){
      if(!$('#bgmPlayer')[0].paused){
        startRotation();
      }
    }
  });
}
