package com.dev.wannabe.domain.home.mapper;

import com.dev.wannabe.domain.home.model.vo.UserBasic;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {

    void saveUserBasic(UserBasic userBasicVO);

    int isExistByLoginId(String loginId);
    int isExistByEmail(String email);
    int isExistByPhoneNo(String phoneNo);

}
