package com.dev.wannabe.domain.minihompi.model.vo;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder(toBuilder = true)
public class Hompi {

    private Long hompiId;
    private String hompiURL;
    private String hompiTitle;
    private Long ownerUserId;
    private Long insertUserId;
    private LocalDateTime insertDt;
    private String updateUserId;
    private LocalDateTime updateDt;

}