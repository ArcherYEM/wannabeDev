const modalOpenBtn = document.getElementById('findIdAndPw');
const modal = document.getElementById('idPwModal');

modalOpenBtn.addEventListener('click',function(){
    modal.classList.remove('hidden');
});

const birthYearSelect = document.getElementById("birthYear");
const birthMonthSelect = document.getElementById("birthMonth");
const birthDaySelect = document.getElementById("birthDay");

for (let year = 2025; year >= 1940; year--) {
    let option = document.createElement("option");
    option.value = year;
    option.textContent = year + "년";
    birthYearSelect.appendChild(option);
}

birthYearSelect.value = "2000";

for (let month = 1; month <= 12; month++) {
    let option = document.createElement("option");
    option.value = month;
    option.textContent = month + "월";
    birthMonthSelect.appendChild(option);
}

birthMonthSelect.value = "1";

// 월마다 일수 변경 함수
function updateBirthDays() {

    const months = parseInt(birthMonthSelect.value);
    let days = 1;

    if(months ==2){
        days = 28;
    } else {
        const monthsThirtyOne = [1, 3, 5, 7, 8, 10, 12];
        const monthsThirty = [4, 6, 9, 11];

        //1,3,5,7,8,10,12월일 때 31일 이외에는 30일, 그 외에는 1일
        if(monthsThirtyOne.includes(months)){
            days = 31;
        } else if(monthsThirty.includes(months)){
            days = 30;
        } else {
            days = 1;
        }

        birthDaySelect.innerHTML = "";

        for (let day = 1; day <= days; day++){
            let option = document.createElement("option");
            option.value = day;
            option.textContent = day + "일";
            birthDaySelect.appendChild(option);
        }

        birthDaySelect.value = "1";
    }
}

//월이나 년도가 바뀔 때 일수도 변경
birthMonthSelect.addEventListener("change", updateBirthDays);
birthYearSelect.addEventListener("change", updateBirthDays);

updateBirthDays();