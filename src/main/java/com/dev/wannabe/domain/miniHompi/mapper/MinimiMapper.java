package com.dev.wannabe.domain.minihompi.mapper;

import com.dev.wannabe.domain.minihompi.model.vo.MinimiBasic;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MinimiMapper {

    void saveMinimiBasic(MinimiBasic minimiBasic);
}
