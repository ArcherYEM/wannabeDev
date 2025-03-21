package com.dev.wannabe.domain.home.model.dto;

import lombok.Data;

// 회원가입 시 전송받는 Data
@Data
public class SignupUserDTO {

    // USER_BASIC
    private String loginId; // UNIQUE, 회원 가입 시 입력
    private String email;   // UNIQUE
    private String phoneNo; // UNIQUE
    private String password;// 회원 가입 시 입력
    private String name;
    private String genderCode; // 성별 코드 M, F
    private String birthDate;

    // USER_DETAIL
    private String friendMessageAvailYN; // 일촌 메시지 허용 여부
    private String confirmYN1; // 수집 동의 여부 1
    private String confirmYN2; // 수집 동의 여부 2
    private String confirmYN3; // 수집 동의 여부 3

    public Object getname() {
        return  name;
    }
}
