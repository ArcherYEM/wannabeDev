package com.dev.wannabe.domain.home.mapper;

import com.dev.wannabe.domain.home.model.dto.SignupUserDTO;
import com.dev.wannabe.domain.home.model.vo.UserBasic;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserUpdateMapper {
    // 회원정보 조회
    SignupUserDTO getMyInfo(String userName);
}
