package com.dev.wannabe.domain.minihompi.model.vo;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder(toBuilder = true)
public class HompiFolder {

    private Long hompiId;
    private Long folderId;
    private String folderName;
    private String contentType;

    private Long insertUserId;
    private LocalDateTime insertDt;
    private Long updateUserId;
    private LocalDateTime updateDt;

}
