package com.dev.wannabe.domain.home.model.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

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

    private String insertLoginId;  // 작성자 ID
    private String updateLoginId;  // 수정자 ID

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
        boolean hasStart = startDateTime != null && !startDateTime.trim().isEmpty();
        boolean hasEnd = endDateTime != null && !endDateTime.trim().isEmpty();

        if (hasStart && hasEnd) {
            return startDateTime + " ~ " + endDateTime;
        } else if (hasStart) {
            return startDateTime + " ~";
        } else if (hasEnd) {
            return "~ " + endDateTime;
        } else {
            return "무기한";
        }
    }

    // 업데이트 날짜 적용
    public String getDisplayDate() {
        return (updateDT != null && !updateDT.trim().isEmpty()) ? updateDT : insertDT;
    }
    public String getDisplayLoginId() {
        return (updateLoginId != null && !updateLoginId.trim().isEmpty())
                ? updateLoginId
                : insertLoginId;
    }
    public String getNoticeStatus() {
        try {
            if (startDate != null && startTime != null && endDate != null && endTime != null) {
                String start = startDate + startTime; // 예: 202504080900
                String end = endDate + endTime;

                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmm");
                LocalDateTime startDt = LocalDateTime.parse(start, formatter);
                LocalDateTime endDt = LocalDateTime.parse(end, formatter);

                LocalDateTime now = LocalDateTime.now();

                if (now.isBefore(startDt)) {
                    return "게시예정";
                } else if (!now.isBefore(startDt) && !now.isAfter(endDt)) {
                    return "게시중";
                } else {
                    return "게시종료";
                }
            }
        } catch (Exception e) {
            return "오류 발생";
        }
        return "코드 확인";
    }

}
