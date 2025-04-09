// api endpoint url

const API_URL = '/api';

// API URL 객체로 정의
const API = {
    BASE_URL: API_URL,
    LOGIN: `${API_URL}/user/login`,
    LOGOUT: `${API_URL}/user/logout`,
    MINI_HOMPI: `/userInfo`,
    FORTUNE: `/main/fortune`,
    WEATHER: `/weather/location`,
    PRODUCT: `${API_URL}/products/top6`,
    NEWS: "/api/news/googleNews",
    SLIDE_BANNER: "/imageSlide2",
    FIND_USERID: `${API_URL}/user/findId`,
    SEND_CODE: `${API_URL}/user/sendCode`,
    CHECK_CODE: `${API_URL}/user/checkAuthCode`,
    CHANGE_PASSWORD: `${API_URL}/user/changePassword`,

};

export default API;
