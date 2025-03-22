package com.dev.wannabe.domain.minihompi.mapper;

import com.dev.wannabe.domain.minihompi.model.vo.MiniroomBasic;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MiniroomMapper {

    void saveMiniroomBasic(MiniroomBasic miniroomBasic);

}
