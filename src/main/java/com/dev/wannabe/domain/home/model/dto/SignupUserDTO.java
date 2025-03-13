package com.dev.wannabe.domain.home.model.dto;

import lombok.Data;

@Data
public class SignupUserDTO {

    private String loginId; // UNIQUE, 회원 가입 시 입력
    private String email;   // UNIQUE
    private String phoneNo; // UNIQUE
    private String password;// 회원 가입 시 입력
    private String name;
    private String genderCode;
    private String birthDate;

}
