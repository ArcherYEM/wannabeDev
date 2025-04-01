package com.dev.wannabe.domain.minihompi.model.vo;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder(toBuilder = true)
public class HompiMenu {

    private Long hompiId;
    private String hompiMenuCode;
    private String availStatus;
    private Long insertUserId;
    private LocalDateTime insertDt;
    private Long updateUserId;
    private LocalDateTime updateDt;

}