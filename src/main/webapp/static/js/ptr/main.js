// main home.js
import API from './api.js';
import VIEW from "./page.js";
import { getAjax, postAjax, putAjax, deleteAjax, fetchThen } from "./ajax.js";
import { swalPopup } from "./swal.js";

// =========== 변수 레이어 ===========

// 메뉴 관련 요소
const miniHompi = $("#miniHompi, #miniHompi2");
const giftPage = $("#giftPage, #giftPage2");
const cartPage = $("#cartPage, #cartPage2");
const noticePage = $("#noticePage, #noticePage2");
const aboutUsPage = $("#aboutUsPage, #aboutUsPage2");
const signUpButtons = $("#signupBtn, #signupBtn2");
const dotoriRechargeBtn = $("#rechargePageBtn");

// 슬라이드 배너
const slideBanner = $("#slideBanner");

// 미니홈피 팝업 스펙
const HOMPI_WIDTH = 1280;
const HOMPI_HEIGHT = 720;
const HOMPI_LEFT = Math.ceil((window.screen.width - HOMPI_WIDTH) / 2);
const HOMPI_TOP = Math.ceil((window.screen.height - HOMPI_HEIGHT) / 2);

// 오늘의 운세
const todayLucky = $("#todayLucky");

// 날씨 관련 요소
const weatherIcon = $('#weatherIcon');
const locationEl = $('#location');
const weatherText = $('#weather-text');
const rain = $('#rain');
const temperature = $('#temperature');

// 영화 영역
const movieWrapper = $('#movieWrapper');

// 상품 영역
const productContainer = $('#product-container');
const categoryButtons = $('.categoryBtn');
let currentCategory = '01'; // 기본 카테고리 (미니미)

// 뉴스 영역
const newsList = $('#newsList');

// 영화 템플릿
const movieTemplate = `
<div class="movie">
    <div class="movie_poster">
        <img src="{poster}" alt="{title}">
    </div>
    <div class="movie_info">
        <h3>{title}</h3>
        <p>{rank}</p>
        <p>{genre}</p>
        <p>{directorNm}</p>
        <p>{repRlsDate}</p>
        <p>{day}</p>
    </div>
</div>`;

// =========== 실행 레이어 ===========
$(document).ready(() => {
    // 메뉴 클릭 이벤트 설정
    componentClickEvent();

    // 슬라이드 배너 렌더링
    renderSlideBanner();

    // 운세 조회
    getFortune();

    // 날씨 조회
    getWeather();

    fetchNews();

    void getMovie();

    // 카테고리 버튼 이벤트 (active 클래스 유지 및 상품 조회)
    categoryButtons.on('click', function () {
        categoryButtons.removeClass('active');
        $(this).addClass('active');
        const selectedCategory = $(this).attr('id').split('-')[1];
        fetchTopProducts(selectedCategory);
    });

    // 페이지 로딩 시 기본 카테고리 상품 조회
    fetchTopProducts(currentCategory);
});

// =========== 함수 레이어 ===========

// 메뉴 클릭 이벤트: 각 요소 클릭 시 지정된 페이지로 이동하거나 기능 실행
function componentClickEvent() {
    miniHompi.click(() => openPop());
    giftPage.click(() => (location.href = VIEW.GIFT_SHOP));
    cartPage.click(() => (location.href = VIEW.CART));
    noticePage.click(() => (location.href = VIEW.NOTICE));
    aboutUsPage.click(() => (location.href = VIEW.ABOUT_US));
    signUpButtons.click(() => (location.href = VIEW.SIGN_UP));
    dotoriRechargeBtn.click(() => (location.href = VIEW.RECHARGE));
}

// 미니홈피 팝업 오픈 함수
function openPop() {
    const specs = `width=${HOMPI_WIDTH},height=${HOMPI_HEIGHT},left=${HOMPI_LEFT},top=${HOMPI_TOP}`;
    getAjax(
        API.MINI_HOMPI,
        (response) => {
            if (response.hompiId) {
                window.open(`/mini-hompi/main/${response.hompiId}`, 'mini-hompi', specs);
            } else {
                swalPopup('미니홈피', '미니홈피 정보를 불러오는데 실패했습니다.', 'error', '확인');
            }
        },
        (error) => {
            swalPopup('미니홈피', '로그인 후 열어주세요', 'error', '확인')
                .then(() => {
                    location.href = "/";
                });
        }
    );
}

// 슬라이드 배너 로드
function renderSlideBanner() {
    slideBanner.load("imageSlide");
}

// 오늘의 운세 조회
function getFortune() {
    getAjax(
        API.FORTUNE,
        (response) => {
            todayLucky.text(response);
        },
        (error) => {
            console.error("AJAX 요청 실패:", error);
            todayLucky.text("오늘의 운세를 불러오는데 실패했습니다.");
        }
    );
}

