$(document).ready(function(){

 const bgmList=[
      {artist: "검", title: "뒤에서", path:"/static/audio/검-뒤에서.mp3"},
      {artist: "김팀원",title: "SQLD_시험의_슬픔",  path:"/static/audio/김팀원-SQLD_시험의_슬픔.mp3"},
      {artist: "누군가",title: "네이트_클럽", path:"/static/audio/누군가-네이트_클럽.mp3"},
      {artist: "사카린",title: "화분", path:"/static/audio/사카린-화분.mp3"},
      {artist: "아아",title: "개발은_재밌어,_문서는_빼고", path:"/static/audio/아아-개발은_재밌어,_문서는_빼고.mp3"},
      {artist: "오류",title: "개되방_들여쓰기_빌런", path:"/static/audio/오류-개되방_들여쓰기_빌런.mp3"},
      {artist: "토끼",title: "꿈꾸는_토끼", path:"/static/audio/토끼-꿈꾸는_토끼.mp3"}
    ];
  const audio = $('#bgmPlayer')[0];
  let bgmIndex = 0;
  let tmp = 0; //음소거 전 노래 음량;
  const artistName = bgmList.map(bgm => bgm.artist); //가수 이름 가져오기
  const fileNames = bgmList.map(bgm => bgm.title); //노래 제목

function playSong(index){
    const track = bgmList[index];
    $('#bgmPlayer source').attr('src',track.path)
    audio.load();
    audio.play();

    $('#bgmTitle').text(track.artist +"-"+ track.title);
}

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
      if(!audio.paused){
        startRotation();
      }
    }
  });
}

function playCheckBgm(){
    const nowPlayBgm = $('#trackListWrap p')[bgmIndex];
    $('#trackListWrap p').not(nowPlayBgm).css("color","#333");
    $(nowPlayBgm).css('color',"#FF8000");
}

  playSong(bgmIndex);
  $('#pauseBtn img').on('click', function(){
    if(audio.paused){
      audio.play();
      $(this).attr('src','/static/images/common/minimi/pauseBtn.png');
      startRotation();
      playCheckBgm();
    } else {
      audio.pause();
      $('#recordImg').stop(true, true);
      $(this).attr('src','/static/images/common/minimi/playBtn.png');
    }
  });
  //노래 재생 끝날 시 다음 bgmList 다음 index 노래 실행
  audio.addEventListener('ended',function(){
    bgmIndex++;
    if(bgmIndex >= bgmList.length){
        bgmIndex = 0;
    }
    playSong(bgmIndex);
    playCheckBgm();
  });

  $('#prevBtn').on('click',function(){
    bgmIndex--;
    if(bgmIndex < 0){
        bgmIndex = bgmList.length - 1;
    }
    playSong(bgmIndex);
    playCheckBgm();
  });

  $('#nextBtn').on('click',function(){
    bgmIndex++;
    if(bgmIndex >= bgmList.length){
        bgmIndex = 0;
    }
    playSong(bgmIndex);
    playCheckBgm();
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

 // 음소거 전 노래 음량
  $('#volumeBtn').on('click', function(){
     const vol = $('#volumeSlider').val();
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
    const clickBtn = this;
    $(clickBtn).toggleClass('access');
    $('#trackContainer button').not(clickBtn).removeClass('access');
    if($(clickBtn).hasClass('access')){
        let code;
        if($(clickBtn).attr('id') === "lyricsBtn"){
            code = "<h1>노래 가사</h1>";
        } else if($(clickBtn).attr('id') === "listBtn"){
            code = "<h1>노래 리스트</h1><hr>";
            if(fileNames.length !== 0){
            fileNames.forEach(function(title, index){
                code += "<p>" + title+ "</p>";
            });
          }else{
            code += "현재 등록된 노래가 없습니다!"
          }
       }
        $('#trackListWrap').fadeIn(0).html(code);
        playCheckBgm();
    } else {
        $('#trackListWrap').fadeOut(0);
    }
  });
});

