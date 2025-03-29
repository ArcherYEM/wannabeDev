package com.dev.wannabe.domain.home.mapper;

import com.dev.wannabe.domain.home.model.dto.GetUserInfoDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface UserUpdateMapper {
    // 회원정보 조회
    GetUserInfoDTO getMyInfo(Long userId);

    int updateMyInfo(Map<String, Object> param);

    int checkEmail(String email);

    int checkPhone(String phone);

    int updateMyPasswd(Map<String, Object> param);
}
