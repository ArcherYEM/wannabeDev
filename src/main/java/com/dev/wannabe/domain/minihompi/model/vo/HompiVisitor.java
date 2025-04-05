package com.dev.wannabe.domain.minihompi.model.vo;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder(toBuilder = true)
public class HompiVisitor {
    private Long guestBookId;
    private Long hompiId;
    private String guestBookContent;
    private String remarks;

    private Long insertUserId;
    private LocalDateTime insertDt;

    private Long updateUserId;
    private LocalDateTime updateDt;

    private String secretCheck;
}