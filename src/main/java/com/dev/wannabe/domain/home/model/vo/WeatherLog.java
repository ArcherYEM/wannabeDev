package com.dev.wannabe.domain.home.model.vo;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class WeatherLog {
    private Long logId; //날씨 LOG_ID
    private String message;//날씨 메세지
    private String contents;//날씨 내용
    private String remarks;//비고
    private Long insertUserId;//등록자 ID
    private LocalDateTime insertDt;//등록일시
    private Long updateUserId;//변경자 ID
    private LocalDateTime updateDt;//변경일시
    private int temperature;  // 온도
    private BigDecimal rain;  // 강수량


}
