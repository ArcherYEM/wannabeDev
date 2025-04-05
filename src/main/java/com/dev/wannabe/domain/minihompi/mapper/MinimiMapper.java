package com.dev.wannabe.domain.minihompi.mapper;

import com.dev.wannabe.domain.minihompi.model.dto.MinimiInfoDTO;
import com.dev.wannabe.domain.minihompi.model.vo.MinimiBasic;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MinimiMapper {

    void saveMinimiBasic(MinimiBasic minimiBasic);

    //userId로 Mimini호출
    MinimiInfoDTO findMinimiByLoginId(Long UserId);
}
