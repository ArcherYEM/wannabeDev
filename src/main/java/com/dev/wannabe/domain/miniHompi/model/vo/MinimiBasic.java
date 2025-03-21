package com.dev.wannabe.domain.minihompi.model.vo;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder(toBuilder = true)
public class MinimiBasic {

    private Long minimiId;
    private Long userId;
    private Long productId;
    private String faceDirectionCode;
    private Float xPosition;
    private Float yPosition;
    private Float zPosition;
    private String mainYN;
    private String useYN;
    private Long insertUserId;
    private LocalDateTime insertDt;
    private Long updateUserId;
    private LocalDateTime updateDt;

}