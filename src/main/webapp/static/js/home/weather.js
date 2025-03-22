$(document).ready(function () {
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
                console.log("🌤️ 서버에서 받아온 날씨 데이터:", data);
                updateWeatherUI(data, lat, lon);
            },
            error: function (error) {
                console.error("❌ 서버에서 날씨 데이터를 가져오는 중 오류 발생:", error);
            }
        });
    }

    function updateWeatherUI(data, lat, lon) {
        const translatedWeather = translateWeatherToKorean(data.message);

        $('#location').text(`날씨 정보를 가져오는 중...`);
        $('.weather-title span').text(translatedWeather);
        $('#weatherIcon').attr('src', getWeatherIcon(data.message)).attr('alt', translatedWeather);
        $('#temperature').text(`${data.temperature}° C`);
        $('#rain').text(`${data.rain}%`);

        // GeoAPI로 위경도를 이용하여 지역명 가져오기
        fetch(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}`)
            .then(response => response.json())
            .then(locationData => {
                const city = locationData.address.city || locationData.address.town || locationData.address.village || "현재 위치";
                const translatedCity = translateCityToKorean(city);
                $('#location').text(`${translatedCity} 날씨`);
            })
            .catch(error => {
                console.error("❌ 지역 정보를 가져오는 중 오류 발생:", error);
                $('#location').text(`현재 위치 날씨`);
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
});