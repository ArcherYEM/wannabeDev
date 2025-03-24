package com.dev.wannabe.domain.home.model.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data

public class WeatherLogDTO {
    private String message;  // 날씨 상태
    private String contents; // 상세 설명
    private int temperature;  // 온도
    private BigDecimal rain;  // 강수량
    private LocalDateTime insertDt;
    private LocalDateTime updateDt;
    private Long logId;
}
