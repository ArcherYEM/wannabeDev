package com.dev.wannabe.domain.minihompi.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MiniroomInfoDTO {

    private Long miniroomId;
    private Long userId;
    private Long productId;
    private Long upsertUserId;

}
