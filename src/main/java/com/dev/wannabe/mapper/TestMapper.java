package com.dev.wannabe.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface TestMapper {

    Map<String, Object> testQuery();
}
