console.log('후두1');
$(document).ready(function(){
    console.log('후두2');
    const url = window.location.pathname;
    const hompiId1 = url.split('/').pop();
    console.log('url: '+ url);
    console.log('hompiId1: ' + hompiId1);
    console.log($('#saveBtn'));
    if ($('#saveBtn').length > 0) {
        console.log("✅ saveBtn이 존재합니다.");
    } else {
        console.log("❌ saveBtn이 존재하지 않습니다.");
    }

    $(document).on('click', '#saveBtn',function(){
        console.log('click');
        let url = `/api/minihompi/saveAlbum/${hompiId1}`;
        let albumData = {
            "albumName" : '몰라',
            "availStatus" : 32
        }
        $.ajax({
             type: "POST",
             url: url,
             contentType: "application/json",
             data: JSON.stringify(albumData),
             success: function(response){
             },
             error: function(error){
             }
        });
    });
});

//function saveAlbum(albumName, availStatus){
//    let albumData = {
//        "albumName": albumName.val().trim(),
//        "availStatus": availStatus.val().trim()
//    }
//
//    $.ajax({
//    })
//}