package com.dev.wannabe.domain.home.model.vo;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder(toBuilder = true)
public class UserDetail {

    private String userId;
    private String friendMessageAvailYN;
    private String hompiUseYN; // 홈피 사용 여부
    private String confirmYN1; // 수집 동의 여부 1
    private String confirmYN2; // 수집 동의 여부 2
    private String confirmYN3; // 수집 동의 여부 3
    private String remarks;
    private String insertUserId;
    private LocalDateTime insertDt;
    private String updateUserId;
    private LocalDateTime updateDt;

}
