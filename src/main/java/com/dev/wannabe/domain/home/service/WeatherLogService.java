package com.dev.wannabe.domain.home.service;

import com.dev.wannabe.domain.home.mapper.WeatherLogMapper;
import com.dev.wannabe.domain.home.model.dto.WeatherLogDTO;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

@RequiredArgsConstructor
@Service
public class WeatherLogService {

    private final WeatherLogMapper weatherLogMapper;
    private final WebClient webClient;
    private final ObjectMapper objectMapper = new ObjectMapper();

    private final String apiUrl = "https://api.openweathermap.org/data/2.5/weather";
    private final String apiKey = "629da2d63bca145438b81baeebadcdbe";

    // 매시간마다 서울 날씨 업데이트
    @Scheduled(fixedRate = 3600000)
    public void updateWeatherDataHourly() {
        WeatherLogDTO latestLog = weatherLogMapper.getLatestWeatherLog();
        if (latestLog != null) {
            updateWeatherData("Seoul", latestLog.getLogId());
        }
    }

    public void saveInitialWeatherData(String city) {
        if (weatherLogMapper.getLatestWeatherLog() == null) {
            saveWeatherData(city);
        }
    }




    public WeatherLogDTO saveWeatherData(String city) {
        try {
            String url = String.format("%s?q=%s&appid=%s&units=metric", apiUrl, city, apiKey);
            String response = webClient.get().uri(url).retrieve().bodyToMono(String.class).block();
            JsonNode jsonNode = objectMapper.readTree(response);

            WeatherLogDTO weatherLogDTO = new WeatherLogDTO();
            weatherLogDTO.setMessage(jsonNode.get("weather").get(0).get("main").asText());
            weatherLogDTO.setContents(jsonNode.get("weather").get(0).get("description").asText());
            weatherLogDTO.setTemperature((int) Math.round(jsonNode.get("main").get("temp").asDouble()));
            BigDecimal rainAmount = new BigDecimal(jsonNode.path("rain").path("1h").asText("0"));
            weatherLogDTO.setRain(rainAmount);

            long utcSeconds = jsonNode.get("dt").asLong();  // API가 주는 UTC 시간값
            LocalDateTime koreaTime = LocalDateTime.ofInstant(Instant.ofEpochSecond(utcSeconds), ZoneId.of("Asia/Seoul"));
            System.out.println("🔔 KST로 변환한 시간: " + koreaTime);


            // DTO에서 시간을 같이 저장
            weatherLogDTO.setInsertDt(koreaTime);
            weatherLogDTO.setUpdateDt(koreaTime);

            weatherLogMapper.insertWeatherLog(weatherLogDTO);
            System.out.println("✅ 날씨 데이터 삽입 완료 (KST 기준): " + weatherLogDTO.getMessage());

            return weatherLogDTO;
        } catch (Exception e) {
            System.out.println("❌ 예외 발생: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    // 날씨 업데이트 메서드
    public void updateWeatherData(String city, Long logId) {
        try {
            String url = String.format("%s?q=%s&appid=%s&units=metric", apiUrl, city, apiKey);
            String response = webClient.get().uri(url).retrieve().bodyToMono(String.class).block();
            JsonNode jsonNode = objectMapper.readTree(response);

            WeatherLogDTO weatherLogDTO = new WeatherLogDTO();
            weatherLogDTO.setLogId(logId);
            weatherLogDTO.setMessage(jsonNode.get("weather").get(0).get("main").asText());
            weatherLogDTO.setContents(jsonNode.get("weather").get(0).get("description").asText());
            weatherLogDTO.setTemperature((int) Math.round(jsonNode.get("main").get("temp").asDouble()));
            BigDecimal rainAmount = new BigDecimal(jsonNode.path("rain").path("1h").asText("0"));
            weatherLogDTO.setRain(rainAmount);

            weatherLogMapper.updateWeatherLog(weatherLogDTO);
            System.out.println("♻️ 날씨 데이터 업데이트 완료: " + weatherLogDTO.getMessage());

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 위경도로 날씨 저장 (Ajax에서 호출할 메서드)
    public WeatherLogDTO saveWeatherDataByCoords(double lat, double lon) {
        try {
            String url = String.format("%s?lat=%f&lon=%f&appid=%s&units=metric", apiUrl, lat, lon, apiKey);
            String response = webClient.get().uri(url).retrieve().bodyToMono(String.class).block();
            JsonNode jsonNode = objectMapper.readTree(response);

            WeatherLogDTO weatherLogDTO = new WeatherLogDTO();
            weatherLogDTO.setMessage(jsonNode.get("weather").get(0).get("main").asText());
            weatherLogDTO.setContents(jsonNode.get("weather").get(0).get("description").asText());
            weatherLogDTO.setTemperature((int) Math.round(jsonNode.get("main").get("temp").asDouble()));
            BigDecimal rainAmount = new BigDecimal(jsonNode.path("rain").path("1h").asText("0"));
            weatherLogDTO.setRain(rainAmount);

            // 📌중요: OpenWeatherMap에서 제공하는 UTC 기준의 'dt' 사용
            long utcSeconds = jsonNode.get("dt").asLong();
            LocalDateTime koreaTime = LocalDateTime.ofInstant(
                    Instant.ofEpochSecond(utcSeconds),
                    ZoneId.of("Asia/Seoul")
            );

            weatherLogDTO.setInsertDt(koreaTime);
            weatherLogDTO.setUpdateDt(koreaTime);

            weatherLogMapper.insertWeatherLog(weatherLogDTO);
            return weatherLogDTO;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}