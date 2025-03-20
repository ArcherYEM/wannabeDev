package com.dev.wannabe.domain.home.model.weather.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data

public class WeatherLogDTO {
    private String message;  // 날씨 상태
    private String contents; // 상세 설명
    private int temperature;  // 온도
    private BigDecimal rain;  // 강수량
}
