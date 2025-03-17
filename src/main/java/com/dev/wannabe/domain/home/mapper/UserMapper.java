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

    // HOMPI 저장
    void saveHompi(Hompi hompi);

    // HOMPI_CONFIG 저장
    void saveHompiConfig(HompiConfig hompiConfig);

    // HOMPI_DAILY_STATS
    void saveHompiDailyStats(HompiDailyStats hompiDailyStats);

    // HOMPI_MENU
    void saveHompiMenu(HompiMenu hompiMenu);

    // MINIMI_BASIC
    void saveMinimiBasic(MinimiBasic minimiBasic);

    int isUserExist(UserExistDTO userExist);

    // login id 존재 시 return 1, 아니면 return 0
    int isExistByLoginId(String loginId);

    // email 존재 시 return 1, 아니면 return 0
    int isExistByEmail(String email);

    // phone no 존재 시 return 1, 아니면 return 0
    int isExistByPhoneNo(String phoneNo);

    // email을 기준으로 user id 추출
    Optional<Long> findUserIdByEmail(String email);

    Optional<Long> findUserIdByLoginId(String loginId);

}
