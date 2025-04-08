package com.dev.wannabe.domain.home.model.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FriendPanelDTO {
    private Long friendId;
    private Long friendHompiId;
    private String friendName;
    private String friendMood;
    private String friendMinimi;
    private String friendLoginStatus;

}
