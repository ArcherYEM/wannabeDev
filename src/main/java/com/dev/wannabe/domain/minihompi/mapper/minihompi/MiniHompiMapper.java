package com.dev.wannabe.domain.minihompi.mapper.minihompi;

import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface MiniHompiMapper {
    MiniHompiMapper findMiniHompi(Map<String, String> map);
}
