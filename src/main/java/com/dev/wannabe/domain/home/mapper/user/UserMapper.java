package com.dev.wannabe.domain.home.mapper.user;

import com.dev.wannabe.domain.home.model.user.dto.UserDataDTO;
import com.dev.wannabe.domain.home.model.user.dto.UserExistDTO;
import com.dev.wannabe.domain.home.model.user.vo.UserBasic;
import com.dev.wannabe.domain.home.model.user.vo.UserDetail;
import com.dev.wannabe.domain.home.model.user.vo.UserRole;
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

    UserDataDTO findUserDataByUserId(Long userId);

}