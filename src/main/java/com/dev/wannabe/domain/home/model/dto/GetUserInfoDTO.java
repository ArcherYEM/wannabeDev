package com.dev.wannabe.domain.home.model.dto;

import lombok.Data;

@Data
public class GetUserInfoDTO {
    private String loginId;
    private String email;
    private String phoneNo;
    private String name;
    private String genderCode;
    private String birthDate;
}
