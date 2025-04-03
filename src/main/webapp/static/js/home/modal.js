$(document).ready(function() {
    // "내용보기" 버튼 클릭 시 모달 띄우기
    $("#showConfirm").on("click", function(e) {
        e.preventDefault();
        modal('dialog');
    });

    // 모달 열기
    function modal(id){
        $("#" + id).fadeIn();
    }

    // 모달 닫기
    $(document).on("click", "#closeImg", function(e) {
        e.preventDefault();
        closeModal();
    });

    $(document).on("click", ".dialog", function() {
        closeModal();
    });

    function closeModal() {
        $(".dialog").fadeOut();
    }

    $(document).on("click", ".inner", function(e) {
        e.stopPropagation();
    });

    // 체크박스 동기화
    $(".checkbox").on("change", function(){
        $(".checkbox").prop("checked", $(this).prop("checked"));
        closeModal();
    });
});