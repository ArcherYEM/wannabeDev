$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "/api/news/googleNews",
        timeout: 2000,
        success: function (response) {
            $("#newsList").empty();
            // console.log(response)

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
});