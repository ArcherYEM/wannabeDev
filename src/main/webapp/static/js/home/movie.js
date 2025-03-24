const moviecount = 3;
let dateword;

const today = new Date();
const yesterday = new Date();
yesterday.setDate(today.getDate() - 1); // 하루 전 날짜를 만든다

let year = yesterday.getFullYear().toString(); // 현재 연도
let month = (yesterday.getMonth() + 1).toString(); // 현재 월
let date = yesterday.getDate().toString(); // 현재 일

if (date.length === 1) date = '0' + date;
if (month.length === 1) month = '0' + month;

dateword = year + month + date; // YYYYMMDD 형식

const tempRow = document.createElement("div");
document.getElementsByClassName('todayMovie').innerHtml += +year + '-' + month + '-' + date +
    '일 기준 순위'
document.getElementById('movieWrapper').appendChild(tempRow); // mainTitleText가 변수일 경우 document.getElementById() 사용

$.ajax({
    url: 'https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/' +
        'searchDailyBoxOfficeList.json?key=93cc723ee53743ead4321809b7f43c44&targetDt=' +
        dateword,
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

                        movieFinal += "<div id='movieFinal' ><div>" + (i + 1) + "위</div>"

                        if (posterurl[0]) {
                            movieFinal += "<div><img src='" + posterurl[0] + "'/></div>";
                        } else {
                            movieFinal += "<div>포스터 없음</div>";
                        }

                        let animeClass = "";
                        if (movieList[i].movieNm.length >= 8) {
                            animeClass = 'flowingText';
                        }
                        movieFinal += '<div class="movieTitleBox"><span class="movieTitleHome ' + animeClass + '">' + movieList[i].movieNm + '</span></div></div>'

                        $('#movieWrapper').append(movieFinal
                        );
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
