package com.dev.wannabe.domain.home.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class FriendNewRequestDTO {

    private Long hompiId;
    private String userNickname;
    private String friendNickname;
    private String friendRequestMessage;
    private Long userId;

}
