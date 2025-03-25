package com.dev.wannabe.domain.home.mapper;

import com.dev.wannabe.domain.home.model.vo.EmailAuth;
import com.dev.wannabe.domain.home.model.vo.UserBasic;
import com.dev.wannabe.domain.home.model.vo.UserDetail;
import com.dev.wannabe.domain.home.model.vo.UserRole;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDateTime;

@Mapper
public interface UserMapper {

    // USER_BASIC 저장
    void saveUserBasic(UserBasic userBasic);

    // USER_DETAIL 저장
    void saveUserDetail(UserDetail userDetail);

    // USER_ROLE 저장
    void saveUserRole(UserRole userRole);

    Integer isUserExist(String data);

    Long findUserIdByLoginId(String loginId);

    UserBasic findUserBasicByUserId(Long UserId);

    // 아이디 찾기
    String findIdByNameAndBirthDate(@Param("name") String name, @Param("birthDate") String birthDate);

    String findUserNameByUserId(Long UserId);

    // 비밀번호 찾기
    Integer findUserIdByLoginIdAndEmail(@Param("loginId")  String loginId, @Param("email") String email);

    void saveAuthCode(@Param("userId") Integer userId,@Param("authCode") String authCode);

    Integer checkAuthCode(@Param("authCode") String authCode, @Param("userId") String userId);

    Integer updateAuthStatus(@Param("authId") String authId, @Param("authCode") String authCode);

    String findAuthIdByAuthCode(@Param("authCode") String authCode);

    String findUserRoleByUserID(Long UserId);

    Integer updatePassword(@Param("loginId") String loginId, @Param("email") String email, @Param("changePassword")  String changePassword);

    EmailAuth findAuthByUserIdAndAuthCode(@Param("userId") Integer userId, @Param("authCode") String authCode);

    void expireAuthStatus(@Param("authId") String authId, @Param("authCode") String authCode, @Param("expTime")LocalDateTime expTime);
}