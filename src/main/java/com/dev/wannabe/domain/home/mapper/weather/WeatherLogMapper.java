package com.dev.wannabe.domain.home.mapper.weather;

import com.dev.wannabe.domain.home.model.weather.vo.WeatherLog;
import org.apache.ibatis.annotations.Mapper;

@Mapper

public interface WeatherLogMapper {
    void insertWeatherLog(WeatherLog weatherLog);
}
