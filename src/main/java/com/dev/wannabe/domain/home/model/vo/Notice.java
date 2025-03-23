package com.dev.wannabe.domain.home.model.vo;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(toBuilder = true)
public class Notice {
    private Long noticeId;
    private String noticeType;
    private String noticeTitle;
    private String noticeContents;
    private String startDate;
    private String endDate;

    // 날짜 범위 반환
    public String getDateRange() {
        return startDate + " ~ " + endDate;
    }
}
