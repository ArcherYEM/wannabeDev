package com.dev.wannabe.domain.minihompi.model.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.ToString;

import java.util.Date;

@Data
@ToString
public class AlbumCommentDTO {

    private Long commentId;
    private Long hompiId;
    private Long albumId;
    private Long userId;
    private String commentContent;
    private String fixedYN;
    private String userName;
    private String insertDt;

}
