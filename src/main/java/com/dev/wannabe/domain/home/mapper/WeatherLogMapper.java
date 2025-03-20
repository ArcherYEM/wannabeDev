package com.dev.wannabe.domain.home.mapper;

import com.dev.wannabe.domain.home.model.vo.WeatherLog;
import org.apache.ibatis.annotations.Mapper;

@Mapper

public interface WeatherLogMapper {
    void insertWeatherLog(WeatherLog weatherLog);
}
