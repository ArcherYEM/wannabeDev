package com.dev.wannabe.domain.home.mapper;

import com.dev.wannabe.domain.home.model.dto.UserInfoDTO;
import com.dev.wannabe.domain.home.model.dto.UserExistDTO;
import com.dev.wannabe.domain.home.model.vo.UserBasic;
import com.dev.wannabe.domain.home.model.vo.UserDetail;
import com.dev.wannabe.domain.home.model.vo.UserRole;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {

    // USER_BASIC 저장
    void saveUserBasic(UserBasic userBasic);

    // USER_DETAIL 저장
    void saveUserDetail(UserDetail userDetail);

    // USER_ROLE 저장
    void saveUserRole(UserRole userRole);

    Integer isUserExist(UserExistDTO userExist);

    Long findUserIdByLoginId(String loginId);

    UserInfoDTO findUserInfoByUserId(Long userId);

}