package com.dev.wannabe.domain.minihompi.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HompiDiaryDTO {

    private Long hompiId;
    private Long diaryId;
    private String diaryContent;
    private String availStatus;
}
