package com.dev.wannabe.domain.home.service;

import com.dev.wannabe.domain.home.mapper.WeatherLogMapper;
import com.dev.wannabe.domain.home.model.dto.WeatherLogDTO;
import com.dev.wannabe.domain.home.model.vo.WeatherLog;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class WeatherLogService {

    private final WeatherLogMapper weatherLogMapper;
    private final WebClient webClient;
    private final ObjectMapper objectMapper = new ObjectMapper();

    private final String apiUrl = "https://api.openweathermap.org/data/2.5/weather";
    private final String apiKey = "629da2d63bca145438b81baeebadcdbe";

    // 1시간마다
    @Scheduled(fixedRate = 3600000)
    public void fetchWeatherData() {
        saveWeatherData("Seoul");
    }

    // 서울의 날씨 데이터를 가져와 DB에 저장
    public WeatherLog saveWeatherData(String city) {
        try {
            String url = String.format("%s?q=%s&appid=%s&units=metric", apiUrl, city, apiKey);
            String response = webClient.get().uri(url).retrieve().bodyToMono(String.class).block();
            JsonNode jsonNode = objectMapper.readTree(response);

            String weatherState = jsonNode.get("weather").get(0).get("main").asText();

            // DTO 생성 및 데이터 설정
            WeatherLogDTO weatherLogDTO = new WeatherLogDTO();
            weatherLogDTO.setMessage(weatherState);
            weatherLogDTO.setContents(jsonNode.get("weather").get(0).get("description").asText());
            weatherLogDTO.setTemperature((int) Math.round(jsonNode.get("main").get("temp").asDouble()));

            // 강수량 데이터 확인 (없으면 0)
            BigDecimal rainAmount = new BigDecimal(jsonNode.path("rain").path("1h").asText("0"));
            weatherLogDTO.setRain(rainAmount);

            // DTO → VO 변환
            WeatherLog weatherLog = new WeatherLog();
            weatherLog.setMessage(weatherLogDTO.getMessage());
            weatherLog.setContents(weatherLogDTO.getContents());
            weatherLog.setTemperature(weatherLogDTO.getTemperature());
            weatherLog.setRain(weatherLogDTO.getRain());
            weatherLog.setInsertUserId(1L);
            weatherLog.setUpdateUserId(1L);
            weatherLog.setInsertDt(LocalDateTime.now());
            weatherLog.setUpdateDt(LocalDateTime.now());

            // DB 저장
            weatherLogMapper.insertWeatherLog(weatherLog);
            System.out.println("✅ 날씨 데이터 삽입 완료: " + weatherLog.getMessage());


            return weatherLog; // 저장된 데이터 반환
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }



}