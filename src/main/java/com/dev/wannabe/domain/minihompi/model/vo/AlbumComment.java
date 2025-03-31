package com.dev.wannabe.domain.minihompi.model.vo;

import lombok.Builder;
import lombok.Getter;

import java.util.Date;

@Getter
@Builder
public class AlbumComment {

    private Long albumCommentId;
    private Long hompiId;
    private Long albumId;
    private String commentContent;
    private String fixedYN;

    private Long insertUserId;
    private Date insertDt;
    private Long updateUserId;
    private Date updateDt;

}
