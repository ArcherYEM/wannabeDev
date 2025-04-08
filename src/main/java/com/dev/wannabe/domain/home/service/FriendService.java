package com.dev.wannabe.domain.home.service;

import com.dev.wannabe.domain.home.mapper.UserLoginMapper;
import com.dev.wannabe.domain.home.mapper.UserMapper;
import com.dev.wannabe.domain.home.model.dto.FriendNewRequestDTO;
import com.dev.wannabe.domain.home.model.dto.FriendPanelDTO;
import com.dev.wannabe.domain.home.model.dto.FriendRequestDTO;
import com.dev.wannabe.domain.home.model.dto.RequestFriendCardDTO;
import com.dev.wannabe.domain.home.model.vo.UserBasic;
import com.dev.wannabe.domain.home.mapper.FriendMapper;
import com.dev.wannabe.domain.minihompi.mapper.HompiMapper;
import com.dev.wannabe.domain.minihompi.model.dto.SendMessageDTO;
import com.dev.wannabe.domain.home.model.vo.FriendInfo;
import com.dev.wannabe.domain.home.model.vo.FriendMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class FriendService {

    private final FriendMapper friendMapper;
    private final UserMapper userMapper;
    private final UserLoginMapper userLoginMapper;
    private final HompiMapper hompiMapper;

    @Transactional
    public void requestNewFriend(FriendNewRequestDTO friendNew) {

        Long friendId = hompiMapper.findUserIdByHompiId(friendNew.getHompiId());

        FriendInfo newFriendInfo = FriendInfo.builder()
                .userId(friendNew.getUserId())
                .friendUserId(friendId)
                .userNickname(friendNew.getUserNickname())
                .friendUserNickname(friendNew.getFriendNickname())
                .availStatus("01")
                .friendRequestMessage(friendNew.getFriendRequestMessage())
                .build();
        friendMapper.saveFriendInfo(newFriendInfo);
    }

    @Transactional
    public void acceptFriend(Long userId, Long friendId) {

        FriendInfo friendRequest = friendMapper.findFriendByUserIdAndFriendId(friendId, userId);
        if (friendRequest == null) {
            throw new IllegalStateException("친구 요청이 존재하지 않습니다.");
        }
        log.info("friendRequest request: aaaaaa");
        FriendInfo acceptedFriend = friendRequest.toBuilder()
                .availStatus("02")
                .friendRequestMessage("")
                .build();

        FriendInfo newFriend = acceptedFriend.toBuilder()
                .userId(acceptedFriend.getFriendUserId())
                .friendUserId(acceptedFriend.getUserId())
                .userNickname(acceptedFriend.getFriendUserNickname())
                .friendUserNickname(acceptedFriend.getUserNickname())
                .availStatus("02")
                .friendRequestMessage("")
                .build();

        friendMapper.saveFriendInfo(acceptedFriend);
        friendMapper.saveFriendInfo(newFriend);
    }

    @Transactional
    public void rejectFriend(Long userId, Long friendId) {
        friendMapper.deleteFriendByUserIdAndFriendId(friendId, userId);
    }

    @Transactional
    public void deleteFriend(Long userId, Long friendId) {
        friendMapper.deleteFriendByUserIdAndFriendId(userId, friendId);
        friendMapper.deleteFriendByUserIdAndFriendId(friendId, userId);
    }

    @Transactional
    public void deleteRequestCancel(Long userId, Long friendId) {
        friendMapper.deleteFriendByUserIdAndFriendId(userId, friendId);
    }

    @Transactional
    public Long logInFriendCount(Long userId) { return userLoginMapper.logInFriendCount(userId); }

    @Transactional(readOnly = true)
    public List<FriendPanelDTO> getAllFriendPanelInfo(Long userId) {
        return friendMapper.getAllFriendPaneInfo(userId);
    }

    @Transactional(readOnly = true)
    public List<FriendPanelDTO> getFriendPanelByPage(Long userId, Integer start, Integer size) {
        RequestFriendCardDTO requestFriend = RequestFriendCardDTO.builder()
                .userId(userId)
                .start(start)
                .size(size)
                .build();
        return friendMapper.getFriendPanelInfoByPage(requestFriend);
    }

    @Transactional(readOnly = true)
    public List<FriendRequestDTO> getFriendReceiveListByPage(Long userId, Integer start, Integer size) {
        RequestFriendCardDTO requestFriend = RequestFriendCardDTO.builder()
                .userId(userId)
                .start(start)
                .size(size)
                .build();
        return friendMapper.getFriendReceiveInfoByPage(requestFriend);
    }

    @Transactional(readOnly = true)
    public List<FriendRequestDTO> getFriendSendListByPage(Long userId, Integer start, Integer size) {
        RequestFriendCardDTO requestFriend = RequestFriendCardDTO.builder()
                .userId(userId)
                .start(start)
                .size(size)
                .build();
        return friendMapper.getFriendSendInfoByPage(requestFriend);
    }

    @Transactional
    public void sendFriendMessage(SendMessageDTO sendMessage) {
        FriendMessage friendMessage = FriendMessage.builder()
                .userId(sendMessage.getToUserId())
                .friendId(sendMessage.getFromUserId())
                .message(sendMessage.getMessage())
                .readYN("N")
                .insertUserId(sendMessage.getFromUserId())
                .build();

        friendMapper.saveFriendMessage(friendMessage);
    }

    @Transactional(readOnly = true)
    public Long getFriendsNum(Long userId) {
        return friendMapper.getFriendsNumByUserId(userId);
    }

    @Transactional(readOnly = true)
    public Long getFriendRequestNum(Long userId) {
        return friendMapper.getFriendRequestNumByUserId(userId);
    }

    @Transactional(readOnly = true)
    public Boolean isFriend(Long userId, Long hompiId) {
        Long hompiUserId = hompiMapper.findUserIdByHompiId(hompiId);
        return friendMapper.existsByUserIdAndFriendId(userId, hompiUserId);
    }
}
