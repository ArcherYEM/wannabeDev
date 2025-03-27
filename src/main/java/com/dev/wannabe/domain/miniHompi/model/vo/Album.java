package com.dev.wannabe.domain.minihompi.model.vo;

import lombok.Builder;
import lombok.Getter;
import java.util.Date;

@Getter
@Builder(toBuilder = true)
public class Album {

    private Long albumId;
    private Long hompiId;
    private Long folderId;
    private String albumName;
    private String availStatus;

    private Long insertUserId;
    private Date insertDt;
    private Long updateUserId;
    private Date updateDt;

}
