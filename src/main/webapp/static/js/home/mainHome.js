$(document).ready(function(){
    getFortune(); //운세 api
    getNews(); //뉴스 api
    imageSlide(); // 이미지 슬라이드
    getWeather(); //날씨 api
    getMovie(); //영화 api
});

// 운세 api
function getFortune (){
    $.ajax({
        url: "/main/fortune",
        type: "GET",
        success: function(response){
            $("#todayLucky").text(response);
        },
        error: function(xhr, status, error){
            console.error("AJAX 요청 실패:", status, error);
            $("#todayLucky").text("오늘의 운세를 불러오는데 실패했습니다.");
        }
    });
}

// 뉴스 api
function getNews(){
    $.ajax({
        type: "GET",
        url: "/api/news/googleNews",
        timeout: 2000,
        success: function (response) {
            $("#newsList").empty();

            $.each(response, function (index, newsData){
                let listItem = $("<li></li>");
                let newsItem = $("<a></a>")
                    .attr("href", newsData.link)
                    .attr("target", "_blank")
                    .text(newsData.title);
                listItem.append(newsItem);
                $("#newsList").append(listItem);
            });
        },
        error: function (error) {
            $("#newsList").empty();

            $.each(new Array(5) , function (){
                let listItem = $("<li></li>");
                let newsItem = $("<a></a>")
                    .text("실시간 뉴스입니다.");
                listItem.append(newsItem);
                $("#newsList").append(listItem);
            });
        }
    });
}

// 회원가입 이동
$(".signupBtn").click(function() {
    location.href="/signup";
});

// 도토리 충전 이동
$(".rechargePageBtn").click(function() {
    location.href="/recharge";
});

// 이미지 슬라이드
function imageSlide(){
    $(".swiper-wrapper").load("imageSlide");
}

// 날씨 api
function getWeather(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherFromServer(lat, lon);
        }, function (error) {
            fetchWeatherFromServer(37.5665, 126.9780); // 서울 기본값
        });
    } else {
        fetchWeatherFromServer(37.5665, 126.9780); // 서울 기본값
    }

    function fetchWeatherFromServer(lat, lon) {
        $.ajax({
            url: '/weather/location',
            method: 'GET',
            data: { lat: lat, lon: lon },
            success: function (data) {
                // console.log("🌤️ 서버에서 받아온 날씨 데이터:", data);
                updateWeatherUI(data, lat, lon);
            },
            error: function (error) {
                // console.error("❌ 서버에서 날씨 데이터를 가져오는 중 오류 발생:", error);
            }
        });
    }

    function updateWeatherUI(data, lat, lon) {
        const translatedWeather = translateWeatherToKorean(data.message);

        $('#weather-text').text(translatedWeather);
        $('#weatherIcon').attr('src', getWeatherIcon(data.message)).attr('alt', translatedWeather);
        $('#temperature').text(`${data.temperature}°C`);
        $('#rain').text(`강수 ${data.rain}%`);

        // GeoAPI로 위경도를 이용하여 지역명 가져오기
        fetch(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}`)
            .then(response => response.json())
            .then(locationData => {
                const city = locationData.address.city || locationData.address.town || locationData.address.village || "현재 위치";
                const translatedCity = translateCityToKorean(city);
                $('#location').text(`${translatedCity}`);
            })
            .catch(error => {
                // console.error("❌ 지역 정보를 가져오는 중 오류 발생:", error);
                $('#location').text(`현재 위치`);
            });
    }

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
}

// 영화 api
function getMovie(){
    const moviecount = 3;
    let movie_dateword;

    const movie_today = new Date();
    const movie_yesterday = new Date();
    movie_yesterday.setDate(movie_today.getDate() - 1); // 하루 전 날짜를 만든다

    let movie_year = movie_yesterday.getFullYear().toString(); // 현재 연도
    let movie_month = (movie_yesterday.getMonth() + 1).toString(); // 현재 월
    let movie_date = movie_yesterday.getDate().toString(); // 현재 일

    if (movie_date.length === 1) movie_date = '0' + movie_date;
    if (movie_month.length === 1) movie_month = '0' + movie_month;

    movie_dateword = movie_year + movie_month + movie_date; // YYYYMMDD 형식

    $.ajax({
        url: 'https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/' +
            'searchDailyBoxOfficeList.json?key=93cc723ee53743ead4321809b7f43c44&targetDt=' +
            movie_dateword,
        success: function (result) {
            const movieList = result.boxOfficeResult.dailyBoxOfficeList;

            for (let i = 0; i < moviecount; i++) {
                const movieopenday = movieList[i].openDt.replaceAll('-', '');
                const movieName = movieList[i].movieNm;

                $.ajax({
                    url: 'https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?' +
                        'collection=kmdb_new2&ServiceKey=6LM6P64C3NL6W2VB1N01' +
                        '&sort=prodYear,1&releaseDts=' + movieopenday +
                        '&detail=Y&query=' + encodeURIComponent(movieName),
                    async: false,
                    success: function (msg) {
                        const jsonData = typeof msg === 'string' ? JSON.parse(msg) : msg;

                        if (jsonData.Data && jsonData.Data[0].Result && jsonData.Data[0].Result[0]) {
                            const tempString = jsonData.Data[0].Result[0].posters;
                            const posterurl = tempString ? tempString.split('|') : [];
                            let movieFinal = "";

                            movieFinal += "<div id='movieFinal' class='movieFinal' ><div>" + (i + 1) + "위</div>"
                            movieFinal += "<div class='movieInfoWrap'>"

                            if (posterurl[0]) {
                                movieFinal += "<div class='movieImgWrap'><img src='" + posterurl[0] + "'/></div>";
                            } else {
                                movieFinal += "<div>포스터 없음</div>";
                            }

                            let animeClass = "";
                            if (movieList[i].movieNm.length >= 8) {
                                animeClass = 'flowingText';
                            }
                            movieFinal += '<div class="movieTitleBox"><span class="movieTitleHome ' + animeClass + '">' + movieList[i].movieNm + '</span></div></div>'
                            movieFinal += "</div>"

                            $('#movieWrapper').append(movieFinal);
                        }
                    },
                    error: function () {
                        $('#movieWrapper').append("<div>영화 정보 조회 실패</div><br>");
                    }
                });
            }
        },
        error: function () {
            alert("박스오피스 데이터를 불러오지 못했습니다.");
        }
    });
}