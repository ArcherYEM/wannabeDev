package com.dev.wannabe.domain.minihompi.model.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SendMessageDTO {
    private Long toUserId;    // 수신자
    private Long fromUserId;  // 발송자
    private String message;
}
