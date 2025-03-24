package com.dev.wannabe.domain.home.model.dto;

import lombok.Data;

@Data
public class NoticeDTO {
    private Long noticeId;
    private String noticeType;
    private String noticeTitle;
    private String noticeContents;
    private String startDate;
    private String endDate;
    private String insertDT;
    private String insertUserId;

    // 추가된 LOGIN_ID 필드
    private String loginId;  // 로그인 ID를 추가

    // 날짜 범위를 반환하는 메서드 추가
    public String getDateRange() {
        return this.startDate + " ~ " + this.endDate;
    }
}
