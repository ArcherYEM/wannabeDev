package com.dev.wannabe.domain.home.model.vo;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class AttachFileManage {

    private Long attachFileId;
    private String fileOriginName;
    private Long fileSize;
    private String filePath;
    private String fileExtension;
    private String remarks;
    private Long insertUserId;
    private LocalDateTime insertDt;
    private Long updateUserId;
    private LocalDateTime updateDt;
}
