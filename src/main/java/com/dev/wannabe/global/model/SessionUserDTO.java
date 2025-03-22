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
    private Long userId;
    private String name;

    // Hompi
    private Long hompiId;
    private String hompiURL;
    private String hompiTitle;


}