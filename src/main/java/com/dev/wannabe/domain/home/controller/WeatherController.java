package com.dev.wannabe.domain.home.controller;

import com.dev.wannabe.domain.home.model.dto.WeatherLogDTO;
import com.dev.wannabe.domain.home.service.WeatherLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/weather")
public class WeatherController {

    private final WeatherLogService weatherLogService;

    // 위치 기반 날씨 요청 처리 (클라이언트에서 위도, 경도를 받음)
    @GetMapping("/location")
    public Map<String, Object> getWeatherByLocation(@RequestParam("lat") double lat,
                                                    @RequestParam("lon") double lon) {

        WeatherLogDTO dto = weatherLogService.saveWeatherDataByCoords(lat, lon);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        Map<String, Object> response = new HashMap<>();
        response.put("message", dto.getMessage());
        response.put("contents", dto.getContents());
        response.put("temperature", dto.getTemperature());
        response.put("rain", dto.getRain());
        response.put("insertDt", dto.getInsertDt().format(formatter));
        response.put("updateDt", dto.getUpdateDt().format(formatter));

        return response;
    }
}