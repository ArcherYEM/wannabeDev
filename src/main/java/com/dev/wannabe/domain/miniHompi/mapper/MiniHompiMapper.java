package com.dev.wannabe.domain.minihompi.mapper;

import com.dev.wannabe.domain.minihompi.model.vo.MinihompiTotal;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface MinihompiMapper {

    MinihompiTotal findMyhompi(Map<String, Object> map);

    int updateTitle(Map<String, Object> minihompi);

    Map<String, Object> moodSave(Map<String, Object> mood);

    int insertTodayCount(Map<String, Object> param);

    MinihompiTotal findOwnerUserId(Long hompiId);
}

