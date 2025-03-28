
const JSON_CONTENT_TYPE = "application/json; charset=UTF-8";

// Ajax function
function ajax(url, method, data, contentType, success, error) {
    $.ajax({
        url: url,
        method: method,
        data: data && typeof data === 'object' ? JSON.stringify(data) : data,
        contentType: contentType,
        success: success,
        error: error
    });
}

function fetchThen(url, success, error) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`통신 에러 상태코드: ${response.status}`);
            }
            return response.json();
        })
        .then(data => success(data))
        .catch(err => error(err));
}

function getAjax(url, success, error) {
    ajax(url, 'GET', null, null, success, error);
}

function postAjax(url, data, success, error) {
    ajax(url, 'POST', data, JSON_CONTENT_TYPE, success, error);
}

function queryPostAjax(url, query, success, error) {
    ajax(url + query, 'POST', null, null, success, error);
}

function putAjax(url, data, success, error) {
    ajax(url, 'PUT', data, JSON_CONTENT_TYPE, success, error);
}

function deleteAjax(url, success, error) {
    ajax(url, 'DELETE', null, JSON_CONTENT_TYPE, success, error);
}

export { getAjax, postAjax, putAjax, deleteAjax, fetchThen, queryPostAjax };
