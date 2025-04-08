package com.dev.wannabe.domain.home.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@Builder
public class FriendRequestDTO {
    private String userName;
    private String userNickname;
    private String friendName;
    private String friendNickname;
    private Long friendId;
    private Long friendHompiId;
    private String friendRequestDT;
    private String friendMinimi;
    private String friendRequestMessage;
}
