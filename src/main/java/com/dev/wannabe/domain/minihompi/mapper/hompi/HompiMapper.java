package com.dev.wannabe.domain.minihompi.mapper.hompi;

import com.dev.wannabe.domain.minihompi.model.hompi.vo.Hompi;
import com.dev.wannabe.domain.minihompi.model.hompi.vo.HompiConfig;
import com.dev.wannabe.domain.minihompi.model.hompi.vo.HompiDailyStats;
import com.dev.wannabe.domain.minihompi.model.hompi.vo.HompiMenu;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface HompiMapper {

    // HOMPI 저장
    void saveHompi(Hompi hompi);

    // HOMPI_CONFIG 저장
    void saveAllHompiConfig(HompiConfig hompiConfig);
    void saveHompiConfig(HompiConfig hompiConfig);

    // HOMPI_MENU 저장
    void saveAllHompiMenu(HompiMenu hompiMenu);
    void saveHompiMenu(HompiMenu hompiMenu);

    // HOMPI_DAILY_STATS
    void saveHompiDailyStats(HompiDailyStats hompiDailyStats);

    // userId로 hompiId 추출
    Long findByHompiIdByUserId(Long userId);
    Hompi findByHompiByUserId(Long userId);

}
