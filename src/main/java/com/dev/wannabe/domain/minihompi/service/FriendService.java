package com.dev.wannabe.domain.minihompi.service;

import com.dev.wannabe.domain.home.mapper.UserLoginMapper;
import com.dev.wannabe.domain.home.mapper.UserMapper;
import com.dev.wannabe.domain.home.model.vo.UserBasic;
import com.dev.wannabe.domain.minihompi.mapper.FriendMapper;
import com.dev.wannabe.domain.minihompi.model.dto.SendMessageDTO;
import com.dev.wannabe.domain.minihompi.model.vo.FriendInfo;
import com.dev.wannabe.domain.minihompi.model.vo.FriendMessage;
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

    @Transactional
    public void requestNewFriend(FriendInfo newFriend) {
        UserBasic userData = userMapper.findUserBasicByUserId(newFriend.getUserId());
        UserBasic friendData = userMapper.findUserBasicByUserId(newFriend.getFriendUserId());
        String userNickname = userData.getName();
        String friendNickname = friendData.getName();

        FriendInfo newFriendInfo = newFriend.toBuilder()
                .userNickname(userNickname)
                .friendUserNickname(friendNickname)
                .availStatus("01")
                .build();
        friendMapper.saveFriendInfo(newFriendInfo);
    }

    @Transactional
    public void acceptFriend(Long userId, Long friendId) {
        FriendInfo friendRequest = friendMapper.findFriendByUserIdAndFriendId(friendId, userId);
        if (friendRequest == null) {
            throw new IllegalStateException("친구 요청이 존재하지 않습니다.");
        }
        log.info("friendRequest request: {}", friendRequest);
        FriendInfo acceptedFriend = friendRequest.toBuilder()
                .availStatus("02")
                .build();

        log.info("Accepted friend request: {}", acceptedFriend);

        FriendInfo newFriend = acceptedFriend.toBuilder()
                .userId(userId)
                .friendUserId(friendId)
                .userNickname(friendRequest.getFriendUserNickname())
                .friendUserNickname(friendRequest.getUserNickname())
                .availStatus("02")
                .build();

        friendMapper.saveFriendInfo(acceptedFriend);
        log.info("Accepted friend request2: {}", acceptedFriend);
        friendMapper.saveFriendInfo(newFriend);
    }

    @Transactional
    public void rejectFriend(Long userId, Long friendId) {
        friendMapper.deleteFriendByUserIdAndFriendId(userId, friendId);
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

    @Transactional
    public List<Long> getLoggedFriends(Long userId) {
        return userLoginMapper.loggedInFriendsByUserId(userId);
    }
}
