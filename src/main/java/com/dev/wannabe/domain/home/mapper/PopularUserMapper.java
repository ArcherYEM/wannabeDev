package com.dev.wannabe.domain.home.mapper;

import com.dev.wannabe.domain.home.model.dto.PopularUserDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PopularUserMapper {

    List<PopularUserDTO> findTopTenUser(String todayDate);
}
