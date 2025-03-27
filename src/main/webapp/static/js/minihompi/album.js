$(document).ready(function(){
    const url = window.location.pathname;
    const hompiId1 = url.split('/').pop();

    $(document).on('click', '#saveBtn',function(){
        console.log('click');
        let url = `/api/minihompi/saveAlbum/${hompiId1}`;
        let albumData = {
            "albumTitle" : '몰라',
            "availStatus" : 32,
            "contents" : '이렇게하면되겠지제발돼라얍'
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