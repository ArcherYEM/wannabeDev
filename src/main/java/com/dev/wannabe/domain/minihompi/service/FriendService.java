package com.dev.wannabe.domain.minihompi.service;

import com.dev.wannabe.domain.minihompi.mapper.FriendMapper;
import com.dev.wannabe.domain.minihompi.model.friend.dto.SendMessageDTO;
import com.dev.wannabe.domain.minihompi.model.friend.vo.FriendMessage;
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
        try {
            FriendMessage friendMessage = FriendMessage.builder()
                    .userId(sendMessage.getToUserId())
                    .friendId(sendMessage.getFromUserId())
                    .message(sendMessage.getMessage())
                    .readYN("N")
                    .insertUserId(sendMessage.getFromUserId())
                    .build();

            friendMapper.saveFriendMessage(friendMessage);
            log.info("일촌 메시지 성공");
        } catch (Exception e) {
            log.error("일촌 메시지 실패 {}", e.getMessage());
        }
    }
}
