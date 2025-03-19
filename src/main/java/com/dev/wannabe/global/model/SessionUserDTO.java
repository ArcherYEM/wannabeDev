package com.dev.wannabe.global.model;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
public class SessionUserDTO {

    // client
    private String accessIp;

    // User
    private Long userId;  // UUID, PK
    private String email;   // UNIQUE
    private String phoneNo; // UNIQUE
    private String name;
    private String genderCode; // 성별 코드 M, F
    private String birthDate;

    // Hompi
    private Long hompiId;
    private String hompiURL;
    private String hompiTitle;

    // MiniRoom
    private Long miniroomId;


}