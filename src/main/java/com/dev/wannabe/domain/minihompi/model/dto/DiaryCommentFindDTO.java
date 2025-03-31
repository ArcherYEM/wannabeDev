package com.dev.wannabe.domain.minihompi.model.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class DiaryCommentFindDTO {

    private Long commentId;
    private String userName;
    private Long userId;
    private Long hompiId;
    private String comment; //댓글
    private String fixedYn;
    private String insertDt;

}
