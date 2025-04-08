package com.dev.wannabe.domain.home.model.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RequestFriendCardDTO {
    private Long userId;
    private Integer start;
    private Integer size;
}
