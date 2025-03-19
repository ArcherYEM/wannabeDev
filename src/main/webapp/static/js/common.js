$(function (){
   getClientIp();
});

// 클라이언트 IP 가져오기
function getClientIp() {
   $.ajax({
      url      : '/getIp',
      method   : 'GET',

      success  : function(result){
         if (result){
            $('#ip').text("접속 IP : "+result);
         } else {
            console.log("ip 수집불가");
         }
      },
      error    : function(error){
         console.log("ip 수집중 에러 발생", error)
      }
   });
}
