$(document).ready(function(){
  const audio = $('#bgmPlayer')[0];
  $('#pauseBtn img').on('click', function(){
    $('#recordImg').stop(true, true);
    if(audio.paused){
      audio.play();
      $(this).attr('src','/static/images/common/minimi/pauseBtn.png');
      startRotation();
    } else {
      audio.pause();
      $(this).attr('src','/static/images/common/minimi/playBtn.png');
    }
  });
  $('#stopBtn img').on('click', function(){
    audio.pause();
    audio.currentTime = 0;
    $('#recordImg').stop(true, true);
    $('#pauseBtn img').attr('src','/static/images/common/minimi/playBtn.png');
  });
  $('#volumeSlider').on('input change', function(){
    audio.volume = $(this).val();
  });
  let tmp = 0;  //음소거 전 노래 음량
  $('#volumeBtn').on('click', function(){
     let vol = $('#volumeSlider').val();
     if(audio.volume === 0){
        $('#volumeSlider').val(tmp);
        audio.volume = tmp;
     }else{
        tmp = vol;
        $('#volumeSlider').val(0);
        audio.volume = 0;
     }
  });
  $('#listBtn').on('click', function(){
        $('#trackListWrap').toggleClass('active');
        if($('#trackListWrap').hasClass('active')){
            $('#trackListWrap').fadeIn(0);
        }else{
            $('#trackListWrap').fadeOut(0);
        }
  });
});
//노래 재생시 recordImg 회전
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

