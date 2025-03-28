package com.dev.wannabe.domain.minihompi.model.vo;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FriendInfo {

    private Long userId;
    private Long FriendUserId;
    private String userNickname;
    private String friendUserNickname;

}
