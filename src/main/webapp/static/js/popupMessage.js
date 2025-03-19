/** 이벤트 리스너 등록 **/
$(document).ready(function () {

 $(".NavClick").click(function () {
  var className =  $(this).attr("class");
  className = className.substr(9);
  console.log("className : " + className);
  console.log(className.substr(9));

  $("a.aTag").css({ "color": "#333333"});
  $("a."+className).css({ "color": "#ff8000"});

 });

});

/** 쪽지 팝업창 설정 **/
function openPopupMessage() {
 var popupW = 500;
 var popupH = 500;
 var left = Math.ceil((window.screen.width - popupW) / 2);
 var top = Math.ceil((window.screen.height - popupH) / 2);

 var popup = window.open('/mini-hompi/newmessage',
     '쪽지 보내기',
     'width=' + popupW + ',height=' + popupH + ',left=' + left + ',top=' + top);
}

/*function PopupMassageNav(click_LI) {
 var MentText  = "";
 var selectClass = $(this).attr("class");
 if (click_LI == "SendMsgFrm") {
  MentText = "쪽지 보내기";
  $("#popupMessageMain").load("/sample/popupSendMessage");

 $(this).children().css({"color": "#FF8000"});

 }
 if (click_LI == "ReceiveMsgbox") {
  MentText = "받은 쪽지함";
  $("#popupMessageMain").load("/sample/popupReciveMessageBox");
 }
 if (click_LI == "sendMsgBox") {
  MentText = "보낸 쪽지함";
  $("#popupMessageMain").load("/sample/popupSendMessageBox");
 }
 console.log("MentText : " + MentText);

}*/