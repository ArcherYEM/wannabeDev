package com.dev.wannabe.domain.minihompi.service;

import com.dev.wannabe.domain.minihompi.mapper.FriendMapper;
import com.dev.wannabe.domain.minihompi.model.dto.SendMessageDTO;
import com.dev.wannabe.domain.minihompi.model.vo.FriendMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class FriendService {

    private final FriendMapper friendMapper;

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
}
