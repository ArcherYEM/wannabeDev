package com.dev.wannabe.domain.home.mapper;

import com.dev.wannabe.domain.home.model.vo.UserBasic;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {

    // user 관련 데이터 저장
    // 현재 user baisc과 연결된 상태
    void saveUserBasic(UserBasic userBasicVO);

    // login id 존재 시 return 1, 아니면 return 0
    int isExistByLoginId(String loginId);

    // email 존재 시 return 1, 아니면 return 0
    int isExistByEmail(String email);

    // phone no 존재 시 return 1, 아니면 return 0
    int isExistByPhoneNo(String phoneNo);

}
