
// swal popup

function swalPopup(title, text, icon, confirmButtonText, cancelButtonText) {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText
    });
}

export { swalPopup };
