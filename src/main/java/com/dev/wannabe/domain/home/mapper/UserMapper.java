package com.dev.wannabe.domain.home.mapper;

import com.dev.wannabe.domain.home.model.dto.UserExistDTO;
import com.dev.wannabe.domain.home.model.vo.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.Optional;

@Mapper
public interface UserMapper {

    // USER_BASIC 저장
    void saveUserBasic(UserBasic userBasic);

    // USER_DETAIL 저장
    void saveUserDetail(UserDetail userDetail);

    // USER_ROLE 저장
    void saveUserRole(UserRole userRole);

    // FRIEND_MESSAGE 저장
    void saveFriendMessage(FriendMessage friendMessage);

    int isUserExist(UserExistDTO userExist);

    Long findUserIdByLoginId(String loginId);

    Long findHompiIdByUserId(Long userId);

}
