package com.dev.wannabe.domain.minihompi.model.hompi.vo;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder(toBuilder = true)
public class HompiConfig {

    private Long hompiId;
    private String hompiConfigCode;
    private String hompiConfigContent;
    private Long insertUserId;
    private LocalDateTime insertDt;
    private Long updateUserId;
    private LocalDateTime updateDt;

}
