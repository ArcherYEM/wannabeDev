document.addEventListener("DOMContentLoaded",function() {
    const modalOpenBtn = document.getElementById('findIdAndPw');
    const modal = document.getElementById('idPwModal');
    const modalCloseBtn = document.querySelector('.cancelBtnDiv');
    // 모달 창 안에서 아이디 찾기 / 비밀번호 찾기 버튼
    const idBtn = document.querySelector('.findIdBtn');
    const pwBtn = document.querySelector('.findPwBtn');
    const pwBtn1 = document.querySelector('.findPwBtn1');
    const showIdDiv = document.querySelector('.showIdDiv');

    const userInfoId = document.querySelector('.userInfoId');
    const userInfoPw = document.querySelector('.userInfoPw');

    // 찾기 버튼
    const findBtn = document.querySelector('.findBtn');
    const cancelBtn = document.querySelector('.cancelBtn');

    const nameInput = document.querySelector('#nameInput');
    const birthYear = document.querySelector('#birthYear');
    const birthMonth = document.querySelector('#birthMonth');
    const birthDay = document.querySelector('#birthDay');
    const showId = document.querySelector('.showId');
    const logoContainer = document.querySelector('.logoContainer');
    const findIdBtn = document.querySelector('.findIdBtn');
    const findPwBtn = document.querySelector('.findPwBtn');

    // 모달창 ON
    modalOpenBtn.addEventListener('click',function(){
        modal.classList.remove('hidden');
    });

    // 모달창 OFF
    modalCloseBtn.addEventListener('click',function(){
        modal.classList.add('hidden');

        document.querySelector("form").reset();
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

    for (let month = 1; month <= 12; month++) {
        let option = document.createElement("option");
        option.value = month;
        option.textContent = month + "월";
        birthMonthSelect.appendChild(option);
    }

    // 월마다 일수 변경 함수
    function updateBirthDays() {
        const month = parseInt(birthMonthSelect.value) || 0; // 값이 없으면 0으로 처리
        let days;

        if (month === 2) {
            days = 28;
        } else if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
            days = 31; // 31일인 달
        } else if ([4, 6, 9, 11].includes(month)) {
            days = 30; // 30일인 달
        } else {
            days = 0;
        }

        // 기존 옵션 지우기
        birthDaySelect.innerHTML = "";

        // 선택 X일 때 일표시
        let defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "일";
        defaultOption.selected = true;
        defaultOption.disabled = true;
        birthDaySelect.appendChild(defaultOption);

        // 일 추가
        for (let day = 1; day <= days; day++) {
            let option = document.createElement("option");
            option.value = day;
            option.textContent = day + "일";
            birthDaySelect.appendChild(option);
        }
    }


    //월이나 년도가 바뀔 때 일수 변경
    birthMonthSelect.addEventListener("change", updateBirthDays);
    birthYearSelect.addEventListener("change", updateBirthDays);

    updateBirthDays();



    // 아이디 찾기 버튼 눌렀을 때
    idBtn.addEventListener('click',function(){
        userInfoId.style.display = 'block';
        userInfoPw.style.display = 'none';
    });

    // 비밀번호 찾기 버튼 눌렀을 때
    pwBtn.addEventListener('click',function(){
        userInfoId.style.display = 'none';
        userInfoPw.style.display = 'block';
    });

    pwBtn1.addEventListener('click',function(){
        showIdDiv.style.display = 'none';
        logoContainer.style.display = 'block';
        findIdBtn.style.display = 'block';
        findPwBtn.style.display = 'block';
        cancelBtn.style.display = 'block';
        findBtn.style.display= 'block';
        userInfoPw.style.display = 'block';
    });

    findBtn.addEventListener('click',function(){
        event.preventDefault();

        if(nameInput.value.trim() === ""){
            alert('이름을 입력하세요');
            return;
        } else if(birthYear.value === "" || birthMonth.value === "" || birthDay.value === ""){
            alert('생년월일을 선택해주세요');
            return;
        }
        console.log('nameInput.value: ' + nameInput.value);
        console.log('birthYear.value: ' + birthYear.value);
        console.log('birthMonth.value: ' + birthMonth.value);
        console.log('birthDay.value: ' + birthDay.value);

        let birthDate = `${birthYear.value}${birthMonth.value.padStart(2, '0')}${birthDay.value.padStart(2, '0')}`;

        $.ajax({
            type:"POST",
            url:"/api/user/findId",
            async: true,
            dataType:"json",
            data:{
                name: nameInput.value,
                birthDate: birthDate
            },
            success: function(response){
                console.log("success response: ", response );
                if(response.id){
                    showId.innerHTML=`${nameInput.value}님의 아이디는 <span style="color: #FF8800;"> ${response.id}</span>입니다!`;
                    userInfoId.style.display = 'none';
                    userInfoPw.style.display = 'none';
                    logoContainer.style.display = 'none';
                    findIdBtn.style.display = 'none';
                    findPwBtn.style.display = 'none';
                    cancelBtn.style.display = 'none';
                    findBtn.style.display= 'none';

                    showId.parentElement.style.display='block';
                }
            },
            error: function(xhr) {
                console.log("error response: ", xhr);
                const errorResponse = xhr.responseJSON;
                if (errorResponse && errorResponse.message) {
                    alert(errorResponse.message);
                } else {
                    alert("서버 오류가 발생했습니다.");
                }
            }
        });
    });
});




