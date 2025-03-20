document.addEventListener("DOMContentLoaded", function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                console.log(`📍 현재 위치: 위도 ${lat}, 경도 ${lon}`);
                fetchWeatherByLocation(lat, lon);
            },
            function (error) {
                console.error("❌ 위치 정보를 가져올 수 없습니다.", error);
                fetchWeatherByCity("Seoul"); // 기본값 서울
            }
        );
    } else {
        console.error("❌ 이 브라우저는 위치 정보를 지원하지 않습니다.");
        fetchWeatherByCity("Seoul"); // 기본값 서울
    }

    function fetchWeatherByLocation(lat, lon) {
        const apiKey = "629da2d63bca145438b81baeebadcdbe";
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log("🌤️ 위치 기반 날씨 데이터:", data);
                updateWeatherUI(data);
            })
            .catch((error) => console.error("❌ 날씨 데이터를 가져오는 중 오류 발생:", error));
    }

    function fetchWeatherByCity(city) {
        const apiKey = "629da2d63bca145438b81baeebadcdbe";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log("🌤️ 기본 도시(서울) 날씨 데이터:", data);
                updateWeatherUI(data);
            })
            .catch((error) => console.error("❌ 날씨 데이터를 가져오는 중 오류 발생:", error));
    }

    function updateWeatherUI(data) {
        let cityName = data.name;
        let translatedCity = translateCityToKorean(cityName);
        let weatherState = data.weather[0].main; // 🌥️ 원본 날씨 상태 (영어)
        let translatedWeather = translateWeatherToKorean(weatherState); // 🏷️ 한글 변환
        let iconUrl = getWeatherIcon(weatherState); // 🌤️ 아이콘 가져오기

        document.getElementById("location").textContent = `${translatedCity} 날씨`;
        document.querySelector(".weather-title span").textContent = translatedWeather;
        document.getElementById("weatherIcon").src = iconUrl;
        document.getElementById("weatherIcon").alt = translatedWeather;
        document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}° C`;
        document.getElementById("rain").textContent = `${data.rain ? data.rain["1h"] + "%" : "0%"}`;
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
        return cityTranslations[city] || city; // 변환된 도시명 반환 (없으면 원래 값)
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
});