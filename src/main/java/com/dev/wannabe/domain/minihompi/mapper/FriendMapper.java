package com.dev.wannabe.domain.minihompi.mapper;

import com.dev.wannabe.domain.minihompi.model.vo.FriendInfo;
import com.dev.wannabe.domain.minihompi.model.vo.FriendMessage;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface FriendMapper {

    void saveFriendMessage(FriendMessage friendMessage);

    void saveFriendInfo(FriendInfo friendInfo);

    FriendInfo findFriendByUserIdAndFriendId(@Param("userId") Long userId, @Param("friendId") Long friendId);
    List<FriendInfo> findAllFriendInfoByUserId(Long userId);

    void deleteFriendByUserIdAndFriendId(@Param("userId") Long userId, @Param("friendId") Long friendId);

    Boolean existsByUserIdAndFriendId(@Param("userId") Long userId, @Param("friendId") Long friendId);



}
