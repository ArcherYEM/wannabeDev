package com.dev.wannabe.domain.home.model.user.vo;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder(toBuilder = true)
public class UserRole {

    private String roleCd; // 권한 코드 01: ADMIN, 02: MANAGER, 03: USER
    private Long userId;
    private String remarks;
    private Long insertUserId;
    private LocalDateTime insertDt;
    private Long updateUserId;
    private LocalDateTime updateDt;

}
