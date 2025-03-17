package com.dev.wannabe.domain.home.model.vo;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder(toBuilder = true)
public class UserRole {

    private String roleCd; // 권한 코드 01: ADMIN, 02: MANAGER, 03: USER
    private long userId;
    private String remarks;
    private long insertUserId;
    private LocalDateTime insertDt;
    private long updateUserId;
    private LocalDateTime updateDt;

    public UserRole updateRole(String roleCd) {
        return this.toBuilder()
                .roleCd(roleCd)
                .build();
    }
}
