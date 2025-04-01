package com.dev.wannabe.domain.minihompi.model.vo;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class HompiDiary {

    private Long diaryId;
    private Long hompiId;
    private Long folderId;
    private String diaryName;
    private String diaryContent;
    private String availStatus;

    private Long insertUserId;
    private LocalDateTime insertDt;
    private Long updateUserId;
    private LocalDateTime updateDt;
}
