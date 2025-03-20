package com.dev.wannabe.domain.minihompi.mapper;

import com.dev.wannabe.domain.minihompi.model.vo.MiniHompiTotal;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface MiniHompiMapper {

    MiniHompiTotal findMyHompi(Map<String, Object> map);

}

