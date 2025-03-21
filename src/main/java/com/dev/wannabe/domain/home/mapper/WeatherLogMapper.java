package com.dev.wannabe.domain.home.mapper;

import com.dev.wannabe.domain.home.model.dto.WeatherLogDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface WeatherLogMapper {
    WeatherLogDTO getLatestWeatherLog();         // 최신 데이터 조회
    void insertWeatherLog(WeatherLogDTO dto);    // INSERT
    void updateWeatherLog(WeatherLogDTO dto);    // UPDATE
}
