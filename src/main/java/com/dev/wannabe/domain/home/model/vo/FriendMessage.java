package com.dev.wannabe.domain.home.model.vo;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(toBuilder = true)
public class FriendMessage {

    private long messageId;
    private long userId;
    private long friendUserId;
    private String message;
    private String readYN;
    private long insertUserId;

}
