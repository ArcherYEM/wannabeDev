package com.dev.wannabe.domain.home.mapper;

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


    // login id 존재 시 return 1, 아니면 return 0
    int isExistByLoginId(String loginId);

    // email 존재 시 return 1, 아니면 return 0
    int isExistByEmail(String email);

    // phone no 존재 시 return 1, 아니면 return 0
    int isExistByPhoneNo(String phoneNo);

}
