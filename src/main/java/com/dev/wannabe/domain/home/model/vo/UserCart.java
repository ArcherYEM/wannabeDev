package com.dev.wannabe.domain.home.model.vo;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class UserCart {

    private Long cartItemId;
    private Long userId;
    private Long itemId;
    private String itemType;
    private Integer availDay;
    private String remarks;
    private Long insertUserId;
    private LocalDateTime insertDt;
    private Long updateUserId;
    private LocalDateTime updateDt;
}