package com.dev.wannabe.domain.home.model.login.vo;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder(toBuilder = true)
public class LoginLog {

    private Long logId;
    private String accessIp;
    private Long userId;
    private LocalDateTime loginDt;
    private LocalDateTime logoutDt;
    private String remarks;
    private Long insertUserId;
    private LocalDateTime insertDt;
    private Long updateUserId;
    private LocalDateTime updateDt;

}