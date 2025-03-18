package com.dev.wannabe.domain.home.mapper.user;

import com.dev.wannabe.domain.home.model.dto.user.UserExistDTO;
import com.dev.wannabe.domain.home.model.vo.*;
import com.dev.wannabe.domain.home.model.vo.user.UserBasic;
import com.dev.wannabe.domain.home.model.vo.user.UserDetail;
import com.dev.wannabe.domain.home.model.vo.user.UserRole;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {

    // USER_BASIC 저장
    void saveUserBasic(UserBasic userBasic);

    // USER_DETAIL 저장
    void saveUserDetail(UserDetail userDetail);

    // USER_ROLE 저장
    void saveUserRole(UserRole userRole);

    int isUserExist(UserExistDTO userExist);

    Long findUserIdByLoginId(String loginId);

}