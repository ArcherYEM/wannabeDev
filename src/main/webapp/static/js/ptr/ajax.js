
// Ajax function
function ajax(url, method, data, success, error) {
    $.ajax({
        url: url,
        method: method,
        data: data,
        contentType: "application/json; charset=UTF-8",
        success: success,
        error: error
    });
}

function getAjax(url, success, error) {
    ajax(url, 'GET', null, success, error);
}

function postAjax(url, data, success, error) {
    ajax(url, 'POST', data, success, error);
}

function putAjax(url, data, success, error) {
    ajax(url, 'PUT', data, success, error);
}

function deleteAjax(url, success, error) {
    ajax(url, 'DELETE', null, success, error);
}

export { getAjax, postAjax, putAjax, deleteAjax };
