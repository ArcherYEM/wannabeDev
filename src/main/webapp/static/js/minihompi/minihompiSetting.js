$(document).ready(function () {
    visitingStatistics(days(2024, 2));
    makeFriendList();
});

function days(year, month) {
    return new Date(year, month, 0).getDate();
}

function visitingStatistics(days) {


    let labels = [];
    for (let i = 1; i <= days; i++) {
        labels.push(`${i}일`);
    }

    let visitData = [];
    for (let i = 1; i <= days; i++) {
        visitData.push(i);
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

function makeFriendList() {
    $("#friend-num-container").append(`
        <div id="friend-num-display">전체 10 명</div>
    `)
    for (let i=0; i < 10; i++) {
        // 일촌 데이터 예시
        let data = {
            'num': i+1,
            'startDate': `2024.12.4`,
            'friendMinimi': `/static/images/common/minimi/예희.png`,
            'friendNickname': `김김이`,
            'userNickname': `박박이`,
            'friendUserId': `1`
        }
        let friendItem = $(createFriendItem(data))
        $("#friend-list-container").append(friendItem)
    }
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