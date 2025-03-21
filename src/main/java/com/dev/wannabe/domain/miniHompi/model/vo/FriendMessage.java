package com.dev.wannabe.domain.minihompi.model.vo;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(toBuilder = true)
public class FriendMessage {

    private Long messageId;
    private Long userId;    // 수신자
    private Long friendId;  // 발송자
    private String message;
    private String readYN;
    private Long insertUserId;
    private Long updateUserId;

}
