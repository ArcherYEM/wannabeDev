let friendStart;
let friendSize;

$(document).ready(function () {
    friendStart = 0;
    friendSize = 10;
    visitingStatistics(days(2024, 2)); // 2024년 2월이라 총 28칸 생성
    makeFriendList(friendStart, friendSize);
});

// 연도와 월로 일 수 체크 함수
function days(year, month) {
    return new Date(year, month, 0).getDate();
}

// 방문자 통계 생성 함수
function visitingStatistics(days) {
    let labels = [];
    for (let i = 1; i <= days; i++) {
        labels.push(`${i}일`);
    }

    let visitData = [];
    for (let i = 1; i <= days; i++) {
        visitData.push(i); // 여기에 방문자 데이터 추가
    }

    let statisticsCanvas = $("#statistics-chart")[0].getContext('2d');
    new Chart(statisticsCanvas, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: '일별 방문자 수',
                data: visitData,
                borderColor: 'grey',
                borderWidth: 1,
                fill: false,
                tension: 0.1,
                pointBackgroundColor: 'grey'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '방문자 수'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: '일'
                    },
                    ticks: {
                        autoSkip: false
                    }
                }
            }
        }
    });
}

function makeFriendList(friendStart, friendSize) {
    $.ajax({
        type:"GET",
        url:"/api/friend/friends/num",
        contentType: "application/json",
        success: function(friendNum){
            $("#friend-num-container").append(`
                <div id="friend-num-display">전체 ${friendNum} 명</div>
            `)
            $.ajax({
                type:"GET",
                url:`/api/minihompi/setting/friend/${friendStart}/${friendSize}`,
                contentType: "application/json",
                success: function(friendList){
                    if (!friendList) { return; }
                    friendList.forEach((friend, index) => {
                        friend.num = index + 1;
                        let friendItem = $(createFriendItem(friend));
                        $("#friend-list-container").append(friendItem)
                    });
                },
                error: function(error) {
                    console.log(error)
                }
            });
        },
        error: function(error) {
            console.log(error)
        }
    });

}

function createFriendItem(data) {
    return `
    <div class="friend-list-item">
            <div class="minimi-container">
                <img class="friend-minimi" src="${data.friendMinimi}">
            </div>
            <div class="friend-info-container">
                <div class="friend-info-header">
                    <div class="friend-display-num">순서 : ${data.num}</div>
                    <div class="friend-start-date">${data.startDate}</div>
                </div>
                <div class="friend-info-body">
                    <div class="friend-name">
                        <span class="friend-nickname-title">상대 일촌명</span>
                        <span class="friend-nickname">: ${data.friendNickname}</span>
                    </div>
                    <div class="friend-name">
                        <span class="friend-nickname-title">나의 일촌명</span>
                        <span class="friend-nickname">: ${data.userNickname}</span>
                    </div>
                </div>
                <div class="friend-info-footer">
                    <div class="friend-cancel-btn" data-hidden-value=${data.friendId}>일촌 끊기</div>
                </div>
            </div>
            
    </div>
    `
}