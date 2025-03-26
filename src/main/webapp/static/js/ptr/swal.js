
// swal popup
function swalPopup(title, text, icon, confirmButtonText, cancelButtonText) {
    // promise 객체를 반환
    return Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText
    });
}

export { swalPopup };
