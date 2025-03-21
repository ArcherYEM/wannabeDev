package com.dev.wannabe.domain.minihompi.mapper;

import com.dev.wannabe.domain.minihompi.model.vo.MinihompiTotal2;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface MinihompiMapper2 {

    MinihompiTotal2 findMyhompi(Map<String, Object> map);

    int updateTitle(Map<String, Object> miniHompi);

    Map<String, Object> moodSave(Map<String, Object> mood);
}

