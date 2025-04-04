package com.dev.wannabe.domain.minihompi.model.vo;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(toBuilder = true)
public class FriendInfo {

    private Long userId;
    private Long friendUserId;
    private String userNickname;
    private String friendUserNickname;
    private String availStatus;

}
