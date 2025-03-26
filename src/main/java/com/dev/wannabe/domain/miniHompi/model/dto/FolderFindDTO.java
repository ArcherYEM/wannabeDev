package com.dev.wannabe.domain.minihompi.model.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FolderFindDTO {

    private Long hompiId;
    private String contentsType;
    private String availStatus;
    private Long folderId;

}
