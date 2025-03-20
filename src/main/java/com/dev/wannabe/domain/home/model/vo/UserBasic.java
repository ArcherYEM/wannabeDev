package com.dev.wannabe.domain.home.model.vo;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder(toBuilder = true)
public class UserBasic {

    private Long userId;  // PK
    private String loginId; // UNIQUE, 회원 가입 시 입력
    private String email;   // UNIQUE
    private String phoneNo; // UNIQUE
    private String password;// 회원 가입 시 입력
    private String name;
    private String genderCode; // 성별 코드 M, F
    private String birthDate;
    private String userStatus;
    private String remarks;
    private Long insertUserId;
    private LocalDateTime insertDt;
    private Long updateUserId;
    private LocalDateTime updateDt;

}
