package com.dev.wannabe.global.model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SessionUserDTO {

    // client
    private String accessIp;

    // User
    private Long userId;
    private String name;

    private String role;

    // Hompi
    private Long hompiId;
    private String hompiURL;
    private String hompiTitle;

}