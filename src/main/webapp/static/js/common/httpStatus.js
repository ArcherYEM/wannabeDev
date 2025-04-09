// HTTP 상태 코드 정의
const HTTP_STATUS = {
    OK: {
        code: 200,
        message: '요청이 성공적으로 처리되었습니다.'
    },
    BAD_REQUEST: {
        code: 400,
        message: '잘못된 요청입니다.'
    },
    NOT_FOUND: {
        code: 404,
        message: '요청한 리소스를 찾을 수 없습니다.'
    },
    SERVER_ERROR: {
        code: 500,
        message: '서버 내부 오류가 발생했습니다.'
    }
};

// 객체 전체를 export
export default HTTP_STATUS;
