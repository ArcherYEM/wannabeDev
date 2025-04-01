package com.dev.wannabe.domain.minihompi.model.vo;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.ToString;

import java.util.Date;

@Data
@ToString
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
