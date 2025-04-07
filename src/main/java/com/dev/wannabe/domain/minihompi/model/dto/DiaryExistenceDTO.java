package com.dev.wannabe.domain.minihompi.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DiaryExistenceDTO {

    private Long hompiId;
    private Long folderId;
    private Integer year;
    private Integer month;
}
