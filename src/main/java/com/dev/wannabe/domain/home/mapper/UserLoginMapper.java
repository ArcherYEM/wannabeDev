package com.dev.wannabe.domain.home.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserLoginMapper {

    void saveUserLogin(Long userId);
    void deleteUserLogin(Long userId);

    Long logInFriendCount(Long userId);

    Integer isExistUser(Long userId);
    List<Long> loggedInFriendsByUserId(Long userId);
}