// 날씨 조회: 위치 정보로 날씨 데이터 요청 후 UI 업데이트
function getWeather() {
    getLocation().then(({ lat, lon }) => {
        // GET 파라미터로 위도, 경도 추가
        const weatherUrl = `${API.WEATHER}?lat=${lat}&lon=${lon}`;
        getAjax(
            weatherUrl,
            (response) => {
                weatherUI(response, lat, lon);
            },
            (error) => {
                console.error("AJAX 요청 실패:", error);
            }
        );
    });
}

// 위치 정보 획득 (Promise 반환)
function getLocation() {
    return new Promise((resolve) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    });
                },
                (error) => {
                    console.error("위치 정보를 불러오는데 실패했습니다.", error);
                    // 기본 좌표 (서울)
                    resolve({ lat: 37.5665, lon: 126.9780 });
                },
                { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
            );
        } else {
            console.error("위치 정보를 지원하지 않습니다.");
            resolve({ lat: 37.5665, lon: 126.9780 });
        }
    });
}

// 날씨 UI 업데이트 및 역지오코딩을 통한 지역명 표시
function weatherUI(data, lat, lon) {
    const translatedWeather = translateWeatherToKorean(data.message);
    weatherIcon.attr('src', getWeatherIcon(data.message)).attr('alt', translatedWeather);
    locationEl.text('날씨 정보를 가져오는 중...');
    weatherText.text(translatedWeather);
    rain.text(`, 강수 ${data.rain}%`);
    temperature.text(`${data.temperature}° C`);

    fetch(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}`)
        .then((response) => response.json())
        .then((locationData) => {
            const city = locationData.address.city || "현재 위치";
            const translatedCity = translateCityToKorean(city);
            locationEl.text(translatedCity);
        })
        .catch((error) => {
            console.error("역지오코딩 실패:", error);
            locationEl.text('위치 정보 없음');
        });
}

// 날씨 아이콘 반환
function getWeatherIcon(weather) {
    const iconMap = {
        "Clear": "https://cdn-icons-png.flaticon.com/512/869/869869.png",
        "Clouds": "https://cdn-icons-png.flaticon.com/512/1163/1163661.png",
        "Rain": "https://cdn-icons-png.flaticon.com/512/1163/1163657.png",
        "Snow": "https://cdn-icons-png.flaticon.com/512/1163/1163658.png",
        "Drizzle": "https://cdn-icons-png.flaticon.com/512/1163/1163662.png",
        "Thunderstorm": "https://cdn-icons-png.flaticon.com/512/1163/1163665.png",
        "Mist": "https://cdn-icons-png.flaticon.com/512/1163/1163664.png",
        "Fog": "https://cdn-icons-png.flaticon.com/512/1163/1163664.png",
        "Haze": "https://cdn-icons-png.flaticon.com/512/1163/1163664.png"
    };
    return iconMap[weather] || "https://cdn-icons-png.flaticon.com/512/869/869869.png";
}

// 날씨 문구 한글 변환
function translateWeatherToKorean(weather) {
    const weatherTranslations = {
        "Clear": "맑음",
        "Clouds": "구름",
        "Rain": "비",
        "Snow": "눈",
        "Drizzle": "이슬비",
        "Thunderstorm": "천둥",
        "Mist": "안개",
        "Fog": "안개",
        "Haze": "실안개"
    };
    return weatherTranslations[weather] || "기타";
}

// 도시명 한글 변환
function translateCityToKorean(city) {
    const cityTranslations = {
        "Seoul": "서울",
        "Busan": "부산",
        "Incheon": "인천",
        "Daegu": "대구",
        "Daejeon": "대전",
        "Gwangju": "광주",
        "Ulsan": "울산",
        "Suwon": "수원",
        "Jeju": "제주도",
        "Gyeonggi-do": "경기도",
        "Chuncheon": "춘천",
        "Gangneung": "강릉",
        "Changwon": "창원"
    };
    return cityTranslations[city] || city;
}

// 영화 데이터 조회 및 HTML 렌더링
async function getMovie() {
    const movieCount = 3;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const year = yesterday.getFullYear();
    const month = String(yesterday.getMonth() + 1).padStart(2, '0');
    const day = String(yesterday.getDate()).padStart(2, '0');
    const movieDateWord = `${year}${month}${day}`;

    try {
        // 박스오피스 데이터 조회 URL 변수화
        const boxOfficeUrl = `https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=93cc723ee53743ead4321809b7f43c44&targetDt=${movieDateWord}`;
        const boxOfficeData = await new Promise((resolve, reject) => {
            getAjax(boxOfficeUrl, resolve, reject);
        });
        const movieList = boxOfficeData.boxOfficeResult.dailyBoxOfficeList;
        let moviesHtml = '';

        // 향상된 for문 (for-of) 를 이용해 상위 movieCount 만큼 순회
        for (const movie of movieList.slice(0, movieCount)) {
            const movieOpenDay = movie.openDt.replaceAll('-', '');
            const movieName = movie.movieNm;

            // 영화 상세 정보 조회 URL 변수화
            const detailUrl = `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=6LM6P64C3NL6W2VB1N01&sort=prodYear,1&releaseDts=${movieOpenDay}&detail=Y&query=${encodeURIComponent(movieName)}`;
            const detailData = await new Promise((resolve, reject) => {
                getAjax(detailUrl, resolve, reject);
            });
            const jsonData = typeof detailData === 'string' ? JSON.parse(detailData) : detailData;

            let rank = jsonData.TotalCount;
            let posterUrl = '포스터 없음';
            let directorNm = '감독 정보 없음';
            let genre = '장르 정보 없음';
            let repRlsDate = '개봉일 정보 없음';
            let day = '';

            // JSON 구조에 따른 파싱
            if ( jsonData.Data && jsonData.Data[0] && jsonData.Data[0].Result && jsonData.Data[0].Result[0] ) {
                const result = jsonData.Data[0].Result[0];

                // 포스터 정보 파싱
                if ( result.posters ) {
                    posterUrl = result.posters.split('|')[0] || '포스터 없음';
                }

                // 감독 정보 파싱 (director 배열)
                if ( result.directors && result.directors.director && result.directors.director.length > 0 ) {
                    directorNm = result.directors.director
                        .map(item => item.directorNm)
                        .join(', ');
                }

                // 장르 정보 파싱
                if ( result.genre ) {
                    genre = result.genre;
                }

                // 개봉일 정보 파싱 (repRlsDate 사용)
                if ( result.repRlsDate ) {
                    const repDateStr = result.repRlsDate;
                    const rlsYear = repDateStr.substring(0, 4);
                    const rlsMonth = repDateStr.substring(4, 6);
                    const rlsDay = repDateStr.substring(6, 8);
                    const formattedDate = `${rlsYear}년 ${rlsMonth}월 ${rlsDay}일`;

                    // 오늘 날짜와의 차이 계산 (D+ 표기)
                    const today = new Date();
                    const releaseDate = new Date(parseInt(rlsYear), parseInt(rlsMonth) - 1, parseInt(rlsDay));
                    const diffMs = today - releaseDate;
                    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

                    repRlsDate = `${formattedDate}`;

                    if ( diffDays === 0 ) {
                        day = ' (오늘 개봉)';
                    } else if ( diffDays > 0 ) {
                        day = ` (D+${diffDays})`;
                    }
                }

                const movieHtml = movieTemplate
                    .replace(/{poster}/g, posterUrl)
                    .replace(/{title}/g, movieName)
                    .replace(/{rank}/g, rank)
                    .replace(/{directorNm}/g, directorNm)
                    .replace(/{genre}/g, genre)
                    .replace(/{repRlsDate}/g, repRlsDate)
                    .replace(/{day}/g, day);
                moviesHtml += movieHtml;
            }
            movieWrapper.html(moviesHtml);
        }
    } catch (error) {
        movieWrapper.html('<p>영화 정보를 불러오는데 실패했습니다.</p>');
    }

}

// 상품 데이터 조회 및 렌더링
function fetchTopProducts(productType) {
    currentCategory = productType;

    fetchThen(
        `${API.PRODUCT}?productType=${productType}`,
        (data) => {
            productContainer.empty();
            if (!data || data.length === 0) {
                productContainer.html('<p>상품이 없습니다.</p>');
                return;
            }
            data.forEach((product) => {
                const imageUrl = product.filePath.trim();
                const itemHtml = `
                    <div class="product-card">
                        <a href="/giftShop/main" class="product-link">
                            <img src="${imageUrl}" alt="${product.productName}">
                            <div class="product-name">${product.productName}</div>
                        </a>
                    </div>
                `;
                productContainer.append(itemHtml);
            });
        },
        (err) => {
            console.error("상품 데이터를 불러오는 중 오류 발생:", err);
        }
    );
}

// 뉴스 데이터 조회 및 렌더링
function fetchNews() {
    fetchThen(
        API.NEWS,
        (data) => {
            newsList.empty();
            if (!data || data.length === 0) {
                newsList.html('<p>뉴스가 없습니다.</p>');
                return;
            }
            data.forEach((news) => {
                const newsHtml = `
                    <div class="news-item">
                        <a href="${news.link}" target="_blank">
                            <h3>${news.title}</h3>
                        </a>
                    </div>
                `;
                newsList.append(newsHtml);
            });
        },
        (err) => {
            console.error("뉴스 데이터를 불러오는 중 오류 발생:", err);
        }
    );
}
