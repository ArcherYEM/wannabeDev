package com.dev.wannabe.domain.home.model.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserDataDTO {

    private String email;   // UNIQUE
    private String phoneNo; // UNIQUE
    private String name;
    private String genderCode; // 성별 코드 M, F
    private String birthDate;

}
