package com.dev.wannabe.domain.home.controller;

import com.dev.wannabe.domain.home.model.vo.WeatherLog;
import com.dev.wannabe.domain.home.service.WeatherLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequiredArgsConstructor
public class WeatherLogController {

    private final WeatherLogService weatherLogService;

    /**
     * API 호출 후 데이터를 가져와 화면에 출력
     */
    @GetMapping("/weather/save")
    public String saveWeather(@RequestParam(defaultValue = "Seoul") String city, Model model) {
        // 날씨 데이터 저장 및 반환
        WeatherLog weatherLog = weatherLogService.saveWeatherData(city);

        // 모델에 모든 정보 추가
        model.addAttribute("message", weatherLog.getMessage());  // 날씨 상태
        model.addAttribute("contents", weatherLog.getContents());  // 상세 설명
        model.addAttribute("temperature", weatherLog.getTemperature());  // 온도
        model.addAttribute("rain", weatherLog.getRain());  // 강수량
        model.addAttribute("city", city);  // 도시명

        return "sample/weather"; // views/sample/weather.html로 이동
    }
}