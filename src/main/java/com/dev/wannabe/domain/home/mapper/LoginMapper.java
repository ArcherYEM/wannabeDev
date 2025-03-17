package com.dev.wannabe.domain.home.mapper;

import com.dev.wannabe.domain.home.model.dto.LoginDataDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoginMapper {

    String findPasswordByLoginId(String loginId);

}
