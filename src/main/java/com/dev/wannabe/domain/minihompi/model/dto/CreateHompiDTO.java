package com.dev.wannabe.domain.minihompi.model.dto.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreateHompiDTO {

    // Hompi
    private Long userId;
    private String hompiTitle;

}
