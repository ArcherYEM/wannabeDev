package com.dev.wannabe.domain.home.model.dto;

import lombok.Data;

@Data
public class NoticeDTO {
    private Long noticeId;
    private String noticeType;
    private String noticeTitle;
    private String noticeContents;
    private String startDate;
    private String startTime;
    private String endDate;
    private String endTime;
    private String insertDT;
    private Long insertUserId;
    private String updateDT;
    private Long updateUserId;
    private String startDateTime;
    private String endDateTime;

    // 추가된 LOGIN_ID 필드
    private String loginId;  // 로그인 ID를 추가

    // NOTICE_TYPE을 변환하여 반환하는 메서드 추가
    public String getNoticeTypeName() {
        switch (this.noticeType) {
            case "01":
                return "공지사항";
            case "02":
                return "이벤트";
            case "03":
                return "팝업";
            case "04":
                return "전체 쪽지";
            case "05":
                return "관리자 쪽지";
            default:
                return "알 수 없음";  // 예외처리, 또는 기본값
        }
    }

    public String getNoticeTypeCssClass() {
        switch (this.noticeType) {
            case "01": return "bg-announcement"; // 예: 연노랑
            case "02": return "bg-event";        // 예: 연초록
            case "03": return "bg-popup";        // 예: 연보라
            case "04": return "bg-note";         // 예: 연파랑
            case "05": return "bg-admin";        // 예: 연회색
            default: return "bg-unknown";
        }
    }

    // 날짜 범위를 반환하는 메서드 추가
    public String getDateRange() {
        return this.startDateTime + " ~ \n" + this.endDateTime;
    }
}
