/** 이벤트 리스너 등록 **/
$(document).ready(function () {

 $(".navClick").click(function () {
  var className =  $(this).attr("class");
  className = className.substr(9);

  console.log("className : " + className);
  console.log(className.substring(9));

  $("a.aTag").css({ "color": "#333333"});
  $("a."+className).css({ "color": "#ff8000"});
  /* 쪽지 보내기*/
  if (className === "sendMsgFrm") { $("#popupMessageMain").load("/sample/popupSendMessage"); }
  /* 받은 쪽지함*/
  if (className === "receiveMsgbox") {
   $("#popupMessageMain").load("/sample/popupReciveMessageBox");

  }
  /* 보낸 쪽지함*/
  if (className === "sendMsgBox") {
   $("#popupMessageMain").load("/sample/popupSendMessageBox");

  }

 });

});

/** 쪽지 팝업창 설정 **/
function openPopupMessage() {
 var popupW = 650;
 var popupH = 650;
 var left = Math.ceil((window.screen.width - popupW) / 2);
 var top = Math.ceil((window.screen.height - popupH) / 2);

 var popup = window.open('/sample/popupMessage',
     '쪽지 보내기',
     'width=' + popupW + ',height=' + popupH + ',left=' + left + ',top=' + top);
}

