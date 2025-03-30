package com.dev.wannabe.domain.minihompi.model.vo;

import lombok.Builder;
import lombok.Getter;
import java.time.LocalDateTime;
@Getter
@Builder
public class DiaryComment {

    private Long hompiDiaryCommentId;
    private Long diaryId;
    private Long hompiId;
    private String diaryCommentContent;
    private String fixedYn;
    private Long insertUserId;
    private LocalDateTime insertDt;
    private Long updateUserId;
    private LocalDateTime updateDt;

}
