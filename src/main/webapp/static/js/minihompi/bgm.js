$(document).ready(function(){
       setBgmList();
      $('#trackListWrap').on('click','p', function(){
        const index = $('#trackListWrap p').index(this);
        $('#pauseBtn img').attr('src','/static/images/common/minimi/pauseBtn.png');
        bgmIndex = index;
        playSong(index);
        if(!audio.paused){
            startRotation();
        }
      });
      $('#pauseBtn img').on('click', function(){
        if(audio.paused){
          checkJukeboxPlay();
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
                code = "<h1>노래 가사</h1><hr>";
                if(bgmList.length > 0){
                    code += '<div id="bgmLyrics">' + bgmList[bgmIndex].lyrics + '</div>';
                }else{
                    code += "현재 등록된 노래가 없습니다!"
                }
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

        const hompiUriPath = window.location.pathname.split('/');
        const hompiOwnerId = hompiUriPath[3];

        let bgmList=[];

        const audio = $('#bgmPlayer')[0];
        let bgmIndex = 0;
        let tmp = 0; //음소거 전 노래 음량;

        let artistName = [];
        let fileNames = [];

    function setBgmList(){
        const useYn = 'Y';
        $.ajax({
            type: "GET",
            url: "/mini-hompi/user-bgm/" + hompiOwnerId,
            contentType: "application/json",
            data: {useYn: useYn},
            dataType: "json",
            success:function(response){
                response.forEach(function(bgmDTO){
                    bgmList.push(bgmDTO);
                });
                artistName = bgmList.map(bgm => bgm.artist);
                fileNames = bgmList.map(bgm => bgm.title);
                /*playSong(bgmIndex);*/
            },
            error: function(error){
                console.error(error);
            }
        });
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

    function playSong(index){
        if(bgmList.length === 0){
            return;
        }
        const track = bgmList[index];
        $('#bgmPlayer source').attr('src',track.path)
        audio.load();
        audio.play();
        playCheckBgm();
        changeLyrics();
        checkJukeboxPlay();
        $('#pauseBtn img').attr('src','/static/images/common/minimi/pauseBtn.png');
        $('#bgmTitle').text(track.artist +"-"+ track.title);
    }

    function changeLyrics(){
        $('#bgmLyrics').html(bgmList[bgmIndex].lyrics);
    }

    function checkJukeboxPlay(){
        if(jukebox){
            jukebox.pause();
            jukebox = null;
        }
    }



