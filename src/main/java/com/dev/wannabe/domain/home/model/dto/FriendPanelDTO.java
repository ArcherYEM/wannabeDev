package com.dev.wannabe.domain.home.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
public class FriendPanelDTO {
    private Long friendId;
    private Long hompiId;
    private String name;
    private String mood;
    private String minimi;
    private String loginStatus;

}
