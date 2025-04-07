$(document).ready(function () {

    $(".msgSendBtn").click(function (){
        let sendTextArea = $("#sendTextArea").val();
        let minihompiMsgFrmData = $("#minihompiMsgFrm").serialize();

        if (sendTextArea.length === 0){
            alert("쪽지 내용을 입력해 주세요.");
            $("#sendTextArea").focus();
        } else {
            $.ajax({
                url: "/mini-hompi/SendMessageProc",
                type: "POST",
                data: minihompiMsgFrmData,
                success: function (response) {
                    alert(response);
                    window.close();
                },
                error: function (failResponse) {
                    alert(failResponse);
                    window.close();
                }
            });
        }
    });

});