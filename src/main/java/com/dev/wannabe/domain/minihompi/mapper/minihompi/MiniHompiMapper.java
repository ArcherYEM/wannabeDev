package com.dev.wannabe.domain.minihompi.mapper.minihompi;

import com.dev.wannabe.domain.minihompi.model.minihompi.MiniHompiTotal;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface MiniHompiMapper {

    MiniHompiTotal findMyHompi(Map<String, Object> map);

}

