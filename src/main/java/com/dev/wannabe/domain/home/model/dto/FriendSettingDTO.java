package com.dev.wannabe.domain.home.model.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(toBuilder = true)
public class FriendSettingDTO {
    private Long friendId;
    private String friendNickname;
    private String userNickname;
    private String friendMinimi;
    private String startDate;
}
