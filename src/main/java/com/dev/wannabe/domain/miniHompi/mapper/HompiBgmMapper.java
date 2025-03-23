package com.dev.wannabe.domain.minihompi.mapper;

import com.dev.wannabe.domain.minihompi.model.dto.HompiBgmDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface HompiBgmMapper {
    List<HompiBgmDTO> findBgmByBgmMap(Map<String,Object> bgmMap);
    Integer selectBgmCount(Long hompiId);

    Integer updateBackgroundBgm(Map<String, Object> bgmIdMap);
}
