package com.dev.wannabe.domain.minihompi.model.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class MinimiInfoDTO {

    private Long minimiId;
    private Long userId;
    private Long productId;
    private String faceDirectionCode;
    private Float xPosition;
    private Float yPosition;
    private Float zPosition;
    private String mainYN;
    private String useYN;
    private Long upsertUserId;

}
