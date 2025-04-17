package com.dev.wannabe.domain.home.mapper;

import com.dev.wannabe.domain.home.model.dto.BgmProductDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface BgmMapper {

    Integer getBgmCount(String searchText);
    List<BgmProductDTO> getBgmList(@Param("offset") Integer offset, @Param("searchText")String searchText);
    List<BgmProductDTO> getPopularBgmList();
    String getBgmAudioPath(Long bgmId);
    BgmProductDTO getBgmProductDTO(Long bgmId);
}
