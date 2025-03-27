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


};

// 객체 전체를 export
export default API;
