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
    const errorMessageDiv = document.querySelector('.errorMessageDiv');

    const idInput = document.querySelector('.idInput');
    const emailInput = document.querySelector('.emailInput');
    const sendBtn = document.querySelector('.sendBtn');
    const checkBtn = document.querySelector('.checkBtn');
    const codeCheck = document.querySelector('.codeCheck');

    const pwdChangeContainer = document.querySelector('.pwdChangeContainer');
    const changePwdBtn = document.querySelector('.changePwdBtn');
    const outBtn = document.querySelector('.outBtn');

    const pwdInput = document.querySelector('.pwdInput');
    const pwdInputCheck = document.querySelector('.pwdInputCheck');

    const loginIdInputHidden = document.querySelector('.loginIdInputHidden');
    const emailInputHidden = document.querySelector('.emailInputHidden');

    let isChecked = 0;

    // 모달창 ON
    modalOpenBtn.addEventListener('click',function(){
        modal.classList.remove('hidden');
    });

    // 모달창 OFF
//    modalCloseBtn.addEventListener('click',function(){
//        modal.classList.add('hidden');
//
//        document.querySelector("form").reset();
//    });

    const birthYearSelect = document.getElementById("birthYear");
    const birthMonthSelect = document.getElementById("birthMonth");
    const birthDaySelect = document.getElementById("birthDay");
    console.log('isChecked: '+ isChecked);
    //년도 설정
    for (let year = 2025; year >= 1940; year--) {
        let option = document.createElement("option");
        option.value = year;
        option.textContent = year + "년";
        birthYearSelect.appendChild(option);
    }

    //월 설정
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

    // 아이디 찾기 버튼
    idBtn.addEventListener('click',function(){
        document.querySelector("form").reset();
        pwBtn.style.backgroundColor = '#595959';
        idBtn.style.backgroundColor = '#FF8000';
        userInfoId.style.display = 'block';
        userInfoPw.style.display = 'none';
        errorMessageDiv.style.display = 'none';
        idInput.value='';
        emailInput.value='';
        codeCheck.value='';
    });

    // 비밀번호 찾기 버튼
    pwBtn.addEventListener('click',function(){
        document.querySelector("form").reset();
        userInfoId.style.display = 'none';
        pwBtn.style.backgroundColor = '#FF8000';
        idBtn.style.backgroundColor = '#595959';
        userInfoPw.style.display = 'block';
        errorMessageDiv.style.display = 'none';
    });

    // 아이디 찾고 후에 비밀번호 찾기 버튼
    pwBtn1.addEventListener('click',function(){
        document.querySelector("form").reset();
        showIdDiv.style.display = 'none';
        logoContainer.style.display = 'flex';
        findIdBtn.style.display = 'block';
        findPwBtn.style.display = 'block';
        cancelBtn.style.display = 'block';
        findBtn.style.display= 'block';
        findIdBtn.style.backgroundColor = '#595959';
        findPwBtn.style.backgroundColor = '#FF8000';
        userInfoPw.style.display = 'block';
        errorMessageDiv.style.display = 'none';
    });

    cancelBtn.addEventListener('click', function(){
        findBtn.style.display= 'block';
    });

    //취소 버튼 눌렀을 때 전체 초기화
    function resetModalState(){
        // 모달 창 닫기
       modal.classList.add('hidden');

       // 모든 폼 리셋
       document.querySelectorAll("form").forEach(form => form.reset());

       // idBtn을 클릭한 것처럼 상태 설정
       pwBtn.style.backgroundColor = '#595959';
       idBtn.style.backgroundColor = '#FF8000';
       userInfoId.style.display = 'block';
       userInfoPw.style.display = 'none';
       errorMessageDiv.style.display = 'none';

       // 다른 컨테이너들 초기화
       showIdDiv.style.display = 'none';
       logoContainer.style.display = 'flex';
       pwdChangeContainer.style.display = 'none';

       // 버튼 상태 초기화
       findIdBtn.style.display = 'block';
       findPwBtn.style.display = 'block';
       document.querySelector('.findBtnDiv').style.display = 'block';
       findBtn.style.display = 'block';
       cancelBtn.style.display = 'block';
       document.querySelector('.changePwdDiv').style.display = 'none';

       idInput.value='';
       emailInput.value='';
       codeCheck.value='';
    }

    // 모든 취소 버튼 초기화
    outBtn.addEventListener('click', resetModalState);
    modalCloseBtn.addEventListener('click', resetModalState);

    // 찾기 버튼
    findBtn.addEventListener('click',function(){
        event.preventDefault();
        if(userInfoId.style.display === "block"){
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
                        errorMessageDiv.innerHTML = `<span style="color:  red;">${errorResponse.message}</span>`;
                    } else {
                        alert("서버 오류가 발생했습니다.");
                    }
                }
            });
        } else if (userInfoPw.style.display == "block"){

            if(isChecked == 1){
                findIdBtn.style.display = 'none';
                findPwBtn.style.display = 'none';
                pwdChangeContainer.style.display = 'block';
                document.querySelector('.findBtnDiv').style.display = 'none';
                findBtn.style.display = 'none';
                document.querySelector('.changePwdDiv').style.display = 'block';
                changePwdBtn.style.display = 'block';
                userInfoPw.style.display ='none';
            } else {
                alert('이메일 인증이 필요합니다.')
            }
        }
    });

    //인증번호 전송 버튼
    sendBtn.addEventListener('click',function(){
        event.preventDefault();

        console.log('idInput.value : ' + idInput.value);
        console.log('emailInput.value : ' + emailInput.value);

        $.ajax({
            type:"POST",
            url:"/api/user/sendCode",
            async: true,
            dataType:"json",
            data:{
                loginId: idInput.value,
                email: emailInput.value
            },
            success: function(response){
                console.log("success response: ", response );
                alert('인증번호를 전송하였습니다.');
                loginIdInputHidden.value = idInput.value;
                emailInputHidden.value = emailInput.value;
            },
            error: function(xhr) {
                console.log("error response: ", xhr);
            }
        });
    });

    //이메일 인증 확인 버튼
    checkBtn.addEventListener('click', function(){
        event.preventDefault();

        console.log('codeCheck.value: ' + codeCheck.value);
        console.log('idInput.value : ' + idInput.value);
        console.log('emailInput.value : ' + emailInput.value);

        $.ajax({
            type:"POST",
            url:"/api/user/checkAuthCode",
            async: true,
            dataType:"json",
            data:{
                authCode: codeCheck.value,
                loginId: idInput.value,
                email: emailInput.value
            },
            success: function(response){
                console.log("success response: ", response );
                alert('인증 성공하였습니다.');
                isChecked = 1;
                console.log('isChecked: '+ isChecked);
            },
            error: function(xhr) {
                console.log("error response: ", xhr);
                alert('인증 실패하였습니다.');
                loginIdInputHidden.value = '';
                emailInputHidden.value = '';
            }
        });
    });

    //TODO: 찾기 버튼 나눠보기(위에서 else if로 나누지 말고)
    //TODO: form hidden에 id값 넣어보기
    changePwdBtn.addEventListener('click', function(){
        event.preventDefault();

        console.log('pwdInput: ' + pwdInput.value);
        console.log('pwdInputCheck: ' + pwdInputCheck.value);
        console.log('loginIdInputHidden: ' + loginIdInputHidden.value);
        console.log('emailInputHidden: ' + emailInputHidden.value);

        if(pwdInput.value === pwdInputCheck.value){
             $.ajax({
                type:"POST",
                url:"/api/user/changePassword",
                async: true,
                dataType:"json",
                data:{
                    password: pwdInput.value,
                    loginId: loginIdInputHidden.value,
                    email: emailInputHidden.value
                },
                success: function(response){
                    console.log("success response: ", response );
                    if(confirm("비밀번호 변경 성공하였습니다.")){
                        resetModalState();
                    }
                },
                error: function(xhr) {
                    console.log("error response: ", xhr);
                    alert('비밀번호 변경 실패하였습니다.');
                }
            });
        } else {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
    });
});




