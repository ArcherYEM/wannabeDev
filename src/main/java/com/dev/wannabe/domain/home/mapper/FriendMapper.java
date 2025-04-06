package com.dev.wannabe.domain.home.mapper;

import com.dev.wannabe.domain.home.model.dto.FriendPanelDTO;
import com.dev.wannabe.domain.home.model.dto.FriendRequestDTO;
import com.dev.wannabe.domain.home.model.vo.FriendInfo;
import com.dev.wannabe.domain.home.model.vo.FriendMessage;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface FriendMapper {

    void saveFriendMessage(FriendMessage friendMessage);

    void saveFriendInfo(FriendInfo friendInfo);

    FriendInfo findFriendByUserIdAndFriendId(@Param("userId") Long userId, @Param("friendId") Long friendId);
    List<FriendInfo> findAllFriendInfoByUserId(Long userId);

    List<FriendPanelDTO> getAllFriendPaneInfo(Long userId);
    List<FriendPanelDTO> getFriendPanelInfoByPage(@Param("userId") Long userId, @Param("start") Integer start, @Param("size") Integer size);

    List<FriendRequestDTO> getFriendReceiveInfoByPage(@Param("userId") Long userId, @Param("start") Integer start, @Param("size") Integer size);
    List<FriendRequestDTO> getFriendSendInfoByPage(@Param("userId") Long userId, @Param("start") Integer start, @Param("size") Integer size);


    Long getFriendsNumByUserId(Long userId);
    Long getFriendRequestNumByUserId(Long userId);

    void deleteFriendByUserIdAndFriendId(@Param("userId") Long userId, @Param("friendId") Long friendId);

    Boolean existsByUserIdAndFriendId(@Param("userId") Long userId, @Param("friendId") Long friendId);



}
